
export class Navbar extends HTMLElement {
  renderNavbar() {
    const cartQuantity = localStorage.getItem('cart-quantity');

    this.innerHTML = `
      <nav class="navbar">
        <div class="logo-container">
          <img class="keyboard-image" src="../../assets/images/keyboard-icon-green.png" />
          <a class="logo-text" href="../../index.html">FastKeys</a>
        </div>

        <div class="navbar-options-menu-desktop">
          <a class="navbar-option" href="../../index.html">Home</a>
          <a class="navbar-option" href="../../src/KeyboardsPage/KeyboardsPage.html">Keyboards</a>
          <a class="navbar-option" href="../../src/AboutPage/AboutPage.html">About</a>
          <a class="navbar-option" href="../../src/ContactPage/ContactPage.html">Contact</a>
        </div>

        <div class="navbar-buttons-container">
          <div class="burger-menu-container">
            <div class="burger-line"></div>
            <div class="burger-line"></div>
            <div class="burger-line"></div>
          </div>

          <a class="cart-container" href="../../src/CartPage/CartPage.html">
            <img class="cart-image" src="../../assets/images/icon-cart.png" />
            <div class="cart-quantity-container">
              <span class="cart-quantity">${cartQuantity ?? 0}</span>
            </div>
          </a>
        </div>
      </nav>
    `;

    const cartQuantityContainer = this.querySelector('.cart-quantity-container');
    cartQuantityContainer.classList.add('show-cart-quantity-container');

    this.querySelector('.burger-menu-container').addEventListener('click', () => {
      this.renderOpenNavbar();
    });
  }

  renderOpenNavbar() {
    this.innerHTML = `
      <nav class="opened-navbar-container">
        <nav class="opened-navbar">
          <div class="logo-container">
            <img class="keyboard-image" src="../../assets/images/keyboard-icon-green.png" />
            <a class="logo-text" href="../../index.html">FastKeys</a>
          </div>

          <div class="close-menu-container">
            <div class="close-button">
              &#10005;
            </div>
          </div>
        </nav>

        <div class="navbar-options-menu">
          <a class="navbar-option" href="../../index.html">Home</a>
          <a class="navbar-option" href="../../src/KeyboardsPage/KeyboardsPage.html">Keyboards</a>
          <a class="navbar-option" href="../../src/AboutPage/AboutPage.html">About</a>
          <a class="navbar-option" href="../../src/ContactPage/ContactPage.html">Contact</a>
        </div>
      </nav>`;

    this.querySelector('.close-menu-container').addEventListener('click', () => {
      this.renderNavbar();
    });
  }

  connectedCallback() {
    this.renderNavbar();
  }
}

customElements.define("ek-navbar", Navbar);
