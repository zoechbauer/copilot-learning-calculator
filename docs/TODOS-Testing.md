### By Category:

- [ ] Unit Tests: 21/85
- [ ] DOM Integration: 0/36
- [ ] Edge Cases: 0/19
- [ ] E2E Tests: 0/18

---

## 🎯 Current Sprint

**Focus:** Setup testing infrastructure

### Setup Tasks

- [x] Install Jest dependencies (`npm install --save-dev jest`)
- [x] Install jsdom (`npm install --save-dev @testing-library/dom @testing-library/jest-dom`)
- [x] Create `jest.config.js`
- [x] Create `package.json` test scripts
- [x] Create test file structure

---

## 📝 Test Implementation Checklist

### 1. Unit Tests - Core Functions (85 tests)

#### 1.1 Display Management (21 tests)

##### `appendToDisplay(value)` - 12 tests

- [x] Should append number to empty display (0 → value)
- [x] Should append number to existing value
- [x] Should append decimal point
- [x] Should not append multiple decimal points in same number
- [x] Should replace display when `shouldResetDisplay` is true
- [x] Should display '×' symbol when '\*' is appended
- [x] Should remove error styling when appending
- [x] Should handle operators (+, -, /, \*)
- [x] Should replace '0' with first digit
- [x] Should not replace '0.' with digit (keep decimal)
- [x] Should append to multi-digit numbers
- [x] Should handle consecutive operator appends

##### `clearDisplay()` - 5 tests

- [x] Should reset display to '0'
- [x] Should clear currentInput variable
- [x] Should clear operator variable
- [x] Should clear previousInput variable
- [x] Should reset shouldResetDisplay flag
- [x] Should remove error styling

##### `deleteLast()` - 4 tests

- [x] Should remove last character from multi-digit number
- [x] Should reset to '0' when deleting last character
- [x] Should handle deletion of operators
- [x] Should handle deletion from '0' (no change)

---

#### 1.2 Calculation Engine (27 tests)

##### `safeEvaluate(expression)` - 15 tests

- [ ] Should evaluate simple addition (2+2=4)
- [ ] Should evaluate subtraction (10-3=7)
- [ ] Should evaluate multiplication (5\*6=30)
- [ ] Should evaluate division (20/4=5)
- [ ] Should handle decimal numbers (3.14\*2)
- [ ] Should handle negative numbers (-5+3)
- [ ] Should handle parentheses ((2+3)\*4)
- [ ] Should follow order of operations (2+3\*4=14)
- [ ] Should throw error for invalid characters (abc)
- [ ] Should throw error for consecutive operators (5++3)
- [ ] Should throw error for multiple decimals (5.5.5)
- [ ] Should handle complex expressions (10+20/2-5)
- [ ] Should handle floating point precision
- [ ] Should reject SQL injection attempts
- [ ] Should reject JavaScript injection attempts

##### `calculateResult()` - 12 tests

- [ ] Should calculate and display correct result
- [ ] Should replace '×' with '\*' before calculation
- [ ] Should round to 10 decimal places
- [ ] Should handle division by zero (display error)
- [ ] Should handle NaN results (0/0)
- [ ] Should set shouldResetDisplay after calculation
- [ ] Should add error-text class on error
- [ ] Should remove error-text class on success
- [ ] Should display "Invalid operation" for NaN
- [ ] Should display "Cannot divide by zero" for Infinity
- [ ] Should display specific error messages
- [ ] Should handle empty expression

---

#### 1.3 Input Validation (6 tests)

##### Display Input Event Listener - 6 tests

- [ ] Should allow numbers (0-9)
- [ ] Should allow operators (+, -, \*, /)
- [ ] Should allow decimal point (.)
- [ ] Should allow parentheses ()
- [ ] Should allow '×' symbol
- [ ] Should reject letters and special characters

---

#### 1.4 Keyboard Support (15 tests)

##### Keyboard Event Handler - 15 tests

