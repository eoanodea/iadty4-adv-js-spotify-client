/**
 * Builds the album array to fill into
 * the album template
 *
 * @param {*} items - The array of items from Spotify
 */
export const buildAlbumArr = (items, type) => {
  let result = [];

  items.forEach((item, i) => {
    result.push({
      name: item.name,
      imageURL: item.images[0].url,
      i,
      type,
      id: item.id,
    });
  });

  return result;
};

/**
 * Builds a album list wrapper
 *
 */
export const albumList = () => `
<div class='item-list row' id="item-list"></div>
`;

/**
 *
 * @param {int} i - Index Key
 * @param {string} name - Item Title
 * @param {string} imageURL - URL to the image
 */
export const albumItem = ({ i, id, type, name, imageURL }) => `
<a href="#${type}=${id}" id='list-item-link' class="item-link">
  <div class='album-item item-${i}' key="${i}" id='list-item'>
    <img src='${imageURL}' alt='${name}' width="180" height="180" />
    <h2 class="title">${name}</h2>
  </div>
 </a>
`;
