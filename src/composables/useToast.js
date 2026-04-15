
export function useToast() {

  function showToast(message, type = 'success', duration = 3000) {
    const container = document.querySelector('.toast-container');
    const toast = document.createElement('div');

    toast.classList.add('toast');
    toast.classList.add('show');
    toast.classList.add(`${type}`);
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  return { showToast };
}
