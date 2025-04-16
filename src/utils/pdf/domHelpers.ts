
// Helper functions for DOM manipulation during PDF export

// Safely check if an element exists and is attached to the DOM
export const elementExists = (element: Element | null): boolean => {
  return !!(element && document.body.contains(element));
};

// Safely get an element by its id or selector
export const safeGetElement = (selector: string): HTMLElement | null => {
  try {
    return document.querySelector(selector) as HTMLElement;
  } catch (error) {
    console.warn(`Could not find element with selector: ${selector}`, error);
    return null;
  }
};

// Safely remove an element without causing DOM errors
export const safeRemoveElement = (element: Element | null): void => {
  if (!element) return;
  
  try {
    // Check if element is in the DOM and has a parent
    if (elementExists(element) && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  } catch (error) {
    console.warn('Failed to safely remove element:', error);
  }
};
