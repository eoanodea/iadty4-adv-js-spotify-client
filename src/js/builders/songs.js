import { millisecondsToTime } from "../helpers/time.js";

/**
 * Builds the song array to fill into
 * the song template
 *
 * @param {*} items - The array of items from Spotify
 */
export const buildSongsArr = (item) => {
  let tracks = [];
  /**
   * Create an array of tracks
   */
  item.tracks.items.forEach((item, i) => {
    tracks.push({
      name: item.name,
      duration: item.duration_ms,
      i,
      id: item.id,
      href: item.uri,
    });
  });
  /**
   * Data for the song header
   */
  const header = buildHeader(item);

  return { tracks, header };

  /**
   * Builds the header for the page
   *
   * @param {*} item
   *
   * @returns {object} - the header object
   */
  function buildHeader(item) {
    return {
      name: item.name,
      released: item.release_date,
      total: item.total_tracks,
      owner: item.label,
      imageURL: item.images[0].url,
    };
  }
};

/**
 * Builds the song table, along with title
 * and sub title
 *
 * @param {String} name - The title of the song
 * @param {String} description - The description of the song
 * @param {int} followers - The number of followers song has
 * @param {String} owner - The owner of the song
 */
export const songList = ({ name, released, total, owner, imageURL }) => {
  const title = $("#page-title");
  /**
   * Set the page title and cover image
   */
  title.text(name);
  title.before(
    `<img class="item-image" src=${imageURL} alt=${name} width="150" height="150" />`
  );

  return `
  ${songDesc(released, total, owner)}
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
 * Displays a subheader for a song
 * Showing details on it's released, total count and owner
 *
 * @param {Date} released
 * @param {int} total
 * @param {String} owner
 */
export const songDesc = (released, total, owner) => `
<div class="container">
  <div class="row">
    <div class="col-sm row justify-content-end-sm">
      <p class="text-muted">Total: <br /> ${total}</p>
      <p class="text-muted">Released: <br /> ${new Date(
        released
      ).toDateString()}</p>
      <p class="text-muted">Label: <br /> ${owner}</p>
    </div>
  </div>
</div>
`;

/**
 * A single item within the song songs table
 *
 * @param {int} i - Index Key
 * @param {String} name - Item Title
 * @param {int} duration - The length of the song in miliseconds
 * @param {String} href - The URL to the song on Spotify web
 */
export const songItem = ({ i, name, duration, href }) => `
<tr class="clickable-row fade-in" data-href="${href}" key="${i}">
    <th scope="row">${i}</th>
    <td class="sort-text">${name}</td>
    <td>${millisecondsToTime(duration)}</td>
 </tr>
`;
