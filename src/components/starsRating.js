
export class StarsRating extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const value = this.getAttribute('value');

    this.innerHTML = `
      <div class="stars-container">
        ${Array.from({ length: 5 }).map((_star, i) => {
      const filled = i < value ? "filled" : "";
      return `<span class="star ${filled}">&#9733;</span>`;
    }).join("")}
      </div>`;
  }
}

customElements.define('ek-stars-rating', StarsRating);
