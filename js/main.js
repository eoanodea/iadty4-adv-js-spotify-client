import { authorize, categories } from "./api-spotify.js";

$(document).ready(function () {
  console.log("Document has loaded");

  /**
   * If no auth token is found, get one from spotify
   */
  if (!sessionStorage.getItem("token")) authorize();
  else categories();

  /**
   * Sort Data Event Listener
   */
  $("#sort-data").change(function () {
    const items = $("#data-container .row").children();

    items.sort((a, b) => {
      $(a).find("h2").text() > $(b).find("h2").text();
    });
    console.log(
      "yeehaw",
      $("#data-container .row")
        .children()
        .each(function (index) {
          console.log($(this).text);
        })
    );
  });
});
