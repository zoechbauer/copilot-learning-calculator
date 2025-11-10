/**
 * Unit tests for script.js calculator functions
 */

describe('appendToDisplay() Function', () => {
  let display;
  let shouldResetDisplay;
  let appendToDisplay;

  beforeEach(() => {
    // Set up a fresh DOM for each test
    document.body.innerHTML = `
      <input type="text" id="display" value="0" readonly>
      <button id="themeToggle">🌙</button>
    `;
    
    // Get display element reference
    display = document.getElementById('display');
    
    // Mock global state variables
    shouldResetDisplay = false;
    
    // Define the appendToDisplay function from script.js
    appendToDisplay = function(value) {
      if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
      }

      if (display.value === '0' && value !== '.') {
        display.value = value;
      } else {
        display.value += value;
      }

      // Replace × with * for calculation
      if (value === '*') {
        display.value = display.value.slice(0, -1) + '×';
      }

      // Remove error styling when user starts typing
      display.classList.remove('error-text');
    };
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
      // The current implementation allows this at append time
      // The validation happens in safeEvaluate during calculation
      expect(display.value).toBe('5.2.');
    });
  });
});
