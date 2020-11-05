import { albumList, albumItem, buildAlbumArr } from "./builders/albums.js";

import {
  categoryList,
  categoryItem,
  buildCategoryArr,
} from "./builders/categories.js";
import { error } from "./builders/error.js";
import { buildDetail } from "./builders/index.js";
import variables from "./env.js";
import { navigationListener } from "./helpers/listener.js";

const baseUrl = "https://api.spotify.com";

export const fetchDataType = [
  {
    name: "category",
    type: "playlists",
    url: "browse/categories",
    afterURL: "playlists",
  },
  {
    name: "categories",
    type: "categories",
    url: "browse/categories",
    display: true,
  },
  { name: "new-releases", type: "albums", url: "browse/albums", display: true },
  { name: "album", type: "playlists", url: "albums" },
  { name: "albums", type: "albums", url: "albums" },
  {
    name: "featured-playlists",
    type: "playlists",
    url: "browse/playlists",
    display: true,
  },
  { name: "playlists", type: "playlists", url: "playlists" },
  { name: "playlist", type: "playlists", url: "playlists" },
];

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

  let type = fetchDataType[dataTypeI].type;
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
    },
    error: function (request, error, res) {
      const msg = request.responseJSON;
      console.log("Error!: " + msg);
      renderErrorMessage(msg.error.message);
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

  const type = fetchDataType[dataTypeI].type;

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
      let itemsArr, list, singleItem;
      if (type === "categories") {
        itemsArr = buildCategoryArr(response[type].items);
        list = categoryList();
        singleItem = categoryItem;
      } else {
        itemsArr = buildAlbumArr(response[type].items, type);
        list = albumList();
        singleItem = albumItem;
      }

      /**
       * Append to the document container
       */
      $("#data-container").html(list);
      $("#item-list").html(itemsArr.map(singleItem).join(""));
      navigationListener(".item-link");
    },
    error: function (request, error, res) {
      const msg = request.responseJSON;

      console.log("Error!: " + msg);

      renderErrorMessage(msg.error.message);
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
