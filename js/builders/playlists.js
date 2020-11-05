/**
 * Builds the playlist array to fill into
 * the playlist template
 *
 * @param {*} items - The array of items from Spotify
 */
export const buildPlaylistArr = (item) => {
  let tracks = [];
  /**
   * Create an array of tracks
   */
  item.tracks.items.forEach((item, i) => {
    tracks.push({
      name: item.track.name,
      duration: item.track.duration_ms,
      i,
      id: item.track.id,
      href: item.track.external_urls.spotify,
    });
  });
  /**
   * Data for the playlist header
   */
  const header = {
    name: item.name,
    description: item.description,
    followers: item.followers.total,
    owner: item.owner.display_name,
  };

  return { tracks, header };
};

/**
 * Builds the playlist table, along with title
 * and sub title
 *
 * @param {String} name - The title of the playlist
 * @param {String} description - The description of the playlist
 * @param {int} followers - The number of followers playlist has
 * @param {String} owner - The owner of the playlist
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

/**
 * Displays a subheader for a playlist
 * Showing details on it's description, follower count and owner
 *
 * @param {String} description
 * @param {int} followers
 * @param {String} owner
 */
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
 * A single item within the playlist songs table
 *
 * @param {int} i - Index Key
 * @param {String} name - Item Title
 * @param {int} duration - The length of the song in miliseconds
 * @param {String} href - The URL to the song on Spotify web
 */
export const playlistItem = ({ i, name, duration, href }) => `
<tr class="clickable-row" data-href="${href}">
    <th scope="row">${i}</th>
    <td>${name}</td>
    <td>${duration}</td>
 </tr>
`;
