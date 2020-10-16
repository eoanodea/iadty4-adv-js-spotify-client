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
    let container = $("#data-container .row");
    let items = container.children();

    /**
     * Attempting to implement sort method getting values of all text
     */
    items.sort(function (a, b) {
      // console.log($(a).find("h2").text());
      return $(a).find("h2").text() > $(b).find("h2").text();
    });
    /**
     * This returns div
     */
    console.log("items", items);

    /**
     * This throws an error
     */
    items.forEach((item) => console.log($(item).find("h2").text()));

    container.append(items);
    // console.log(
    //   "yeehaw",
    //   $("#data-container .row")
    //     .children()
    //     .each(function (index) {
    //       console.log($(this).text);
    //     })
    // );
  });
});
