import { formatNumber } from '../utils/formatNumber.js';

export function createEditProductCard(container, resource, element) {
  const editProductCard = document.createElement(element);

  editProductCard.setAttribute('imageSrc', resource.fields.imageSrc);
  editProductCard.setAttribute('title', resource.fields.title);
  editProductCard.setAttribute('category', resource.fields.category);
  editProductCard.setAttribute('price', formatNumber(resource.fields.price));

  container.appendChild(editProductCard);

  return editProductCard;
}
