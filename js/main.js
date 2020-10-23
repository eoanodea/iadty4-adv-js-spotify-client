import { authorize, categories } from "./api-spotify.js";

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

    if (options[selectedIndex].id === "default") {
    }

    console.log(options[selectedIndex].id);
    sortUsingNestedText(
      $("#data-container .row"),
      "div",
      $(this).data("sortKey")
    );
  });
});
// $("#data-container .row").children().first().attr("key");

/**
 * Set up sort attributes
 */
$("#alphabetical").data("sortKey", "h2.title");
$("#reverse").data("sortKey", "h2.title");
$("#default").data("sortKey", function () {
  return $(this).attr("key");
});

/**
 * Sort nested items within a jQuery array
 *
 * Reference: https://jsfiddle.net/tc5dc/
 *
 * @param {*} parent - The parent of the sorted array
 * @param {*} childSelector - A single child within that array
 * @param {*} keySelector - The item you want to sort by
 * @param {boolean} inverse - [optional] if you want to sort is backwards
 */
function sortUsingNestedText(
  parent,
  childSelector,
  keySelector,
  inverse = false
) {
  var items = parent.children(childSelector).sort(function (a, b) {
    var vA = $(keySelector, a).text();
    var vB = $(keySelector, b).text();
    if (inverse) return vA > vB ? -1 : vA > vB ? 1 : 0;
    return vA < vB ? -1 : vA > vB ? 1 : 0;
  });
  parent.append(items);
}
