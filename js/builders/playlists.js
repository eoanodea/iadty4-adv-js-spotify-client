/**
 * Builds the playlist array to fill into
 * the playlist template
 *
 * @param {*} items - The array of items from Spotify
 */
export const buildPlaylistArr = (item) => {
  let tracks = [];

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
    description: item.description,
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
export const playlistList = ({ name, description, followers, owner }) => {
  /**
   * Set the page title
   */
  $("#page-title").text(name);

  return `
  ${playlistDesc(description, followers, owner)}
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
};

export const playlistDesc = (description, followers, owner) => `
<div class="container">
<div class="row">
  <p class="col">${description}</p>
  <div class="col row justify-content-end">
    <p class="text-muted">Followers: <br /> ${followers}</p>
    <p class="text-muted">Created by: <br /> ${owner}</p>
  </div>
  </div>
</div>
`;

/**
 *
 * @param {int} i - Index Key
 * @param {string} name - Item Title
 * @param {string} imageURL - URL to the image
 */
export const playlistItem = ({ i, id, name, duration, href }) => `
<tr class="clickable-row" data-href="${href}">
    <th scope="row">${i}</th>
    <td>${name}</td>
    <td>${duration}</td>
 </tr>
`;
