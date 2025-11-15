/**
 * Unit tests for script.js calculator functions
 */
import {
  appendToDisplay,
  setShouldResetDisplay,
  clearDisplay,
  deleteLast,
  getShouldResetDisplay,
  getCurrentInput,
  getOperator,
  getPreviousInput,
  safeEvaluate,
  calculateResult,
} from '../src/script.js';

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

describe('clearDisplay() Function', () => {
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

  test('Should reset display to 0', () => {
    display.value = '12345';
    clearDisplay();
    expect(display.value).toBe('0');
  });

  test('Should clear currentInput variable', () => {
    display.value = '42';
    clearDisplay();
    expect(getCurrentInput()).toBe('');
  });

  test('Should clear operator variable', () => {
    display.value = '5+3';
    clearDisplay();
    expect(getOperator()).toBe('');
  });

  test('Should clear previousInput variable', () => {
    display.value = '99';
    clearDisplay();
    expect(getPreviousInput()).toBe('');
  });

  test('Should reset shouldResetDisplay flag', () => {
    setShouldResetDisplay(true);
    clearDisplay();
    expect(getShouldResetDisplay()).toBe(false);
  });

  test('Should remove error styling', () => {
    display.value = 'Error';
    display.classList.add('error-text');
    clearDisplay();
    expect(display.classList.contains('error-text')).toBe(false);
  });
});

describe('deleteLast() Function', () => {
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

  test('Should remove last character from multi-digit number', () => {
    display.value = '12345';
    deleteLast();
    expect(display.value).toBe('1234');
  });

  test('Should reset to 0 when deleting last character', () => {
    display.value = '7';
    deleteLast();
    expect(display.value).toBe('0');
  });

  test('Should handle deletion of operators', () => {
    display.value = '5+3×';
    deleteLast();
    expect(display.value).toBe('5+3');
  });

  test('Should handle deletion from 0 (no change)', () => {
    display.value = '0';
    deleteLast();
    expect(display.value).toBe('0');
  });
});

describe('safeEvaluate() Function', () => {
  describe('Simple arithmetic operations', () => {
    test('Should evaluate simple addition (2+2=4)', () => {
      const result = safeEvaluate('2+2');
      expect(result).toBe(4);
    });

    test('Should evaluate subtraction (10-3=7)', () => {
      const result = safeEvaluate('10-3');
      expect(result).toBe(7);
    });

    test('Should evaluate multiplication (5*6=30)', () => {
      const result = safeEvaluate('5*6');
      expect(result).toBe(30);
    });

    test('Should evaluate division (20/4=5)', () => {
      const result = safeEvaluate('20/4');
      expect(result).toBe(5);
    });
  });

  describe('Decimal and negative number handling', () => {
    test('Should handle decimal numbers (3.14*2)', () => {
      const result = safeEvaluate('3.14*2');
      expect(result).toBeCloseTo(6.28, 2);
    });

    test('Should handle negative numbers (-5+3)', () => {
      const result = safeEvaluate('-5+3');
      expect(result).toBe(-2);
    });
  });

  describe('Order of operations', () => {
    test('Should handle parentheses ((2+3)*4)', () => {
      const result = safeEvaluate('(2+3)*4');
      expect(result).toBe(20);
    });

    test('Should follow order of operations (2+3*4=14)', () => {
      const result = safeEvaluate('2+3*4');
      expect(result).toBe(14);
    });

    test('Should handle complex expressions (10+20/2-5)', () => {
      const result = safeEvaluate('10+20/2-5');
      expect(result).toBe(15);
    });
  });

  describe('Floating point precision', () => {
    test('Should handle floating point precision', () => {
      const result = safeEvaluate('0.1+0.2');
      expect(result).toBeCloseTo(0.3, 5);
    });
  });

  describe('Error cases', () => {
    test('Should throw error for invalid characters (abc)', () => {
      expect(() => safeEvaluate('abc')).toThrow('Invalid characters in expression');
    });

    test('Should throw error for consecutive operators (5++3)', () => {
      expect(() => safeEvaluate('5++3')).toThrow('Invalid operator sequence');
    });

    test('Should throw error for multiple decimals (5.5.5)', () => {
      expect(() => safeEvaluate('5.5.5')).toThrow('Invalid decimal format');
    });
  });

  describe('Security tests', () => {
    test('Should reject SQL injection attempts', () => {
      expect(() => safeEvaluate("'; DROP TABLE users; --")).toThrow('Invalid characters in expression');
    });

    test('Should reject JavaScript injection attempts', () => {
      expect(() => safeEvaluate('alert(1)')).toThrow('Invalid characters in expression');
    });
  });
});

describe('calculateResult() Function', () => {
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

  describe('Basic calculation', () => {
    test('Should calculate and display correct result', () => {
      display.value = '5+3';
      calculateResult();
      expect(display.value).toBe('8');
    });

    test('Should replace × with * before calculation', () => {
      display.value = '6×7';
      calculateResult();
      expect(display.value).toBe('42');
    });
  });

  describe('Precision handling', () => {
    test('Should round to 10 decimal places', () => {
      display.value = '1/3';
      calculateResult();
      // Result should be rounded to 10 decimal places
      expect(parseFloat(display.value)).toBeCloseTo(0.3333333333, 10);
    });
  });

  describe('Error handling', () => {
    test('Should handle division by zero (display error)', () => {
      display.value = '5/0';
      calculateResult();
      expect(display.value).toBe('Cannot divide by zero');
      expect(display.classList.contains('error-text')).toBe(true);
    });

    test('Should handle NaN results (0/0)', () => {
      display.value = '0/0';
      calculateResult();
      expect(display.value).toBe('Invalid operation');
      expect(display.classList.contains('error-text')).toBe(true);
    });

    test('Should display "Invalid operation" for NaN', () => {
      display.value = '0/0';
      calculateResult();
      expect(display.value).toBe('Invalid operation');
    });

    test('Should display "Cannot divide by zero" for Infinity', () => {
      display.value = '10/0';
      calculateResult();
      expect(display.value).toBe('Cannot divide by zero');
    });

    test('Should display specific error messages', () => {
      display.value = 'abc';
      calculateResult();
      expect(display.value).toContain('Invalid');
    });

    test('Should handle empty expression', () => {
      display.value = '';
      calculateResult();
      expect(display.classList.contains('error-text')).toBe(true);
    });
  });

  describe('Error styling', () => {
    test('Should add error-text class on error', () => {
      display.value = '5/0';
      calculateResult();
      expect(display.classList.contains('error-text')).toBe(true);
    });

    test('Should remove error-text class on success', () => {
      display.classList.add('error-text');
      display.value = '5+3';
      calculateResult();
      expect(display.classList.contains('error-text')).toBe(false);
    });
  });

  describe('State management', () => {
    test('Should set shouldResetDisplay after calculation', () => {
      display.value = '5+3';
      calculateResult();
      expect(getShouldResetDisplay()).toBe(true);
    });
  });
});
