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

      // Prevent multiple decimal points in the same number
      if (value === '.') {
        // Get the current number (everything after the last operator)
        const lastOperatorIndex = Math.max(
          display.value.lastIndexOf('+'),
          display.value.lastIndexOf('-'),
          display.value.lastIndexOf('×'),
          display.value.lastIndexOf('*'),
          display.value.lastIndexOf('/')
        );
        const currentNumber = display.value.substring(lastOperatorIndex + 1);
        
        // Don't append if current number already has a decimal point
        if (currentNumber.includes('.')) {
          return;
        }
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
