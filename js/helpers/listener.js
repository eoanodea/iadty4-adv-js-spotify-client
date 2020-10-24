import { updateNavigation } from "./navigation.js";
import { searchData } from "./search.js";
import { sortByNestedText, sortByNestedKeys } from "./sort.js";

/**
 * Navigation Event Listener
 *
 * @param {string} id - ID of element to listen
 */
export const navigationListener = (id) => {
  console.log("nav link!!", id);
  $(id).each((i, el) => {
    $(el).click(function () {
      const name = $(this).attr("href");
      updateNavigation(name);
    });
  });
};

/**
 * Search Event Listener
 *
 * @param {string} id - ID of element to listen
 * @param {string} data - Data Container of which to search
 *
 * @ref Reference: https://mdbootstrap.com/docs/jquery/forms/search/
 */
export const searchListener = (id, data) => {
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
