# Calculator Test Plan

> **Note:** This document defines the test specification. For current implementation progress and tracking, see [TODOS-Testing.md](TODOS-Testing.md).

## Testing Strategy

**Framework Recommendation:** Jest + jsdom for unit tests, Playwright for E2E tests

---

## 1. Unit Tests - Core Functions (script.js)

### 1.1 Display Management Tests

#### `appendToDisplay(value)` - 12 tests

- Should append number to empty display (0 → value)
- Should append number to existing value
- Should append decimal point
- Should not append multiple decimal points in same number
- Should replace display when `shouldResetDisplay` is true
- Should display '×' symbol when '\*' is appended
- Should remove error styling when appending
- Should handle operators (+, -, /, \*)
- Should replace '0' with first digit
- Should not replace '0.' with digit (keep decimal)
- Should append to multi-digit numbers
- Should handle consecutive operator appends

#### `clearDisplay()` - 5 tests

- Should reset display to '0'
- Should clear currentInput variable
- Should clear operator variable
- Should clear previousInput variable
- Should reset shouldResetDisplay flag
- Should remove error styling

#### `deleteLast()` - 4 tests

- Should remove last character from multi-digit number
- Should reset to '0' when deleting last character
- Should handle deletion of operators
- Should handle deletion from '0' (no change)

---

### 1.2 Calculation Engine Tests

#### `safeEvaluate(expression)` - 15 tests

- Should evaluate simple addition (2+2=4)
- Should evaluate subtraction (10-3=7)
- Should evaluate multiplication (5\*6=30)
- Should evaluate division (20/4=5)
- Should handle decimal numbers (3.14\*2)
- Should handle negative numbers (-5+3)
- Should handle parentheses ((2+3)\*4)
- Should follow order of operations (2+3\*4=14)
- Should throw error for invalid characters (abc)
- Should throw error for consecutive operators (5++3)
- Should throw error for multiple decimals (5.5.5)
- Should handle complex expressions (10+20/2-5)
- Should handle floating point precision
- Should reject SQL injection attempts
- Should reject JavaScript injection attempts

#### `calculateResult()` - 12 tests

- Should calculate and display correct result
- Should replace '×' with '\*' before calculation
- Should round to 10 decimal places
- Should handle division by zero (display error)
- Should handle NaN results (0/0)
- Should set shouldResetDisplay after calculation
- Should add error-text class on error
- Should remove error-text class on success
- Should display "Invalid operation" for NaN
- Should display "Cannot divide by zero" for Infinity
- Should display specific error messages
- Should handle empty expression

---

### 1.3 Input Validation Tests

#### Display Input Event Listener - 6 tests

- Should allow numbers (0-9)
- Should allow operators (+, -, \*, /)
- Should allow decimal point (.)
- Should allow parentheses ()
- Should allow '×' symbol
- Should reject letters and special characters

---

### 1.4 Keyboard Support Tests

#### Keyboard Event Handler - 15 tests

- Should append number on digit key press (0-9)
- Should append decimal on '.' key press
- Should append operators on +, -, /, \* keys
- Should replace '\*' with '×' visually
- Should calculate on 'Enter' key
- Should calculate on '=' key
- Should prevent default on 'Enter'
- Should clear on 'Escape' key
- Should clear on 'c' or 'C' key
- Should delete on 'Backspace' key
- Should prevent default on 'Backspace'
- Should ignore invalid keys
- Should be case-insensitive for 'c'
- Should not break with rapid key presses
- Should handle keyboard shortcuts (Ctrl+C should not affect)

---

### 1.5 Theme Toggle Tests

#### Theme Functionality - 10 tests

- Should toggle dark-mode class on body
- Should change button icon to ☀️ in dark mode
- Should change button icon to 🌙 in light mode
- Should save theme preference to localStorage
- Should load saved theme on page load
- Should default to light mode if no preference
- Should apply dark mode immediately on toggle
- Should persist theme across page reloads
- Should handle multiple rapid toggles
- Should update localStorage on each toggle

---

## 2. DOM Integration Tests

### 2.1 Display Element Tests - 6 tests

- Should initialize display with '0'
- Should update display.value when appending
- Should display error messages correctly
- Should apply/remove error-text class
- Should maintain readonly attribute
- Should truncate very long numbers appropriately

### 2.2 Button Click Tests - 8 tests

- Should call appendToDisplay on number button click
- Should call appendToDisplay on operator button click
- Should call calculateResult on equals button click
- Should call clearDisplay on 'C' button click
- Should call deleteLast on backspace button click
- Should handle rapid button clicks
- Should not double-trigger on click
- Should work with touch events (mobile)

### 2.3 Theme Button Tests - 4 tests

