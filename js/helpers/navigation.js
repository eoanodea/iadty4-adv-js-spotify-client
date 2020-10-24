import { fetchDataType, fetchData, fetchDetail } from "./../api-spotify.js";
import { navigationListener } from "./listener.js";

/**
 * Builds the sidebar navigation
 *
 * @param {string} name - The window hash, defaults to the browser url bar
 */
export const buildNavigation = (name = window.location.hash) => {
  if ($("#side-nav").length) $("#side-nav").empty();
  fetchDataType.forEach((item, i) => {
    const isActive = name.includes(item.name);

    $("#side-nav").append(`
        <li class="nav-item" key="${i}">
        <a class="nav-link ${isActive ? "active" : ""}" href="#${
      item.name
    }" id="nav-link">
          <span data-feather="home"></span>
          ${item.name.replace("-", " ")} ${
      isActive ? '<span class="sr-only">(current)</span>' : ""
    }
        </a>
      </li>
        `);
  });

  navigationListener(".nav-link");
};

export const updateNavigation = (name) => {
  console.log("updating navigation!", name);
  buildNavigation(name);

  fetchData(name);
};
