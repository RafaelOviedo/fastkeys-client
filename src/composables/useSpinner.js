
export function useSpinner() {
  let spinner;
  let contentContainer;

  function setIsLoading(container) {
    spinner = document.querySelector('.spinner');
    contentContainer = document.querySelector(container);
    contentContainer.classList.add('hidden');
    spinner.classList.remove('hidden');
  }

  function removeIsLoading() {
    contentContainer.classList.remove('hidden');
    spinner.classList.add('hidden');
  }

  return { setIsLoading, removeIsLoading }
}

