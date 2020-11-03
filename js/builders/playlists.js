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
      duration: item.track.duration_ms,
      i,
      id: item.track.id,
      href: item.track.external_urls.spotify,
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
  /**
   * Set the page title
   */
  $("#page-title").text(name);

  return `
  <table class='table'>
    <thead>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Duration</th>
    </thead>
    <tbody id="item-list">

    </tbody>
  </table>
`;

  return `
<div class='item-list row' id="item-list">
  <div 
    class='playlist-header' 
    style="background-image: url(${imageURL})"
    >
    <h2>${name}</h2>
    <h2>${followers}</h2>
    <h2>${owner}</h2>
    <h2>${primary_color}</h2>
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
export const playlistItem = ({ i, id, name, duration, href }) => `
<a href="${href}" key=${id} target="_blank" id='list-item-link' class="item-link">
  <tr>
    <th scope="row">${i}</th>
    <td>${name}</td>
    <td>${duration}</td>
 </tr>
</a>
`;