- [ ] Should append number on digit key press (0-9)
- [ ] Should append decimal on '.' key press
- [ ] Should append operators on +, -, /, \* keys
- [ ] Should replace '\*' with '×' visually
- [ ] Should calculate on 'Enter' key
- [ ] Should calculate on '=' key
- [ ] Should prevent default on 'Enter'
- [ ] Should clear on 'Escape' key
- [ ] Should clear on 'c' or 'C' key
- [ ] Should delete on 'Backspace' key
- [ ] Should prevent default on 'Backspace'
- [ ] Should ignore invalid keys
- [ ] Should be case-insensitive for 'c'
- [ ] Should not break with rapid key presses
- [ ] Should handle keyboard shortcuts (Ctrl+C should not affect)

---

#### 1.5 Theme Toggle (10 tests)

##### Theme Functionality - 10 tests

- [ ] Should toggle dark-mode class on body
- [ ] Should change button icon to ☀️ in dark mode
- [ ] Should change button icon to 🌙 in light mode
- [ ] Should save theme preference to localStorage
- [ ] Should load saved theme on page load
- [ ] Should default to light mode if no preference
- [ ] Should apply dark mode immediately on toggle
- [ ] Should persist theme across page reloads
- [ ] Should handle multiple rapid toggles
- [ ] Should update localStorage on each toggle

---

### 2. DOM Integration Tests (36 tests)

#### 2.1 Display Element Tests - 6 tests

- [ ] Should initialize display with '0'
- [ ] Should update display.value when appending
- [ ] Should display error messages correctly
- [ ] Should apply/remove error-text class
- [ ] Should maintain readonly attribute
- [ ] Should truncate very long numbers appropriately

#### 2.2 Button Click Tests - 8 tests

- [ ] Should call appendToDisplay on number button click
- [ ] Should call appendToDisplay on operator button click
- [ ] Should call calculateResult on equals button click
- [ ] Should call clearDisplay on 'C' button click
- [ ] Should call deleteLast on backspace button click
- [ ] Should handle rapid button clicks
- [ ] Should not double-trigger on click
- [ ] Should work with touch events (mobile)

#### 2.3 Theme Button Tests - 4 tests

- [ ] Should exist in DOM
- [ ] Should have correct initial icon
- [ ] Should toggle on click
- [ ] Should have glassmorphism styles applied

---

### 3. Edge Cases & Error Handling (19 tests)

#### 3.1 Mathematical Edge Cases - 8 tests

- [ ] Should handle very large numbers
- [ ] Should handle very small decimals
- [ ] Should handle negative zero (-0)
- [ ] Should handle scientific notation
- [ ] Should prevent stack overflow on complex expressions
- [ ] Should handle undefined results gracefully
- [ ] Should handle maximum safe integer
- [ ] Should round floating point errors (0.1+0.2)

#### 3.2 Security Tests - 5 tests

- [ ] Should reject `eval()` injection attempts
- [ ] Should reject script tags in input
- [ ] Should reject XSS attempts
- [ ] Should validate all expressions before evaluation
- [ ] Should sanitize user input properly

#### 3.3 State Management Tests - 6 tests

- [ ] Should maintain consistent state after error
- [ ] Should reset state correctly after clear
- [ ] Should handle state during rapid operations
- [ ] Should preserve state between calculations
- [ ] Should reset shouldResetDisplay appropriately
- [ ] Should not leak memory with repeated operations

---

### 4. UI/UX Tests (14 tests)

#### 4.1 Visual Feedback Tests - 6 tests

- [ ] Should display error text in smaller font
- [ ] Should show red text for errors (error-text class)
- [ ] Should reset text color after recovery
- [ ] Should maintain display alignment
- [ ] Should handle text overflow
- [ ] Should maintain button styles on interaction

#### 4.2 Dark Mode UI Tests - 8 tests

- [ ] Should change background gradient in dark mode
- [ ] Should change calculator background in dark mode
- [ ] Should change display background in dark mode
- [ ] Should change button colors in dark mode
- [ ] Should maintain contrast ratios in both modes
- [ ] Should apply transitions smoothly
- [ ] Should keep glassmorphism effect working
- [ ] Should persist dark mode through navigation

---

### 5. Integration/E2E Tests (18 tests)

#### 5.1 Complete User Workflows - 10 tests

