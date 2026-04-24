import { KeyboardsProvider } from '../providers/keyboards.provider.js';
import { getKeyboards } from './ExistingProducts.js';

import { useSpinner } from '../composables/useSpinner.js';
import { useToast } from '../composables/useToast.js';

const { setIsLoading, removeIsLoading } = useSpinner();
const { showToast } = useToast();

const keyboardsProvider = KeyboardsProvider.getInstance();

let productBody = {
  fields: {
    title: '',
    price: 0,
    imageSrc: '',
    category: '',
    rating: 0,
    description: '',
  }
}

const form = document.querySelector('.contact-form-container')
const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click', async (event) => {
  event.preventDefault();
  await onSubmit();
  cleanForm();
})

function onFormChange() {
  form.addEventListener('input', (event) => {
    let { name, value } = event.target;

    if (!name) return;

    if (name === 'price' || name === 'rating') {
      value = Number(value);
    }

    productBody.fields[name] = value;
  })
}

async function onSubmit() {
  setIsLoading('.product-cards-container');
  const isValidForm = validateForm();

  if (!isValidForm) {
    removeIsLoading();
    return;
  }

  await keyboardsProvider.createKeyboard(productBody);
  await getKeyboards();

  showToast(`Tu teclado ${productBody.fields.title} se creó correctamente`);

  removeIsLoading();
}

function cleanForm() {
  form.querySelectorAll('input').forEach(input => input.value = '');
  form.querySelector('textarea').value = '';
}

function validateForm() {
  if (productBody.fields.title === '' ||
    productBody.fields.price === 0 ||
    productBody.fields.imageSrc === '' ||
    productBody.fields.category === '' ||
    productBody.fields.rating === 0 ||
    productBody.fields.description === ''
  ) {
    showToast('Completa todos los campos para crear un teclado', 'error');
    return false;
  }

  return true;
}

onFormChange();

