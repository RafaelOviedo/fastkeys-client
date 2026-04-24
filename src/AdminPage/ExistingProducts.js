import { KeyboardsProvider } from '../providers/keyboards.provider.js';
import { createEditProductCard } from './helpers.js';

import { useSpinner } from '../composables/useSpinner.js';
import { useToast } from '../composables/useToast.js';

const { setIsLoading, removeIsLoading } = useSpinner();
const { showToast } = useToast();

let updateProductBody = {
  fields: {
    title: '',
    price: 0,
    imageSrc: '',
    category: '',
    rating: 0,
    description: '',
  }
}

const keyboardsProvider = KeyboardsProvider.getInstance();

let keyboards;
let currentKeyboardEditId;

const form = document.querySelector('.contact-form-container');

const keyboardsContainer = document.querySelector('.product-cards-container');

const createButton = document.querySelector('.submit-button');
const updateButton = document.querySelector('.submit-button-update');
const submitButtonUpdateContainer = document.querySelector('.submit-button-update-container');
const cancelEditModeButton = document.querySelector('.cancel-submit-update-button');

cancelEditModeButton.addEventListener('click', (event) => cancelEditMode(event));

updateButton.addEventListener('click', async (event) => {
  event.preventDefault();
  setIsLoading('.product-cards-container');
  await onSubmitUpdate();
  cancelEditMode(event);
  cleanForm();
  removeIsLoading();
})

export async function getKeyboards() {
  setIsLoading('.product-cards-container');
  keyboards = await keyboardsProvider.getKeyboards();
  removeIsLoading();
  renderKeyboards();
}

async function renderKeyboards() {
  keyboardsContainer.innerHTML = '';

  keyboards.records.forEach((keyboard) => {
    const product = createEditProductCard(keyboardsContainer, keyboard, 'ek-edit-product-card')

    const deleteButton = product.querySelector('.delete-icon-wrapper');
    deleteButton.addEventListener('click', () => deleteKeyboard(keyboard.id))

    const editButton = product.querySelector('.pencil-icon-wrapper');
    editButton.addEventListener('click', () => editKeyboard(keyboard))
  });
}

async function deleteKeyboard(id) {
  setIsLoading('.product-cards-container');
  await keyboardsProvider.deleteKeyboard(id);
  await getKeyboards();

  showToast(`El teclado se eliminó de la lista correctamente`)
  removeIsLoading();
}

async function onSubmitUpdate() {
  setIsLoading('.product-cards-container');

  const isValidForm = validateForm();

  if (!isValidForm) {
    removeIsLoading();
    return;
  }

  await keyboardsProvider.updateKeyboard(currentKeyboardEditId, updateProductBody);
  await getKeyboards();

  showToast(`Tu teclado se modificó correctamente`);

  removeIsLoading();
  return;
}

function validateForm() {
  if (updateProductBody.fields.title === '' ||
    updateProductBody.fields.price === 0 ||
    updateProductBody.fields.imageSrc === '' ||
    updateProductBody.fields.category === '' ||
    updateProductBody.fields.rating === 0 ||
    updateProductBody.fields.description === ''
  ) {
    showToast('Completa todos los campos para modificar un teclado', 'error');
    return false;
  }

  return true;
}

function editKeyboard(keyboard) {
  startEditMode();
  scrollToTop();
  currentKeyboardEditId = keyboard.id;

  document.querySelector('.title').value = keyboard.fields.title;
  document.querySelector('.price').value = keyboard.fields.price;
  document.querySelector('.imageSrc').value = keyboard.fields.imageSrc;
  document.querySelector('.category').value = keyboard.fields.category;
  document.querySelector('.rating').value = keyboard.fields.rating;
  document.querySelector('.description').value = keyboard.fields.description;

  updateProductBody = {
    fields: {
      title: keyboard.fields.title,
      price: keyboard.fields.price,
      imageSrc: keyboard.fields.imageSrc,
      category: keyboard.fields.category,
      rating: keyboard.fields.rating,
      description: keyboard.fields.description,
    }
  }
}

function startEditMode() {
  submitButtonUpdateContainer.classList.remove('hidden');
  createButton.classList.add('hidden');
}

function cancelEditMode(event) {
  event.preventDefault();

  document.querySelector('.title').value = '';
  document.querySelector('.price').value = '';
  document.querySelector('.imageSrc').value = '';
  document.querySelector('.category').value = '';
  document.querySelector('.rating').value = '';
  document.querySelector('.description').value = '';

  submitButtonUpdateContainer.classList.add('hidden');
  createButton.classList.remove('hidden');
}

function onFormUpdateChange() {
  form.addEventListener('input', (event) => {
    let { name, value } = event.target;

    if (!name) return;

    if (name === 'price' || name === 'rating') {
      value = Number(value);
    }

    updateProductBody.fields[name] = value;
  })
}

function cleanForm() {
  form.querySelectorAll('input').forEach(input => input.value = '');
  form.querySelector('textarea').value = '';
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

await getKeyboards();
onFormUpdateChange();
