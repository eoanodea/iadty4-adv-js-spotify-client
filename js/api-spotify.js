const baseUrl = "https://api.spotify.com";
import variables from "./env.js";

/**
 * Get an auth token from Spotify
 * And set it in the session Storage
 */
export const authorize = () => {
  const auth = btoa(`${variables.client_id}:${variables.client_secret}`);

  $.ajax({
    url: "https://accounts.spotify.com/api/token",
    type: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      grant_type: "client_credentials",
    },
    success: function (data) {
      console.log("Data: " + data);
      sessionStorage.setItem("token", JSON.stringify(data.access_token));
      categories();
    },
    error: function (request, error) {
      console.log("Error: " + JSON.stringify(request));
    },
  });
};

/**
 * Get albums from spotify
 */
export const categories = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  if (!token) return authorize();
  $.ajax({
    url: `${baseUrl}/v1/browse/categories`,
    type: "GET",
    dataType: "json",
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (data, status, res) {
      /**
       * If an error message was previously displayed
       * empty the div
       */
      if ($("#error-box").length) {
        $("#data-container").empty();
      }

      /**
       * Get the JSON data from the response
       */
      const response = res.responseJSON;

      $("#page-title").text("Categories");
      $("#data-container").append(
        `<div class='category-list row' id="category-list"></div>`
      );

      /**
       * Append each item to
       * the #data-container div
       */
      response.categories.items.forEach((item, i) => {
        $("#category-list").append(`
          <div class='category-item item-${i}'
          key="${i}"
          style="
    background-image: url(${item.icons[0].url})"
          >
          
            <h2 class="title">${item.name}</h2>
          </div>`);
      });
    },
    error: function (request, error, res) {
      const msg = request.responseJSON;

      console.log("Error!: " + msg);

      renderErrorMessage(msg.error.message);
    },
  });
};

/**
 * Render an error message to the screen
 * @param {string} msg
 */
function renderErrorMessage(msg) {
  $("#data-container").append(
    `<div class='error-container' id="error-box">
        <h2>Data Error</h2>
        <p>${msg}</p>
        <button id='retry-error' type="button" class="btn btn-primary">Retry</button>
    </div>`
  );

  /**
   * Error Recover Button Event Listener
   */
  $("#retry-error").click(function () {
    authorize();
  });
}
