/**
 * Builds a category list, along with it's children
 *
 * @param {*} items - The array of items from Spotify
 */
export const categoryList = () => `
<div class='item-list row' id="item-list">
</div>
`;

//   console.log("items in coming ", items);
//   let div = `<div class='item-list row' id="item-list">`;
//   let categories = items.forEach((item, i) => {
//     console.log("each item", item, i);
//     return categoryItem(i, item.name, item.icons[0].url);
//   });

//   div += categories += "</div>";
//   return div;
// };

/**
 *
 * @param {int} i - Index Key
 * @param {string} name - Item Title
 * @param {string} imageURL - URL to the image
 */
export const categoryItem = ({ i, name, imageURL }) => `
<div class='list-item item-${i}'
  key="${i}"
  style="background-image: url(${imageURL})"
 >
 <h2 class="title">${name}</h2>
 </div>
`;
