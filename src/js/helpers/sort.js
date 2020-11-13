/**
 * Set up sort attributes
 */
$("#alphabetical").data("sortKey", ".sort-text");
$("#reverse").data("sortKey", ".sort-text");
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
export const sortByNestedText = (
  parent,
  childSelector,
  keySelector,
  inverse = false
) => {
  var items = parent.children(childSelector).sort(compareText);
  parent.append(items);
};

function compareText() {
  var vA = $(keySelector, a).text();
  var vB = $(keySelector, b).text();
  if (inverse) return vA > vB ? -1 : vA > vB ? 1 : 0;
  return vA < vB ? -1 : vA > vB ? 1 : 0;
}

/**
 * Sort nested items within a jQuery array
 * by their respected key
 *
 * @param {*} parent - The parent of the sorted array
 * @param {*} childSelector - A single child within that array
 */
export const sortByNestedKeys = (parent, childSelector) => {
  const items = parent.children(childSelector).sort(function (a, b) {
    const keyA = parseInt($(a).attr("key"));
    const keyB = parseInt($(b).attr("key"));

    return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
  });
  parent.append(items);
};

/**
 * Sets the sort select back to default
 */
export const resetSortOptions = () => {
  $("#sort-data")[0].selectedIndex = 0;
};
