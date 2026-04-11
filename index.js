import { KeyboardsProvider } from './src/providers/keyboards.provider.js';

import { useSpinner } from './src/composables/useSpinner.js';

import { createProductCard } from './src/KeyboardsPage/helpers.js';

const { setIsLoading, removeIsLoading } = useSpinner();

const keyboardsProvider = KeyboardsProvider.getInstance();

const keyboardsContainer = document.querySelector('.product-cards-container');

let keyboards;

async function renderMainKeyboards() {
  keyboards.records
    .filter((element) => element.fields.rating === 5)
    .forEach((keyboard) => {
      const productCard = createProductCard(keyboardsContainer, keyboard, 'ek-product-card')

      const imageContainer = productCard.querySelector('.product-component-image-container');
      const addToCartButton = productCard.querySelector('.add-to-cart-button');

      imageContainer.addEventListener('click', () => {
        window.location.href = `./src/ProductDetails/ProductDetails.html?id=${keyboard.id}`;
      });

      addToCartButton.addEventListener('click', () => addToCart(keyboard));
    });
}

async function getMainKeyboards() {
  try {
    setIsLoading('.product-cards-container')
    keyboards = await keyboardsProvider.getKeyboards();

    renderMainKeyboards();
  }
  catch (error) {
    throw new Error(error);
  }
  finally {
    removeIsLoading()
  }
}

getMainKeyboards();
