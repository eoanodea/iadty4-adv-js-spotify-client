import { searchData } from "./search.js";
import { sortByNestedText, sortByNestedKeys } from "./sort.js";

/**
 * Search Event Listener
 *
 * @param {string} id - ID of element to listen
 * @param {string} data - Data Container of which to search
 *
 * @ref Reference: https://mdbootstrap.com/docs/jquery/forms/search/
 */
export const searchListener = (id, data) => {
  console.log("search");
  $(id).on("input", function () {
    var value = $(this).val().toLowerCase();
    searchData($(data), "div", value);
  });
};
/**
 * Sort Data Event Listener
 *
 * @param {string} id - ID of element to listen
 * @param {string} data - Data Container of which to search
 */
export const sortListener = (id, data) => {
  console.log("sort!");
  $(id).change(function () {
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
      return sortByNestedKeys($(data), "div");
    }

    sortByNestedText(
      $(data),
      "div",
      $(options[selectedIndex]).data("sortKey"),
      options[selectedIndex].id !== "alphabetical"
    );
  });
};
