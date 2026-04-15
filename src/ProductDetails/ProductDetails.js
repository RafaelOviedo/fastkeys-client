import { KeyboardsProvider } from '../providers/keyboards.provider.js';
import { CartProvider } from '../providers/cart.provider.js';

import { useSpinner } from '../composables/useSpinner.js';
import { useToast } from '../composables/useToast.js';

import { formatNumber } from '../utils/formatNumber.js';
import { addToLocalStorage } from '../helpers/handleLocalStorage.js';

const { setIsLoading, removeIsLoading } = useSpinner();
const { showToast } = useToast();

const HttpStatusCode = {
  NOT_FOUND: 'NOT_FOUND',
}

const keyboardsProvider = KeyboardsProvider.getInstance();
const cartProvider = CartProvider.getInstance();

let keyboard;

async function renderProductDetails() {
  document.querySelector('.rating-container').innerHTML += `<ek-stars-rating value=${keyboard.fields.rating}></ek-stars-rating>`;
  document.querySelector('.product-details-title').textContent = keyboard.fields.title;
  document.querySelector('.product-details-description').textContent = keyboard.fields.description;
  document.querySelector('.product-details-price').textContent = formatNumber(keyboard.fields.price);
  document.querySelector('.points-text').textContent = `${keyboard.fields.rating} out of 5 stars`;
  document.querySelector('.product-details-image').src = keyboard.fields.imageSrc;
}

async function getProductDetails() {
  try {
    setIsLoading('.image-content-container');
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    keyboard = await keyboardsProvider.getKeyboardById(id);

    if (keyboard.error === HttpStatusCode.NOT_FOUND) {
      window.location.href = '../NotFound/404.html';
      throw new Error('This keyboard does not exist');
    }

    renderProductDetails();

    const addToCartButton = document.querySelector('.add-to-cart-button');

    addToCartButton.addEventListener('click', () => addToCart(keyboard));
  }
  catch (error) {
    throw new Error(error);
  }
  finally {
    removeIsLoading();
  }
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

getProductDetails();