- Should exist in DOM
- Should have correct initial icon
- Should toggle on click
- Should have glassmorphism styles applied

---

## 3. Edge Cases & Error Handling

### 3.1 Mathematical Edge Cases - 8 tests

- Should handle very large numbers
- Should handle very small decimals
- Should handle negative zero (-0)
- Should handle scientific notation
- Should prevent stack overflow on complex expressions
- Should handle undefined results gracefully
- Should handle maximum safe integer
- Should round floating point errors (0.1+0.2)

### 3.2 Security Tests - 5 tests

- Should reject `eval()` injection attempts
- Should reject script tags in input
- Should reject XSS attempts
- Should validate all expressions before evaluation
- Should sanitize user input properly

### 3.3 State Management Tests - 6 tests

- Should maintain consistent state after error
- Should reset state correctly after clear
- Should handle state during rapid operations
- Should preserve state between calculations
- Should reset shouldResetDisplay appropriately
- Should not leak memory with repeated operations

---

## 4. UI/UX Tests

### 4.1 Visual Feedback Tests - 6 tests

- Should display error text in smaller font
- Should show red text for errors (error-text class)
- Should reset text color after recovery
- Should maintain display alignment
- Should handle text overflow
- Should maintain button styles on interaction

### 4.2 Dark Mode UI Tests - 8 tests

- Should change background gradient in dark mode
- Should change calculator background in dark mode
- Should change display background in dark mode
- Should change button colors in dark mode
- Should maintain contrast ratios in both modes
- Should apply transitions smoothly
- Should keep glassmorphism effect working
- Should persist dark mode through navigation

---

## 5. Integration/E2E Tests (Playwright/Cypress)

### 5.1 Complete User Workflows - 10 tests

- Should complete basic addition: 5 + 3 = 8
- Should complete basic subtraction: 10 - 4 = 6
- Should complete basic multiplication: 6 × 7 = 42
- Should complete basic division: 20 / 4 = 5
- Should handle complex calculation: (10+5)\*2-3 = 27
- Should recover from error and continue
- Should clear and start new calculation
- Should use keyboard for entire operation
- Should switch theme mid-calculation
- Should maintain calculation through theme switch

### 5.2 Browser Compatibility Tests - 4 tests

- Should work in Chrome
- Should work in Firefox
- Should work in Safari
- Should work in Edge

### 5.3 Responsive Tests - 4 tests

- Should display correctly on desktop (>1024px)
- Should display correctly on tablet (768-1024px)
- Should display correctly on mobile (320-767px)
- Should handle orientation changes

---

## Test Coverage Goals

### Target: 100% Code Coverage

**Line Coverage:** 100%  
**Branch Coverage:** 100%  
**Function Coverage:** 100%  
**Statement Coverage:** 100%

### Coverage Breakdown by File:

#### script.js

- All functions covered
- All branches (if/else) covered
- All error paths tested
- All event handlers tested

#### index.html

- All interactive elements tested
- All onclick handlers verified

#### styles.css

- Visual regression tests for key components
- Dark mode styles verified
- Responsive breakpoints tested

---

## Test Execution Strategy

### Phase 1: Unit Tests (Jest)

```bash
npm test -- --coverage
```

- Run on every commit
- Must pass before merge
- Aim for <500ms execution time

### Phase 2: Integration Tests (Jest + jsdom)

```bash
npm test:integration
```

- Run before pull requests
- Test DOM interactions
- Verify event handlers

### Phase 3: E2E Tests (Playwright)

```bash
npm test:e2e
```

- Run before releases
- Test real browser behavior
- Cross-browser verification

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm init -y
npm install --save-dev jest @testing-library/dom @testing-library/jest-dom
npm install --save-dev @playwright/test
```

### 2. Configure Jest

Create `jest.config.js`:

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: ['script.js'],
};
```

### 3. Create Test Files

- `script.test.js` - Core function tests
- `dom.test.js` - DOM interaction tests
- `e2e.spec.js` - Playwright E2E tests

---

## Success Criteria

✅ 100% code coverage achieved  
✅ All 150+ tests passing  
✅ No security vulnerabilities  
✅ E2E tests pass in all major browsers  
✅ Performance: Tests run in <2 seconds  
✅ Maintainable: Tests are clear and well-documented

---

## Test Maintenance

### Regular Updates Needed:

- Add tests for new features immediately
- Update tests when refactoring
- Review and remove flaky tests
- Keep dependencies updated

### CI/CD Integration:

```yaml
# Example GitHub Actions workflow
- name: Run tests
  run: |
    npm test -- --coverage
    npm run test:e2e
```

---

## Total Test Count: **150+ tests**

This comprehensive test plan ensures 100% coverage of your calculator's functionality, including edge cases, security, and user experience.
