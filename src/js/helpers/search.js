/**
 * Search Data
 *
 * Searches data in realtime
 *
 * Reference: https://mdbootstrap.com/docs/jquery/forms/search/
 *
 * @param {*} parent - The parent of the sorted array
 * @param {*} childSelector - A single child within that array
 * @param {*} value - The value being searched
 */
export const searchData = (parent, childSelector, value) => {
  const items = parent.children(childSelector).filter(function () {
    return $(this).toggle($(this).text().toLowerCase().includes(value));
  });
  parent.append(items);
};
