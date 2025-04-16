
export const ensureElementsVisibility = (container: HTMLElement) => {
  const allElements = container.querySelectorAll('*');
  allElements.forEach((el) => {
    if (el instanceof HTMLElement) {
      if (
        el.tagName !== 'BUTTON' && 
        !el.classList.contains('pdf-duplicate') &&
        el.style.display !== 'none'
      ) {
        el.style.color = '#000';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      }
    }
  });
};
