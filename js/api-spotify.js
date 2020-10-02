const baseUrl = "https://api.spotify.com";
import variables from "./env.js";

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
    },
    error: function (request, error) {
      console.log("Request: " + JSON.stringify(request));
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
    success: function (data) {
      console.log("Data: " + data);

      //   data.categories.forEach((category) =>
      //     $("#data-container").add(`<p>${category.name}</p>`)
      //   );
    },
    error: function (request, error) {
      console.log("Request: " + JSON.stringify(request));
    },
  });
};
