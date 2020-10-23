// export const categories = (name, imageURI) => {};

/**
 * HTML Template for Category List
 */
class CategoryList extends HTMLDivElement {
  constructor(items) {
    super(); // always call super() first in the constructor.
    // this.addEventListener("click", (e) =>
    //   this.drawRipple(e.offsetX, e.offsetY)
    // );
    items;
  }

  createWrapper() {
    let div = document.createElement("div");
    div.classList.add("category-list row");
    div.id.add("category-list");
  }

  createCategory(item, i) {
    let div = document.createElement("div");

    div.classList.add(`category-item item-${i}`);
    div.data("key", i);
    div.css("background-image", `url(${item.images[0].url})`);

    let title = document.createElement("h2");
    title.classList.add(`title`);
    title.textContent = item.name;

    div.append(title);
  }

  // Material design ripple animation.
  drawRipple(x, y) {
    let div = document.createElement("div");
    div.classList.add("ripple");

    this.appendChild(div);
    div.style.top = `${y - div.clientHeight / 2}px`;
    div.style.left = `${x - div.clientWidth / 2}px`;
    div.style.backgroundColor = "currentColor";
    div.classList.add("run");
    div.addEventListener("transitionend", (e) => div.remove());
  }
}

export default FancyButton;

customElements.define("fancy-button", FancyButton, { extends: "button" });