- [ ] Should complete basic addition: 5 + 3 = 8
- [ ] Should complete basic subtraction: 10 - 4 = 6
- [ ] Should complete basic multiplication: 6 × 7 = 42
- [ ] Should complete basic division: 20 / 4 = 5
- [ ] Should handle complex calculation: (10+5)\*2-3 = 27
- [ ] Should recover from error and continue
- [ ] Should clear and start new calculation
- [ ] Should use keyboard for entire operation
- [ ] Should switch theme mid-calculation
- [ ] Should maintain calculation through theme switch

#### 5.2 Browser Compatibility Tests - 4 tests

- [ ] Should work in Chrome
- [ ] Should work in Firefox
- [ ] Should work in Safari
- [ ] Should work in Edge

#### 5.3 Responsive Tests - 4 tests

- [ ] Should display correctly on desktop (>1024px)
- [ ] Should display correctly on tablet (768-1024px)
- [ ] Should display correctly on mobile (320-767px)
- [ ] Should handle orientation changes

---

## 📂 Test Files Status

### Created

- [x] `jest.config.js`
- [x] `script.test.js`
- [x] `dom.test.js`
- [x] `theme.test.js`
- [x] `keyboard.test.js`
- [x] `e2e.spec.js`

### Coverage Reports

- [ ] Initial coverage baseline established
- [ ] 25% coverage achieved
- [ ] 50% coverage achieved
- [ ] 75% coverage achieved
- [ ] 100% coverage achieved ✨

---

## 🎯 Milestones

### Phase 1: Foundation (Target: Week 1)

- [x] Setup complete
- [x] First test file created
- [x] First test passing
- [ ] Coverage reporting working

### Phase 2: Core Functions (Target: Week 2)

- [ ] All display management tests complete
- [ ] All calculation engine tests complete
- [ ] 50%+ coverage achieved

### Phase 3: Integration (Target: Week 3)

- [ ] All DOM integration tests complete
- [ ] All keyboard tests complete
- [ ] All theme tests complete
- [ ] 75%+ coverage achieved

### Phase 4: Polish (Target: Week 4)

- [ ] All edge case tests complete
- [ ] All security tests complete
- [ ] All UI/UX tests complete
- [ ] 100% coverage achieved

### Phase 5: E2E (Target: Week 5)

- [ ] Playwright configured
- [ ] All E2E workflows tested
- [ ] Cross-browser testing complete
- [ ] CI/CD pipeline configured

---

## 📋 Notes & Reminders

### When Implementing Tests:

1. ✅ Check off completed tests in this file
2. ✅ Update progress percentages
3. ✅ Add notes for any blockers
4. ✅ Document any test modifications
5. ✅ Run coverage after each batch

### Test Implementation Order (Recommended):

1. Start with `appendToDisplay()` - most fundamental
2. Then `clearDisplay()` and `deleteLast()` - simple functions
3. Move to `safeEvaluate()` - core logic
4. Implement `calculateResult()` - brings it together
5. Add keyboard and theme tests - features
6. Finish with DOM integration - full stack
7. Complete with E2E - real-world scenarios

---

## 🐛 Known Issues / Blockers

_Add any issues encountered during implementation here_

---

## 📊 Test Execution Times

- Unit Tests: TBD
- Integration Tests: TBD
- E2E Tests: TBD
- Total: Target <2 seconds

---

## ✅ Definition of Done

A test is considered "done" when:

- ✅ Test is written and passing
- ✅ Code coverage for that function reaches 100%
- ✅ Test is documented with clear description
- ✅ Edge cases are covered
- ✅ Checkbox in this file is marked
- ✅ Git commit made with conventional commit message

---

## 💡 How to Use This File

### To Update Progress Automatically:

Ask Copilot: "Update TODOS.md - I completed tests 1-5 for appendToDisplay"

### To Implement Next Batch:

Ask Copilot: "Implement tests 6-12 from TODOS.md for appendToDisplay, then update progress"

### To Check Current Status:

Just open this file and look at the progress bar and category counts

### To Track Blockers:

Add notes in the "Known Issues / Blockers" section as you encounter them
