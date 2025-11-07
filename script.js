let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetDisplay = false;

// Initialize display
display.value = '0';

function appendToDisplay(value) {
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
}

function clearDisplay() {
  display.value = '0';
  currentInput = '';
  operator = '';
  previousInput = '';
  shouldResetDisplay = false;
}

function deleteLast() {
  if (display.value.length > 1) {
    display.value = display.value.slice(0, -1);
  } else {
    display.value = '0';
  }
}

function calculateResult() {
  try {
    // Replace × with * for evaluation
    let expression = display.value.replace(/×/g, '*');

    // Basic validation to prevent code injection
    if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
      throw new Error('Invalid expression');
    }

    // Evaluate the expression
    let result = eval(expression);

    // Handle division by zero and other edge cases
    if (!isFinite(result)) {
      display.value = 'Error';
    } else {
      // Round to 10 decimal places to avoid floating point errors
      result = Math.round(result * 10000000000) / 10000000000;
      display.value = result.toString();
    }

    shouldResetDisplay = true;
  } catch (error) {
    display.value = 'Error';
    shouldResetDisplay = true;
  }
}

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
display.addEventListener('input', function (event) {
  // Allow only numbers, operators, and decimal points
  this.value = this.value.replace(/[^0-9+\-*/().×]/g, '');
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

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
