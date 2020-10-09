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
    success: function (data, status, res) {
      const response = res.responseJSON;
      console.log("Data: ", response);

      $("#data-container").append(
        `<h1 class = 'h1test'> Categories</h1><div class='category-list'></div>`
      );

      response.categories.items.forEach((item) => {
        $(".category-list").append(`
          <div class='category-item'
          style="
    background-image: url(${item.icons[0].url})"
          >
          
            <h2>${item.name}</h2>
          </div>`);
      });
    },
    error: function (request, error) {
      console.log("Request: " + JSON.stringify(request));
    },
  });
};



{/* <img 
          src='${item.icons[0].url}' 
          height=${item.icons[0].height} 
          width=${item.icons[0].width} 
          alt='${item.name} Icon' /> */}