/**
 * Unit tests for script.js calculator functions
 */
import { appendToDisplay, setShouldResetDisplay } from '../src/script.js';

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

  describe('Display reset behavior', () => {
    test('Should replace display when shouldResetDisplay is true', () => {
      display.value = '42';
      setShouldResetDisplay(true);
      appendToDisplay('7');
      expect(display.value).toBe('7');
    });
  });

  describe('Operator display', () => {
    test('Should display × symbol when * is appended', () => {
      display.value = '5';
      appendToDisplay('*');
      expect(display.value).toBe('5×');
    });

    test('Should handle operators (+, -, /, *)', () => {
      display.value = '5';
      appendToDisplay('+');
      expect(display.value).toBe('5+');

      display.value = '10';
      appendToDisplay('-');
      expect(display.value).toBe('10-');

      display.value = '8';
      appendToDisplay('/');
      expect(display.value).toBe('8/');

      display.value = '6';
      appendToDisplay('*');
      expect(display.value).toBe('6×');
    });
  });

  describe('Error styling', () => {
    test('Should remove error styling when appending', () => {
      display.value = 'Error';
      display.classList.add('error-text');
      appendToDisplay('5');
      expect(display.classList.contains('error-text')).toBe(false);
    });
  });

  describe('Zero replacement behavior', () => {
    test('Should replace 0 with first digit', () => {
      display.value = '0';
      appendToDisplay('7');
      expect(display.value).toBe('7');
    });

    test('Should not replace 0. with digit (keep decimal)', () => {
      display.value = '0.';
      appendToDisplay('5');
      expect(display.value).toBe('0.5');
    });
  });

  describe('Multi-digit numbers', () => {
    test('Should append to multi-digit numbers', () => {
      display.value = '123';
      appendToDisplay('4');
      expect(display.value).toBe('1234');

      appendToDisplay('5');
      expect(display.value).toBe('12345');
    });
  });

  describe('Consecutive operators', () => {
    test('Should handle consecutive operator appends', () => {
      display.value = '5+';
      appendToDisplay('-');
      expect(display.value).toBe('5+-');

      display.value = '10';
      appendToDisplay('*');
      expect(display.value).toBe('10×');
      appendToDisplay('+');
      expect(display.value).toBe('10×+');
    });
  });
});
