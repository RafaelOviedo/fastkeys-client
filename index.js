import { KeyboardsProvider } from './src/providers/keyboards.provider.js';
import { CartProvider } from './src/providers/cart.provider.js';

import { useSpinner } from './src/composables/useSpinner.js';
import { useToast } from './src/composables/useToast.js';

import { createProductCard } from './src/KeyboardsPage/helpers.js';
import { addToLocalStorage } from './src/helpers/handleLocalStorage.js';

const { setIsLoading, removeIsLoading } = useSpinner();
const { showToast } = useToast();

const keyboardsProvider = KeyboardsProvider.getInstance();
const cartProvider = CartProvider.getInstance();

const resultsTitle = document.querySelector('.results-title');
const pillText = document.querySelector('.pill-text');
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

    resultsTitle.textContent = `Showing ${filteredKeyboards().length ?? 0} results`
    pillText.textContent = `${filteredKeyboards().length ?? 0} Most sold products below`

    renderMainKeyboards();
  }
  catch (error) {
    throw new Error(error);
  }
  finally {
    removeIsLoading()
  }
}

function filteredKeyboards() {
  return keyboards.records.filter((element) => element.fields.rating === 5)
}

async function addToCart(keyboard) {
  await cartProvider.addProductToCart({
    imageSrc: keyboard.fields.imageSrc,
    title: keyboard.fields.title,
    description: keyboard.fields.description,
    price: keyboard.fields.price,
    rating: keyboard.fields.rating,
    category: keyboard.fields.category,
    quantity: 1
  })

  showToast(`Tu teclado ${keyboard.fields.title} se agregó al carrito`)

  addToLocalStorage();
}

getMainKeyboards();
