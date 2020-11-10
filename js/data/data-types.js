/**
 * Different types of data in the application
 * display boolean set to true when it displays on the navigation bar
 */
export const fetchDataType = [
  {
    name: "category",
    type: "playlists",
    url: "browse/categories",
    afterURL: "playlists",
  },
  {
    name: "categories",
    type: "categories",
    url: "browse/categories",
    display: true,
  },
  { name: "new-releases", type: "albums", url: "browse/albums", display: true },
  { name: "album", type: "playlists", url: "albums" },
  { name: "albums", type: "albums", url: "albums" },
  {
    name: "featured-playlists",
    type: "playlists",
    url: "browse/playlists",
    display: true,
  },
  { name: "playlists", type: "playlists", url: "playlists" },
  { name: "playlist", type: "playlists", url: "playlists" },
];
