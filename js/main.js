import { authorize, categories } from "./api-spotify.js";
import { sortByNestedText, sortByNestedKeys } from "./helpers/sort.js";
import { searchData } from "./helpers/search.js";

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

  /**
   * Filter data event listener
   *
   * Reference: https://mdbootstrap.com/docs/jquery/forms/search/
   */
  $("#search-data").on("input", function () {
    var value = $(this).val().toLowerCase();
    searchData($("#data-container .row"), "div", value);
  });
});
