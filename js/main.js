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
    sortUsingNestedText(
      $("#data-container .row"),
      "div",
      $(this).data("sortKey")
    );
  });
});

/**
 * Set up sort attributes
 */
$("#sort-data").data("sortKey", "h2.title");

/**
 * Sort nested items within a jQuery array
 *
 * Reference: https://jsfiddle.net/tc5dc/
 *
 * @param {*} parent - The parent of the sorted array
 * @param {*} childSelector - A single child within that array
 * @param {*} keySelector - The item you want to sort by
 */
function sortUsingNestedText(parent, childSelector, keySelector) {
  var items = parent.children(childSelector).sort(function (a, b) {
    var vA = $(keySelector, a).text();
    var vB = $(keySelector, b).text();
    return vA < vB ? -1 : vA > vB ? 1 : 0;
  });
  parent.append(items);
}
