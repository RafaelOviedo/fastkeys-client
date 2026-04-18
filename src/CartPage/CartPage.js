import { CartProvider } from '../providers/cart.provider.js';

import { useSpinner } from '../composables/useSpinner.js';
import { useToast } from '../composables/useToast.js';

import { createCartProductCard } from './helpers.js';
import { formatNumber } from '../utils/formatNumber.js';
import { removeFromLocalStorage } from '../helpers/handleLocalStorage.js';

const TAX_VALUE = 18.40;

const cartProvider = CartProvider.getInstance();

const { setIsLoading, removeIsLoading } = useSpinner();
const { showToast } = useToast();

const cartProductsContainer = document.querySelector('.cart-products-container')

const cartItemsQuantity = document.querySelector('.items-in-cart');

let cartProducts;

function renderCartProducts() {
  cartProductsContainer.innerHTML = '';

  cartProducts.records.forEach(product => {
    const cartProductCard = createCartProductCard(cartProductsContainer, product, 'ek-cart-product-card');
    const deleteIcon = cartProductCard.querySelector('.delete-icon');
    const sumButton = cartProductCard.querySelector('.sum-button');
    const substractButton = cartProductCard.querySelector('.substract-button');

    deleteIcon.addEventListener('click', () => deleteProduct(product));
    sumButton.addEventListener('click', () => icreaseProductQuantity(product.id, product.fields.title, product.fields.quantity));
    substractButton.addEventListener('click', () => decreaseProductQuantity(product.id, product.fields.title, product.fields.quantity));
  });
}

async function getCartProducts() {
  try {
    setIsLoading('.cart-products-container')
    document.querySelector('.empty-cart-container').classList.add('hidden')

    cartProducts = await cartProvider.getCartProducts();

    setSummaryTotal();
    localStorage.setItem('cart-quantity', cartProducts.records.length);

    if (cartProducts.records.length) {
      document.querySelector('.summary-container').classList.add('show-summary-container')
      document.querySelector('.empty-cart-container').classList.add('hidden')
    } else {
      document.querySelector('.empty-cart-container').classList.remove('hidden')
      document.querySelector('.summary-container').classList.remove('show-summary-container')
    }

    renderCartProducts();
  }
  catch (error) {
    throw new Error(error);
  }
  finally {
    removeIsLoading();
    cartItemsQuantity.textContent = `${cartProducts.records.length ?? 0} items in your cart`
  }
}

async function deleteProduct(product) {
  setIsLoading('.cart-products-container')

  await cartProvider.deleteProductFromCart(product.id);
  await getCartProducts();

  showToast(`Tu teclado ${product.fields.title} se eliminó correctamente`);

  removeFromLocalStorage();
  removeIsLoading();
}

async function icreaseProductQuantity(id, title, quantity) {
  setIsLoading('.cart-products-container')

  await cartProvider.updateCartKeyboard(id, { fields: { quantity: quantity + 1 } })
  await getCartProducts();

  showToast(`Sumaste 1 a tu teclado ${title}`);

  removeIsLoading();
  renderCartProducts();
}

async function decreaseProductQuantity(id, title, quantity) {
  if (quantity === 1) {
    showToast('No puedes seleccionar menos de un teclado', 'error');
    return;
  }

  setIsLoading('.cart-products-container')

  await cartProvider.updateCartKeyboard(id, { fields: { quantity: quantity - 1 } })
  await getCartProducts();

  showToast(`Restaste 1 a tu teclado ${title}`);

  removeIsLoading();
  renderCartProducts();
}

function setSummaryTotal() {
  const totalSummaryOrder = cartProducts.records.reduce((acc, el, _arr) => acc + (el.fields.price * el.fields.quantity), 0);
  document.querySelector('.subtotal-value-text').textContent = formatNumber(totalSummaryOrder);
  document.querySelector('.total-value-text').textContent = formatNumber(totalSummaryOrder + TAX_VALUE);
}

await getCartProducts();

