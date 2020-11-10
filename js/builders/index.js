import { albumList, buildAlbumArr, albumItem } from "./albums.js";
import { categoryItem, categoryList, buildCategoryArr } from "./categories.js";
import { buildPlaylistArr, playlistList, playlistItem } from "./playlists.js";
import { buildSongsArr, songList, songItem } from "./songs.js";

/**
 * Determinds which detail to build
 *
 * @param {*} items - the items arr from spotify
 * @param {*} type - the type of data it is
 *
 * @returns {itemsArr, list, singleItem} - To be appended to the document
 */
export const buildDetail = (response, type) => {
  switch (type.name) {
    case "categories":
      return buildCategory(response[type.type].items);
    case "playlists":
      return buildPlaylist(response);
    case "albums":
      return buildSongs(response);
    default:
      return buildAlbum(response[type.type].items, type);
  }
};
/**
 * Builds the category list
 *
 * @param {*} items - the items arr from spotify - the items arr from spotify
 */
const buildCategory = (items) => {
  const itemsArr = buildCategoryArr(items);
  const list = categoryList();
  const singleItem = categoryItem;
  const dataName = "#data-container #item-list";
  return { itemsArr, list, singleItem, dataName };
};

/**
 * Builds the album list
 *
 * @param {*} items - the items arr from spotify
 * @param {*} type - the type of data it is
 */
const buildAlbum = (items, type) => {
  const itemsArr = buildAlbumArr(items, type.type);
  const list = albumList();
  const singleItem = albumItem;
  const dataName = "#data-container #item-list";

  return { itemsArr, list, singleItem, dataName };
};

/**
 * Builds the playlist list
 *
 * @param {*} items - the items arr from spotify
 */
const buildPlaylist = (item) => {
  const items = buildPlaylistArr(item);
  const list = playlistList(items.header);
  const singleItem = playlistItem;
  const dataName = "#data-container #item-list";

  return { itemsArr: items.tracks, list, singleItem, dataName };
};

/**
 * Builds the playlist list
 *
 * @param {*} items - the items arr from spotify
 */
const buildSongs = (item) => {
  const items = buildSongsArr(item);
  const list = songList(items.header);
  const singleItem = songItem;
  const dataName = "#data-container #item-list";

  return { itemsArr: items.tracks, list, singleItem, dataName };
};
