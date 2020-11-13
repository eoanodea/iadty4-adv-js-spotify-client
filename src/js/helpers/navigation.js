import { fetchDataType } from "../data/data-types.js";
import { fetchData } from "../data/api-spotify.js";
import { navigationListener } from "./listener.js";
import { buildNavItem } from "../builders/navigation.js";

/**
 * Builds the sidebar navigation from the fetchDataType
 *
 * @param {string} name - The window hash, defaults to the browser url bar
 */
export const buildNavigation = (name = window.location.hash) => {
  if ($("#side-nav").length) $("#side-nav").empty();
  if ($(".item-image").length) $(".item-image").remove();
  if ($("#sidebarMenu").hasClass("show")) $(".navbar-toggler").click();

  fetchDataType
    .filter((item) => item.display)
    .forEach((item, i) =>
      $("#side-nav").append(buildNavItem(item.name, name, i))
    );

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
