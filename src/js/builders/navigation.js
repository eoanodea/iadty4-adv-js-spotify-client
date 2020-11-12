/**
 * Builds up a single item
 * within the navigation array
 *
 * @param {String} name - Name of the current nav item
 * @param {String} windowName - window location hash
 * @param {int} i - Index of the array item
 */
export const buildNavItem = (name, windowName, i) => {
  const isActive = windowName.includes(name);

  return `
        <li class="nav-item" key="${i}">
            <a 
                class="nav-link ${isActive ? "active" : ""}" 
                href="#${name}" 
                id="nav-link"
            >
                <span data-feather="home"></span>
                ${name.replace("-", " ")} ${
    isActive ? '<span class="sr-only">(current)</span>' : ""
  }
            </a>
        </li>
    `;
};
