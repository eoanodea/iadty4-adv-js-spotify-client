/**
 * Environment Variable import
 */
import variables from "./env.js";

/**
 * Listeners import
 */
import {
  navigationListener,
  sortListener,
  searchListener,
} from "../helpers/listener.js";

/**
 * Builder modules import
 */
import { buildDetail } from "../builders/index.js";
import { error } from "../builders/error.js";

/**
 * Data types
 */
import { fetchDataType } from "./data-types.js";

/**
 * Base URL for Spotify API
 */
const baseUrl = "https://api.spotify.com";

/**
 * Get an auth token from Spotify
 * And set it in the session Storage
 */
export const authorize = () => {
  const auth = btoa(`${variables.client_id}:${variables.client_secret}`);

  $.ajax({
    url: "https://accounts.spotify.com/api/token",
    type: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      grant_type: "client_credentials",
    },
    success: function (data) {
      sessionStorage.setItem("token", JSON.stringify(data.access_token));
      fetchData();
    },
    error: function (request, error) {
      console.log("Error: " + JSON.stringify(request));
    },
  });
};

/**
 * Fetch Data from the spotify server depending on the provided parameters
 *
 * @param {string} hashName - the name of the spotify endpoint e.g. new-releases, categories
 */
export const fetchDetail = (hashName) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  let detail = hashName.split("=")[1];

  const dataTypeI = fetchDataType.findIndex(
    (item) => item.name === hashName.split("=")[0].replace("#", "")
  );

  const url = fetchDataType[dataTypeI].url;
  if (fetchDataType[dataTypeI].afterURL)
    detail += `/${fetchDataType[dataTypeI].afterURL}`;

  if (!token) return authorize();
  $.ajax({
    url: `${baseUrl}/v1/${url}/${detail}`,
    type: "GET",
    dataType: "json",
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (data, status, res) {
      /**
       * If an error message was previously displayed
       * empty the div
       */
      if ($("#error-box").length || $("#data-container").length) {
        $("#data-container").empty();
      }

      /**
       * Get the JSON data from the response
       */
      const response = res.responseJSON;

      /**
       * Builds the html data for the page
       * using the data type and JSON response
       */
      const htmlData = buildDetail(response, fetchDataType[dataTypeI], detail);

      /**
       * Append to the document container
       */
      $("#data-container").html(htmlData.list);
      $("#item-list").html(htmlData.itemsArr.map(htmlData.singleItem).join(""));
      navigationListener(".item-link");
      /**
       * Set up listener modules
       */
      searchListener("#search-data", htmlData.dataName);
      sortListener("#sort-data", htmlData.dataName);
    },
    error: function (request, error, res) {
      const err = request.responseJSON;

      console.log("Error!: " + err.error.message);

      renderErrorMessage(err.error.message);
    },
  });
};

/**
 * Fetch Data from the spotify server depending on the provided parameters
 *
 * @param {string} hashName - the name of the spotify endpoint e.g. new-releases, categories
 */
export const fetchData = (hashName = window.location.hash) => {
  if (hashName.includes("=")) return fetchDetail(hashName);
  const name = hashName.replace("#", "");
  const token = JSON.parse(sessionStorage.getItem("token"));
  const dataTypeI = fetchDataType.findIndex((item) =>
    hashName.includes(item.name)
  );

  const type = fetchDataType[dataTypeI];

  if (!token) return authorize();
  $.ajax({
    url: `${baseUrl}/v1/browse/${name}`,
    type: "GET",
    dataType: "json",
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (data, status, res) {
      /**
       * If an error message was previously displayed
       * empty the div
       */
      if ($("#error-box").length || $("#data-container").length) {
        $("#data-container").empty();
      }

      /**
       * Set the page title
       */
      $("#page-title").text(name.replace("-", " "));

      /**
       * Get the JSON data from the response
       */
      const response = res.responseJSON;

      /**
       * Builds the html data for the page
       * using the data type and JSON response
       */
      const htmlData = buildDetail(response, type);

      /**
       * Append to the document container
       */
      $("#data-container").html(htmlData.list);
      $("#item-list").html(htmlData.itemsArr.map(htmlData.singleItem).join(""));
      navigationListener(".item-link");

      /**
       * Set up listener modules
       */
      searchListener("#search-data", htmlData.dataName);
      sortListener("#sort-data", htmlData.dataName);
    },
    error: function (request, error, res) {
      const err = request.responseJSON;

      console.log("Error!: " + err.error.message);

      renderErrorMessage(err.error.message);
    },
  });
};

/**
 * Render an error message to the screen
 * @param {string} msg
 */
function renderErrorMessage(msg) {
  $("#data-container").append(error(msg));

  /**
   * Error Recover Button Event Listener
   */
  $("#retry-error").click(function () {
    authorize();
  });
}
