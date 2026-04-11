
export class ProductCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const imageSrc = this.getAttribute('imageSrc');
    const title = this.getAttribute('title');
    const description = this.getAttribute('description');
    const price = this.getAttribute('price');
    const rating = this.getAttribute('rating');

    this.innerHTML = `
      <div class="product-card-component">
        <div class="product-component-image-container">
          <img class="product-component-image" src=${imageSrc} />
        </div>
        <div class="product-component-content">
          <span class="product-title">${title}</span>
          <p class="product-description">${description}</p>
          <div class="rating-container">
            <ek-stars-rating value=${rating}></ek-stars-rating>
            <span class="points-text">(${rating} out of 5)</span>
          </div>
          <div class="keyboard-specs-container">
            <span><b>Switches:</b> Outemu blue <br> <b>Layout:</b> (42 keys)</span>
          </div>
          <div class="price-buy-button-container">
            <span class="price-text">${price}</span>
            <button class="add-to-cart-button">
              <img class="button-cart-image" src="../../assets/images/icon-cart.png" />
              <span class="add-to-cart-button-text">Add to cart</span>
            </button>
          </div>
        </div>
      </div>`;
  }
}

customElements.define('ek-product-card', ProductCard);
