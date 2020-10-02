import { authorize, categories } from "./api-spotify.js";

$(document).ready(function () {
  console.log("Document has loaded");
  // $.getScript("api-spotify.js");

  if (!sessionStorage.getItem("token")) authorize();

  categories();
  // console.log("categories!", categories);
});
