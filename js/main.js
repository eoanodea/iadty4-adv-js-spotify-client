import { authorize, categories } from "./api-spotify.js";
import { sortByNestedText, sortByNestedKeys } from "./helpers/sort.js";

$(document).ready(function () {
  console.log("Document has loaded");

  /**
   * If no auth token is found, get one from spotify
   */
  if (!sessionStorage.getItem("token")) authorize();
  else categories();

  /**
   * Sort Data Event Listener
   */
  $("#sort-data").change(function () {
    /**
     * Get the selected index from the select element
     * And all the option children
     */
    const selectedIndex = $(this)[0].selectedIndex;
    const options = $(this).children();

    /**
     * If the user selects the default option
     * sort by it's original order
     */
    if (options[selectedIndex].id === "default") {
      return sortByNestedKeys($("#data-container .row"), "div");
    }

    sortByNestedText(
      $("#data-container .row"),
      "div",
      $(options[selectedIndex]).data("sortKey"),
      options[selectedIndex].id !== "alphabetical"
    );
  });
});
