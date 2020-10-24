/**
 * Builds the category array to fill into
 * the category template
 *
 * @param {*} items - The array of items from Spotify
 */
export const buildCategoryArr = (items) => {
  let result = [];

  items.forEach((item, i) => {
    result.push({
      name: item.name,
      imageURL: item.icons[0].url,
      i,
      id: item.id,
    });
  });

  return result;
};

/**
 * Builds a category list wrapper
 *
 */
export const categoryList = () => `
  <div class='item-list row' id="item-list"></div>
`;

/**
 *
 * @param {int} i - Index Key
 * @param {string} name - Item Title
 * @param {string} imageURL - URL to the image
 */
export const categoryItem = ({ i, id, name, imageURL }) => `
<a href="#categories=${id}" id='list-item-link' class="item-link">
  <div class='list-item item-${i}'
    key="${i}"
    style="background-image: url(${imageURL})"
    id='list-item'
  >
  <h2 class="title">${name}</h2>
</div>
</a>
`;
