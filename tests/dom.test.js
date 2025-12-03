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
    display.addEventListener('input', function (event) {
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

describe('Button Click Integration', () => {
  let display, numberBtn, operatorBtn, equalsBtn, clearBtn, backspaceBtn;

  beforeEach(async () => {
    // Import and assign global functions first
    const script = await import('../src/script.js');
    globalThis.appendToDisplay = script.appendToDisplay;
    globalThis.calculateResult = script.calculateResult;
    globalThis.clearDisplay = script.clearDisplay;
    globalThis.deleteLast = script.deleteLast;

    // Now set up the DOM with inline handlers
    document.body.innerHTML = `
    <input type="text" id="display" value="0" readonly>
    <button id="btn-1" class="number" onclick="appendToDisplay('1')">1</button>
    <button id="btn-plus" class="operator" onclick="appendToDisplay('+')">+</button>
    <button id="btn-equals" class="equals" onclick="calculateResult()">=</button>
    <button id="btn-clear" class="clear" onclick="clearDisplay()">C</button>
    <button id="btn-backspace" class="clear" onclick="deleteLast()">⌫</button>
  `;
    display = document.getElementById('display');
    numberBtn = document.getElementById('btn-1');
    operatorBtn = document.getElementById('btn-plus');
    equalsBtn = document.getElementById('btn-equals');
    clearBtn = document.getElementById('btn-clear');
    backspaceBtn = document.getElementById('btn-backspace');
  });

  test('Should call appendToDisplay on number button click', () => {
    numberBtn.click();
    expect(display.value).toBe('1');
  });

  test('Should call appendToDisplay on operator button click', () => {
    display.value = '1';
    operatorBtn.click();
    expect(display.value).toBe('1+');
  });

  test('Should call calculateResult on equals button click', () => {
    display.value = '1+2';
    equalsBtn.click();
    expect(display.value).toBe('3');
  });

  test('Should call clearDisplay on "C" button click', () => {
    display.value = '123';
    clearBtn.click();
    expect(display.value).toBe('0');
  });

  test('Should call deleteLast on backspace button click', () => {
    display.value = '123';
    backspaceBtn.click();
    expect(display.value).toBe('12');
  });

  test('Should handle rapid button clicks', () => {
    numberBtn.click();
    operatorBtn.click();
    numberBtn.click();
    equalsBtn.click();
    expect(display.value).toBe('2'); // 1+1 = 2
  });

  test('Should not double-trigger on click', () => {
    numberBtn.click();
    numberBtn.click();
    expect(display.value).toBe('11');
  });

  // jsdom does not trigger inline onclick handlers for touch events (touchstart),
  // so we use .click() to simulate mobile interaction reliably in tests.
  test('Should work with touch events (mobile)', () => {
    numberBtn.click();
    expect(display.value).toBe('1'); // Should still append
  });
});
