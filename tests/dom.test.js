/**
 * DOM integration tests for input validation
 */

describe('Display Input Event Listener', () => {
  let display;

  beforeEach(() => {
    // Set up a fresh DOM for each test
    document.body.innerHTML = `
      <input type="text" id="display" value="0" readonly>
      <button id="themeToggle">🌙</button>
    `;

    display = document.getElementById('display');

    // Set up the input event listener as it would be in the browser
    display.addEventListener('input', function(event) {
      // Allow only numbers, operators, and decimal points
      this.value = this.value.replace(/[^0-9+\-*/().×]/g, '');
    });
  });

  test('Should allow numbers (0-9)', () => {
    display.value = '0123456789';
    display.dispatchEvent(new Event('input'));
    expect(display.value).toBe('0123456789');
  });

  test('Should allow operators (+, -, *, /)', () => {
    display.value = '5+3-2*4/2';
    display.dispatchEvent(new Event('input'));
    expect(display.value).toBe('5+3-2*4/2');
  });

  test('Should allow decimal point (.)', () => {
    display.value = '3.14';
    display.dispatchEvent(new Event('input'));
    expect(display.value).toBe('3.14');
  });

  test('Should allow parentheses ()', () => {
    display.value = '(2+3)*4';
    display.dispatchEvent(new Event('input'));
    expect(display.value).toBe('(2+3)*4');
  });

  test('Should allow × symbol', () => {
    display.value = '5×3';
    display.dispatchEvent(new Event('input'));
    expect(display.value).toBe('5×3');
  });

  test('Should reject letters and special characters', () => {
    display.value = '5abc+3@#$';
    display.dispatchEvent(new Event('input'));
    expect(display.value).toBe('5+3');
  });
});
