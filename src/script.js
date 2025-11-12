let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetDisplay = false;

// Export state getters/setters for testing
export function getShouldResetDisplay() {
  return shouldResetDisplay;
}

export function setShouldResetDisplay(value) {
  shouldResetDisplay = value;
}

// Initialize display
if (display) {
  display.value = '0';
}

export function appendToDisplay(value) {
  // Get display dynamically to support testing
  const displayElement = display || document.getElementById('display');
  if (!displayElement) return;

  if (shouldResetDisplay) {
    displayElement.value = '';
    shouldResetDisplay = false;
  }

  // Prevent multiple decimal points in the same number
  if (value === '.') {
    // Get the current number (everything after the last operator)
    const lastOperatorIndex = Math.max(
      displayElement.value.lastIndexOf('+'),
      displayElement.value.lastIndexOf('-'),
      displayElement.value.lastIndexOf('×'),
      displayElement.value.lastIndexOf('*'),
      displayElement.value.lastIndexOf('/')
    );
    const currentNumber = displayElement.value.substring(lastOperatorIndex + 1);

    // Don't append if current number already has a decimal point
    if (currentNumber.includes('.')) {
      return;
    }
  }

  if (displayElement.value === '0' && value !== '.') {
    displayElement.value = value;
  } else {
    displayElement.value += value;
  }

  // Replace × with * for calculation
  if (value === '*') {
    displayElement.value = displayElement.value.slice(0, -1) + '×';
  }

  // Remove error styling when user starts typing
  displayElement.classList.remove('error-text');
}

export function clearDisplay() {
  const displayElement = display || document.getElementById('display');
  if (!displayElement) return;

  displayElement.value = '0';
  currentInput = '';
  operator = '';
  previousInput = '';
  shouldResetDisplay = false;
  displayElement.classList.remove('error-text');
}

export function deleteLast() {
  const displayElement = display || document.getElementById('display');
  if (!displayElement) return;

  if (displayElement.value.length > 1) {
    displayElement.value = displayElement.value.slice(0, -1);
  } else {
    displayElement.value = '0';
  }
}

// Safer mathematical expression evaluator
export function safeEvaluate(expression) {
  // Enhanced validation - check for valid mathematical expression
  if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
    throw new Error('Invalid characters in expression');
  }

  // Check for consecutive operators (except minus after operators for negative numbers)
  if (/[+\-*/]{2,}/.test(expression.replace(/[+\-*/]-/g, ''))) {
    throw new Error('Invalid operator sequence');
  }

  // Check for multiple decimal points in a number
  if (/\d+\.\d*\.\d*/.test(expression)) {
    throw new Error('Invalid decimal format');
  }

  // Use Function constructor with restricted scope - safer than eval
  try {
    const result = Function(`"use strict"; return (${expression})`)();
    return result;
  } catch (error) {
    throw new Error('Mathematical error');
  }
}

export function calculateResult() {
  const displayElement = display || document.getElementById('display');
  if (!displayElement) return;

  try {
    // Replace × with * for evaluation
    let expression = displayElement.value.replace(/×/g, '*');

    // Evaluate using safer method
    let result = safeEvaluate(expression);

    // Handle division by zero and other edge cases
    if (!isFinite(result)) {
      if (isNaN(result)) {
        displayElement.value = 'Invalid operation';
      } else {
        displayElement.value = 'Cannot divide by zero';
      }
      displayElement.classList.add('error-text');
    } else {
      // Round to 10 decimal places to avoid floating point errors
      result = Math.round(result * 10000000000) / 10000000000;
      displayElement.value = result.toString();
      displayElement.classList.remove('error-text');
    }

    shouldResetDisplay = true;
  } catch (error) {
    // More specific error messages based on error type
    if (error.message.includes('Invalid')) {
      displayElement.value = error.message;
    } else {
      displayElement.value = 'Error';
    }
    displayElement.classList.add('error-text');
    shouldResetDisplay = true;
  }
}

// Initialize event listeners only if not in test environment
if (typeof process === 'undefined' || process.env.NODE_ENV !== 'test') {
  // Keyboard support
  document.addEventListener('keydown', function (event) {
    const key = event.key;

    // Numbers and decimal point
    if ((key >= '0' && key <= '9') || key === '.') {
      appendToDisplay(key);
    }

    // Operators
    else if (key === '+' || key === '-' || key === '/') {
      appendToDisplay(key);
    } else if (key === '*') {
      appendToDisplay('*');
    }

    // Enter or equals for calculation
    else if (key === 'Enter' || key === '=') {
      event.preventDefault();
      calculateResult();
    }

    // Escape or 'c' for clear
    else if (key === 'Escape' || key.toLowerCase() === 'c') {
      clearDisplay();
    }

    // Backspace for delete
    else if (key === 'Backspace') {
      event.preventDefault();
      deleteLast();
    }
  });

  // Prevent invalid characters from being typed
  if (display) {
    display.addEventListener('input', function (event) {
      // Allow only numbers, operators, and decimal points
      this.value = this.value.replace(/[^0-9+\-*/().×]/g, '');
    });
  }

  // Theme Toggle Functionality
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  if (themeToggle && body) {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
      themeToggle.textContent = '☀️';
    } else {
      themeToggle.textContent = '🌙';
    }

    // Theme toggle event listener
    themeToggle.addEventListener('click', function () {
      body.classList.toggle('dark-mode');

      // Update button icon and save preference
      if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
      } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
      }
    });
  }
}
