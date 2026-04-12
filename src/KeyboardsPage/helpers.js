import { formatNumber } from '../utils/formatNumber.js';

export function createProductCard(container, resource, element) {
  const productCard = document.createElement(element);

  productCard.setAttribute('imageSrc', resource.fields.imageSrc);
  productCard.setAttribute('title', resource.fields.title);
  productCard.setAttribute('description', resource.fields.description);
  productCard.setAttribute('price', formatNumber(resource.fields.price));
  productCard.setAttribute('rating', resource.fields.rating);

  container.appendChild(productCard);

  return productCard;
}
