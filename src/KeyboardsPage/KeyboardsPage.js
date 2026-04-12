import { KeyboardsProvider } from '../providers/keyboards.provider.js';
import { CartProvider } from "../providers/cart.provider.js";

import { useSpinner } from '../composables/useSpinner.js';
import { useToast } from '../composables/useToast.js';

import { createProductCard } from './helpers.js';
import { addToLocalStorage } from '../helpers/handleLocalStorage.js';

const keyboardsProvider = KeyboardsProvider.getInstance();
const cartProvider = CartProvider.getInstance();

const { setIsLoading, removeIsLoading } = useSpinner();
const { showToast } = useToast();

const keyboardsContainer = document.querySelector('.product-cards-container');
const resultsTitle = document.querySelector('.results-title');
const searchInput = document.querySelector('.search-input');
const selectInput = document.querySelector('.filter-select')

let keyboards;

async function renderKeyboards(keyboards) {
  keyboards.forEach((keyboard) => {
    const productCard = createProductCard(keyboardsContainer, keyboard, 'ek-product-card')

    const imageContainer = productCard.querySelector('.product-component-image-container');
    const addToCartButton = productCard.querySelector('.add-to-cart-button');

    imageContainer.addEventListener('click', () => {
      window.location.href = `../ProductDetails/ProductDetails.html?id=${keyboard.id}`;
    });

    addToCartButton.addEventListener('click', () => addToCart(keyboard))
  });
}

async function getKeyboards() {
  try {
    setIsLoading('.product-cards-container');
    keyboards = await keyboardsProvider.getKeyboards();

    renderKeyboards(keyboards.records);
  }
  catch (error) {
    throw new Error(error);
  }
  finally {
    removeIsLoading();
    resultsTitle.textContent = `Showing ${keyboards.records.length ?? 0} results`
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

function filterBySearch() {
  searchInput.addEventListener('input', (event) => {
    const { value } = event.target;

    keyboardsContainer.innerHTML = '';
    const filteredKeyboards = keyboards.records.filter((keyboard) => keyboard.fields.title.toLowerCase().includes(value.toLowerCase()));

    renderKeyboards(filteredKeyboards);
    resultsTitle.textContent = `Showing ${filteredKeyboards.length ?? 0} results`
  })
}

function filterByOption() {
  selectInput.addEventListener('change', (event) => {
    const { value } = event.target;
    let filteredKeyboards;

    keyboardsContainer.innerHTML = '';

    filteredKeyboards = keyboards.records.filter((keyboard) => keyboard.fields.category === value);

    if (value === 'name-a-z') {
      filteredKeyboards = keyboards.records.sort((a, b) => { return a.fields.title > b.fields.title ? 1 : -1 });
    }

    if (value === 'price-low-to-high') {
      filteredKeyboards = keyboards.records.sort((a, b) => { return a.fields.price > b.fields.price ? 1 : -1 });
    }

    renderKeyboards(filteredKeyboards);

    if (value === '') {
      renderKeyboards(keyboards.records);
    }

    resultsTitle.textContent = `Showing ${filteredKeyboards.length ?? 0} results`
  })
}

await getKeyboards();
filterBySearch();
filterByOption();

