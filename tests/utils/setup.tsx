import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock CSS modules
vi.mock('material-symbols', async () => {
  const actual = await vi.importActual<typeof import('material-symbols')>('material-symbols');
  return {
    ...actual,
    default: {},
    css: {
      'material-symbols-outlined': 'material-symbols-outlined',
      'material-symbols-rounded': 'material-symbols-rounded',
      'material-symbols-sharp': 'material-symbols-sharp'
    }
  };
});

// Configure jsdom
Object.defineProperty(window, 'getComputedStyle', {
  value: (element: HTMLElement) => {
    const computedStyles: { [key: string]: any } = {
      getPropertyValue: (prop: string) => {
        if (prop === 'font-variation-settings') {
          const style = element.getAttribute('style') || '';
          const match = style.match(/font-variation-settings:\s*([^;]+)/);
          return match ? match[1].trim() : '';
        }
        return '';
      }
    };

    // Get the inline styles
    const styleString = element.getAttribute('style') || '';
    const styles = styleString.split(';').reduce((acc: { [key: string]: string }, style: string) => {
      const [property, value] = style.split(':').map(s => s.trim());
      if (property && value) {
        // Convert CSS property names to camelCase
        const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        acc[camelProperty] = value;
      }
      return acc;
    }, {});

    // Handle inherited styles from parent elements
    let currentElement: HTMLElement | null = element;
    while (currentElement && !styles.color) {
      const elementStyle = currentElement.getAttribute('style') || '';
      const colorMatch = elementStyle.match(/color:\s*([^;]+)/);
      if (colorMatch) {
        styles.color = colorMatch[1].trim();
        break;
      }
      currentElement = currentElement.parentElement;
    }

    // Handle color values
    if (styles.color) {
      // Convert hex to rgb
      if (styles.color.startsWith('#')) {
        const hex = styles.color.substring(1);
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        styles.color = `rgb(${r}, ${g}, ${b})`;
      }
      // Convert color names to rgb
      else if (styles.color === 'gold') styles.color = 'rgb(255, 215, 0)';
      else if (styles.color === 'gray') styles.color = 'rgb(128, 128, 128)';
      else if (styles.color === 'blue') styles.color = 'rgb(0, 0, 255)';
      else if (styles.color === 'orange') styles.color = 'rgb(255, 165, 0)';
      else if (styles.color === 'red') styles.color = 'rgb(255, 0, 0)';
    }

    // Return both the computed styles and the parsed inline styles
    return {
      ...computedStyles,
      ...styles
    };
  }
});

// Only keep any necessary global setup, remove all HeroUI mocks
