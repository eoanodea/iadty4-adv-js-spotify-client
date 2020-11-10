import { updateNavigation } from "./navigation.js";
import { searchData } from "./search.js";
import {
  sortByNestedText,
  sortByNestedKeys,
  resetSortOptions,
} from "./sort.js";

/**
 * Navigation Event Listener
 *
 * Listen for a change in the navigation, and reset the sort select
 *
 * @param {string} id - ID of element to listen
 */
export const navigationListener = (id) => {
  $(id).each((i, el) => {
    $(el).click(function () {
      const name = $(this).attr("href");
      updateNavigation(name);
    });
  });
  resetSortOptions();
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
    searchData($(data), $(data).children()[0], value);
  });
};
/**
 * Sort Data Event Listener
 *
 * @param {string} id - ID of element to listen
 * @param {string} data - Data Container of which to search
 */
export const sortListener = (id, data) => {
  console.log("data !!", id, data);
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
      return sortByNestedKeys($(data), $(data).children()[0]);
    }
    /**
     * If not, sort the data by either A-Z or Z-A
     */
    sortByNestedText(
      $(data),
      $(data).children()[0],
      $(options[selectedIndex]).data("sortKey"),
      options[selectedIndex].id !== "alphabetical"
    );
  });
};
