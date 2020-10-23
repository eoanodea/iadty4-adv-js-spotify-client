/**
 * Builds a album list, along with it's children
 *
 * @param {*} items - The array of items from Spotify
 */
export const albumList = (items) => {
  let div = `<div class='item-list row' id="item-list">`;
  div += items.forEach((item, i) => {
    return albumItem(i, item.name, item.images[0].url);
  });
  return (div += "</div>");
};

/**
 *
 * @param {int} i - Index Key
 * @param {string} name - Item Title
 * @param {string} imageURL - URL to the image
 */
const albumItem = ({ i, name, imageURL }) => `
<div class='item-item item-${i}'
  key="${i}"
  style="background-image: url(${imageURL})"
 >
 <h2 class="title">${name}</h2>
 </div>
`;
