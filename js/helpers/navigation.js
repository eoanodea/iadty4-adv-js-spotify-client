import { fetchData } from "./../api-spotify.js";
import { navigationListener } from "./listener.js";

const navigationArr = [
  { name: "categories", type: "categories", active: true },
  { name: "new-releases", type: "albums", active: false },
];

export const buildNavigation = (name = window.location.hash) => {
  if ($("#side-nav").length) $("#side-nav").empty();
  navigationArr.forEach((item, i) => {
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
