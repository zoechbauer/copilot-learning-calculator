/**
 * Unit tests for script.js calculator functions
 */
import { appendToDisplay } from '../src/script.js';

describe('appendToDisplay() Function', () => {
  let display;

  beforeEach(() => {
    // Set up a fresh DOM for each test
    document.body.innerHTML = `
      <input type="text" id="display" value="0" readonly>
      <button id="themeToggle">🌙</button>
    `;

    // Get display element reference
    display = document.getElementById('display');
  });

  describe('Basic number appending', () => {
    test('Should append number to empty display (0 → value)', () => {
      display.value = '0';
      appendToDisplay('5');
      expect(display.value).toBe('5');
    });

    test('Should append number to existing value', () => {
      display.value = '5';
      appendToDisplay('3');
      expect(display.value).toBe('53');
    });
  });

  describe('Decimal point handling', () => {
    test('Should append decimal point', () => {
      display.value = '5';
      appendToDisplay('.');
      expect(display.value).toBe('5.');
    });

    test('Should not append multiple decimal points in same number', () => {
      display.value = '5.2';
      appendToDisplay('.');
      // Should NOT append - prevents multiple decimals in same number
      expect(display.value).toBe('5.2');
    });

    test('Should allow decimal point in new number after operator', () => {
      display.value = '5.2+3';
      appendToDisplay('.');
      // Should append - this is a new number after the + operator
      expect(display.value).toBe('5.2+3.');
    });
  });
});
