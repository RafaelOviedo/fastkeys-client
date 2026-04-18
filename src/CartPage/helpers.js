import { formatNumber } from '../utils/formatNumber.js';

export function createCartProductCard(container, resource, element) {
  const cartProductCard = document.createElement(element);

  cartProductCard.setAttribute('imageSrc', resource.fields.imageSrc);
  cartProductCard.setAttribute('title', resource.fields.title);
  cartProductCard.setAttribute('description', resource.fields.description);
  cartProductCard.setAttribute('price', formatNumber(resource.fields.price));
  cartProductCard.setAttribute('quantity', resource.fields.quantity);

  container.append(cartProductCard);

  return cartProductCard;
}
