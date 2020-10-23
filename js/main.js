import { authorize, fetchData } from "./api-spotify.js";
import { searchListener, sortListener } from "./helpers/listener.js";
import { buildNavigation } from "./helpers/navigation.js";
import FancyButton from "./builders/categories.js";

$(document).ready(function () {
  console.log("Document has loaded", window.location.hash);
  if (window.location.hash === "") {
    window.location.hash = "categories";
  }
  buildNavigation();

  // let button = document.createElement("button", { is: "fancy-button" });
  // button.textContent = "Fancy button!";
  // button.disabled = true;
  // document.body.appendChild(button);

  let button = new FancyButton();
  button.textContent = "Fancy button!";
  button.disabled = true;
  $("main").append(button);

  /**
   * If no auth token is found, get one from spotify
   */
  if (!sessionStorage.getItem("token")) authorize();
  // else fetchData("new-releases", "albums");
  else fetchData(window.location.hash);

  //

  /**
   * Set up listener modules
   */
  searchListener("#search-data", "#data-container .row");
  sortListener("#sort-data", "#data-container .row");
});
