import { authorize, categories } from "./api-spotify.js";
import { searchListener, sortListener } from "./helpers/listener.js";

$(document).ready(function () {
  console.log("Document has loaded");

  /**
   * If no auth token is found, get one from spotify
   */
  if (!sessionStorage.getItem("token")) authorize();
  else categories();

  /**
   * Set up listener modules
   */
  searchListener("#search-data", "#data-container .row");
  sortListener("#sort-data", "#data-container .row");
});
