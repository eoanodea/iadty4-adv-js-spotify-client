import { authorize, categories } from "./api-spotify.js";

$(document).ready(function () {
  console.log("Document has loaded");

  if (!sessionStorage.getItem("token")) authorize();
  categories();
});
