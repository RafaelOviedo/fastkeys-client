
export function addToLocalStorage() {
  const cartQuantity = JSON.parse(document.querySelector('.cart-quantity').textContent);
  const updatedCartQuantity = document.querySelector('.cart-quantity').textContent = cartQuantity + 1;
  localStorage.setItem('cart-quantity', updatedCartQuantity);
}

export function removeFromLocalStorage() {
  const cartQuantity = JSON.parse(document.querySelector('.cart-quantity').textContent);
  const updatedCartQuantity = document.querySelector('.cart-quantity').textContent = cartQuantity - 1;
  localStorage.setItem('cart-quantity', updatedCartQuantity);
}
