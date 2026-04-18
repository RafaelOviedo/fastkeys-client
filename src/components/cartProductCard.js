
export class CartProductCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const imageSrc = this.getAttribute('imageSrc');
    const title = this.getAttribute('title');
    const description = this.getAttribute('description');
    const price = this.getAttribute('price');
    const quantity = this.getAttribute('quantity');

    this.innerHTML = `
      <div class="cart-product-card-component">
        <div class="cart-product-component-image-container">
          <img class="cart-product-component-image" src=${imageSrc} />
        </div>

        <div class="cart-product-component-title-container">
          <span class="cart-product-component-title">${title}</span>
          <img class="delete-icon" src="../../assets/images/delete-icon.png" />
        </div>

        <p class="cart-product-component-description">${description}</p>

        <div class="quantity-button-price-container">
          <div class="quantity-button-container">
            <button class="substract-button"><span>-</span></button>
            <span class="product-quantity">${quantity > 0 ? quantity : 0}</span>
            <button class="sum-button"><span>+</span></button>
          </div>

          <div class="product-prices-container">
            <span class="price-text">${price}</span>
            <span class="price-text-each">${price} each</span>
          </div>
        </div>
      </div>`;
  }
}

customElements.define('ek-cart-product-card', CartProductCard);
