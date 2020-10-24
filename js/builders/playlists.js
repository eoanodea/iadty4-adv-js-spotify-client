/**
 * Builds the playlist array to fill into
 * the playlist template
 *
 * @param {*} items - The array of items from Spotify
 */
export const buildPlaylistArr = (item) => {
  let tracks = [];
  console.log("building!", item);
  item.tracks.items.forEach((item, i) => {
    tracks.push({
      name: item.track.name,
      i,
      id: item.track.id,
    });
  });
  const header = {
    name: item.name,
    imageURL: item.images[0].url,
    followers: item.followers.total,
    owner: item.owner.display_name,
    primary_color: item.primary_color,
  };

  return { tracks, header };
};

/**
 * Builds a playlist list wrapper
 *
 */
export const playlistList = ({
  name,
  imageURL,
  followers,
  owner,
  primary_color,
}) => {
  console.log("yes!", name);
  return `
<div class='item-list row' id="item-list">
<div 
  class='playlist-header' 
  style="background-image: url(${imageURL})"
  >
<h2>${name}</h2>
</div>
</div>
`;
};

/**
 *
 * @param {int} i - Index Key
 * @param {string} name - Item Title
 * @param {string} imageURL - URL to the image
 */
export const playlistItem = ({ i, id, name, imageURL }) => `
<a href="#playlist=${id}" id='list-item-link' class="item-link">
  <div class='playlist-item item-${i}' key="${i}" id='list-item'>
    <h2 class="song-title">${name}</h2>
  </div>
 </a>
`;
