import { fetchDataType } from "../data/data-types.js";
import { fetchData } from "../data/api-spotify.js";
import { navigationListener } from "./listener.js";

/**
 * Builds the sidebar navigation from the fetchDataType
 *
 * @param {string} name - The window hash, defaults to the browser url bar
 */
export const buildNavigation = (name = window.location.hash) => {
  if ($("#side-nav").length) $("#side-nav").empty();
  if ($(".item-image").length) $(".item-image").remove();

  fetchDataType
    .filter((item) => item.display)
    .forEach((item, i) => {
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

/**
 * Upates the navigation type
 *
 * @param {*} name
 */
export const updateNavigation = (name) => {
  buildNavigation(name);
  fetchData(name);
};
