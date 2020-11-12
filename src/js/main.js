import { authorize, fetchData } from "./data/api-spotify.js";
import { buildNavigation } from "./helpers/navigation.js";

$(document).ready(function () {
  if (window.location.hash === "") {
    window.location.hash = "categories";
  }
  buildNavigation();

  /**
   * If no auth token is found, get one from spotify
   */
  if (!sessionStorage.getItem("token")) authorize();
  else fetchData(window.location.hash);
});
