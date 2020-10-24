import { albumList, albumItem, buildAlbumArr } from "./builders/albums.js";

import {
  categoryList,
  categoryItem,
  buildCategoryArr,
} from "./builders/categories.js";
import { error } from "./builders/error.js";
import variables from "./env.js";
import { navigationListener } from "./helpers/listener.js";

const baseUrl = "https://api.spotify.com";

export const fetchDataType = [
  { name: "categories", type: "categories" },
  { name: "new-releases", type: "albums" },
  { name: "featured-playlists", type: "playlists" },
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
      console.log("Data: " + data);
      sessionStorage.setItem("token", JSON.stringify(data.access_token));
      categories();
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
  let name;
  const token = JSON.parse(sessionStorage.getItem("token"));
  const dataTypeI = fetchDataType.findIndex((item) =>
    hashName.includes(item.name)
  );
  let type = fetchDataType[dataTypeI].type;

  name = hashName.replace("#", "").replace("=", "/");
  type = "playlists";

  if (!token) return authorize();
  $.ajax({
    url: `${baseUrl}/v1/browse/${name}/playlists`,
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
      $("#page-title").text(name.split("/")[1].replace("_", " "));
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
export const fetchData = (hashName) => {
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
  // `<div class='error-container' id="error-box">
  //     <h2>Data Error</h2>
  //     <p>${msg}</p>
  //     <button id='retry-error' type="button" class="btn btn-primary">Retry</button>
  // </div>`

  /**
   * Error Recover Button Event Listener
   */
  $("#retry-error").click(function () {
    authorize();
  });
}
