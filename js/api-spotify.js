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
      const response = res.responseJSON;
      console.log("Data: ", response);

      $("#page-title").text("Categories");
      $("#data-container").append(
        `<div class='category-list row' id="category-list"></div>`
      );

      response.categories.items.forEach((item) => {
        $("#category-list").append(`
          <div class='category-item'
          style="
    background-image: url(${item.icons[0].url})"
          >
          
            <h2>${item.name}</h2>
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

function renderErrorMessage(msg) {
  $("#data-container").append(
    `<div class='error-container' id="error">
        <h2>Data Error</h2>
        <p>${msg}</p>
        <button id='retry-error' type="button" class="btn btn-primary">Retry</button>
    </div>`
  );

  /**
   * Error Recover Button Event Listener
   */
  $("#retry-error").click(function () {
    console.log("hello");
    authorize();
  });
}
