# Test Configuration Evolution

## Overview

This document describes the evolution of our Jest test configuration from a duplicated function approach to a proper ES module import system, and compares it with Jasmine/Karma patterns.

---

## Old Configuration: Function Duplication (Anti-pattern)

### The Problem

Initially, our test file **duplicated the entire business logic** to test it:

```javascript
// tests/script.test.js (OLD - BAD)
describe('appendToDisplay() Function', () => {
  let display;
  let shouldResetDisplay;
  let appendToDisplay;

  beforeEach(() => {
    document.body.innerHTML = `
      <input type="text" id="display" value="0" readonly>
    `;
    display = document.getElementById('display');
    shouldResetDisplay = false;

    // 🚨 DUPLICATE: Copy-pasted 50+ lines from script.js
    appendToDisplay = function (value) {
      if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
      }

      if (value === '.') {
        const lastOperatorIndex = Math.max(
          display.value.lastIndexOf('+'),
          display.value.lastIndexOf('-')
          // ... 30 more lines of duplicated logic
        );
      }
      // ... even more duplicated code
    };
  });

  test('Should append number', () => {
    appendToDisplay('5');
    expect(display.value).toBe('5');
  });
});
```

### Why This Was Wrong

❌ **DRY Violation**: Same function exists in `script.js` and test file  
❌ **Maintenance Nightmare**: Bug fixes needed in 2 places  
❌ **Sync Issues**: Easy to forget updating test copy when changing source  
❌ **Not Testing Real Code**: Tests run against a copy, not actual implementation

---

## New Configuration: ES Module Imports (Best Practice)

### The Solution

We converted the project to use **ES modules** with proper exports/imports:

#### 1. Export Functions from Source (`src/script.js`)

```javascript
// src/script.js
export function appendToDisplay(value) {
  const displayElement = display || document.getElementById('display');
  if (!displayElement) return;

  // ... actual business logic
}

export function clearDisplay() {
  /* ... */
}
export function deleteLast() {
  /* ... */
}
export function safeEvaluate(expression) {
  /* ... */
}
export function calculateResult() {
  /* ... */
}
```

#### 2. Import Functions in Tests (`tests/script.test.js`)

```javascript
// tests/script.test.js (NEW - GOOD)
import { appendToDisplay } from '../src/script.js';

describe('appendToDisplay() Function', () => {
  let display;

  beforeEach(() => {
    document.body.innerHTML = `
      <input type="text" id="display" value="0" readonly>
    `;
    display = document.getElementById('display');
  });

  test('Should append number', () => {
    appendToDisplay('5'); // ✅ Testing REAL function
    expect(display.value).toBe('5');
  });
});
```

### Configuration Changes Required

#### `package.json`

```json
{
  "type": "module",
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
  }
}
```

#### `jest.config.js`

```javascript
export default {
  testEnvironment: 'jsdom',
  transform: {},
  testMatch: ['**/tests/**/*.test.js'],
  // ... other config
};
```

### Jest ES Modules Debugging: Required Debug Configuration

To debug ES module tests in Jest, your `.vscode/launch.json` must include the ESM loader flag:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Jest Tests",
  "program": "${workspaceFolder}/node_modules/jest/bin/jest.js",
  "args": ["--runInBand", "tests/script.test.js"],
  "runtimeArgs": ["--experimental-vm-modules"],
  "console": "integratedTerminal",
  "autoAttachChildProcesses": true
}
```
To execute a particular test file with Jest, set the following in your launch configuration:
"args": ["--runInBand", "tests/script.test.js"],
- Restart VS Code after making these changes.

#### `index.html`

```html
<script type="module" src="script.js"></script>
```

### Making ES Module Functions Available to Inline Event Handlers

When using ES modules (`export function ...`) in `script.js` and loading it with `<script type="module" src="script.js"></script>`, exported functions are **not** automatically available on the global `window` object.  
However, inline event handlers in HTML (e.g., `onclick="appendToDisplay(...)"`) expect these functions to be global.

**To fix this, add the following code at the end of `src/script.js`:**

```javascript
// Make functions available for inline event handlers
window.appendToDisplay = appendToDisplay;
window.clearDisplay = clearDisplay;
window.deleteLast = deleteLast;
window.calculateResult = calculateResult;
```

**Reasons:**
- ES module exports are only available to other modules via `import`.
- Inline event handlers (`onclick="..."`) look for functions on the global `window` or `globalThis` object.
- Attaching functions to `window` or `globalThis` ensures your calculator buttons work as expected in the browser.

**Summary:**  
Always attach exported functions to `window` if you use inline event handlers in your HTML and ES modules for your scripts.

### Key Technical Patterns

#### Dynamic Element Resolution

Functions work both in browser and tests:

```javascript
export function appendToDisplay(value) {
  // Cached for browser, fresh lookup for tests
  const displayElement = display || document.getElementById('display');
  if (!displayElement) return;

  displayElement.value += value;
}
```

#### Conditional Initialization

Prevent side effects during test imports:

```javascript
if (typeof process === 'undefined' || process.env.NODE_ENV !== 'test') {
  // Event listeners only run in browser, not during test import
  document.addEventListener('keydown', handleKeypress);
}
```

### Benefits

✅ **Single Source of Truth**: Function exists only in `script.js`  
✅ **Real Testing**: Tests run against actual production code  
✅ **Easy Maintenance**: Change once, tests automatically use new version  
✅ **Modern JavaScript**: Uses standard ES module syntax  
✅ **Better Refactoring**: IDE can track imports/exports

---

## Comparison with Jasmine/Karma

### Jasmine/Karma + TypeScript (Traditional)

```typescript
// calculator.ts
export function appendToDisplay(value: string): void {
  // business logic
}

// calculator.spec.ts
import { appendToDisplay } from './calculator';

describe('appendToDisplay', () => {
  it('should append number', () => {
    appendToDisplay('5');
    expect(display.value).toBe('5');
  });
});
```

**Configuration:**

```javascript
// karma.conf.js
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: ['src/**/*.ts', 'tests/**/*.spec.ts'],
    preprocessors: {
      '**/*.ts': ['karma-typescript'],
    },
    browsers: ['Chrome'],
    singleRun: true,
  });
};
```

### Jest + ES Modules (Our Approach)

```javascript
// script.js
export function appendToDisplay(value) {
  // business logic
}

// script.test.js
import { appendToDisplay } from '../src/script.js';

test('should append number', () => {
  appendToDisplay('5');
  expect(display.value).toBe('5');
});
```

**Configuration:**

```javascript
// jest.config.js
export default {
  testEnvironment: 'jsdom',
  transform: {},
};
```

### Feature Comparison

| Feature              | Jasmine/Karma             | Jest (Our Config)       |
| -------------------- | ------------------------- | ----------------------- |
| **Import/Export**    | Native TS modules         | ES modules              |
| **Setup Complexity** | High (TypeScript + Karma) | Medium (ESM flag)       |
| **Test Runner**      | Karma (real browsers)     | Jest (jsdom)            |
| **Speed**            | Slower (browser launch)   | Faster (Node.js)        |
| **Mocking**          | Requires jasmine-spy      | Built-in (`jest.fn()`)  |
| **Coverage**         | Requires Istanbul         | Built-in (`--coverage`) |
| **Watch Mode**       | Karma watch               | Jest watch (better)     |
| **Parallelization**  | Limited                   | Built-in                |
| **Snapshot Testing** | Not available             | Built-in                |
| **Browser Testing**  | Real browsers             | jsdom simulation        |

### When to Use Each

#### Use Jest (Our Choice) When:

- ✅ Building modern JavaScript apps without TypeScript
- ✅ Need fast unit tests with jsdom
- ✅ Want zero-config experience
- ✅ Prefer integrated tooling (coverage, mocking, snapshots)
- ✅ Working on Node.js or React projects

#### Use Jasmine/Karma When:

- ✅ Must test in real browsers (Safari, IE11)
- ✅ Already have TypeScript infrastructure
- ✅ Need browser-specific API testing
- ✅ Legacy projects already using Jasmine
- ✅ Testing complex browser compatibility issues

---

## Migration Checklist

If converting from duplicated functions to ES modules:

- [ ] Add `"type": "module"` to `package.json`
- [ ] Add `export` keyword to all testable functions
- [ ] Update `jest.config.js` to use ES module syntax
- [ ] Add `--experimental-vm-modules` flag to test scripts
- [ ] Change `<script>` tags to `<script type="module">`
- [ ] Replace function duplicates with `import` statements
- [ ] Update functions to handle dynamic DOM element lookup
- [ ] Guard global event listeners from running in tests
- [ ] Run tests and verify all pass
- [ ] Test in browser to ensure functionality unchanged

---

## 2025 Update: ES Module Jest Configuration for Unit Tests

### Key Changes Made

- **Jest Config File:**  
  Renamed `jest.config.js` to `jest.config.cjs` for compatibility with `"type": "module"` in `package.json`.
  ```js
  // jest.config.cjs
  module.exports = {
    testEnvironment: 'jsdom',
    testMatch: ['**/tests/**/*.test.js'],
    transform: {},
    collectCoverageFrom: [
      'src/**/*.js',
      '!src/index.html',
      '!**/node_modules/**',
    ],
    coverageThreshold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    verbose: true,
  };
  ```

- **Test Scripts in `package.json`:**  
  All Jest scripts now use Node with the `--experimental-vm-modules` flag for ES module support:
  ```json
  "scripts": {
    "test": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js --config jest.config.cjs",
    "test:watch": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js --config jest.config.cjs --watch",
    "test:coverage": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js --config jest.config.cjs --coverage",
    "test:integration": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js --config jest.config.cjs --testMatch='**/tests/**/*.integration.test.js'",
    "test:e2e": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js --config jest.config.cjs --testMatch='**/tests/**/*.e2e.spec.js'"
  }
  ```

- **Test Files:**  
  - Use `import` (not `require`) for ES modules.
  - Use `await import('../src/script.js')` in `beforeEach` for integration tests that need to register event listeners.
  - Remove all `jest.resetModules()` calls from ES module test files.

- **Debugging in VS Code:**  
  - Use a launch configuration with `"runtimeArgs": ["--experimental-vm-modules"]` and point to the correct Jest config file.

### Troubleshooting

- If you see `jest is not defined` errors, remove `jest.resetModules()` from ES module test files.
- If you see "unexpected token 'export'" errors, ensure you use the Node command with `--experimental-vm-modules` and your config file is named `jest.config.cjs`.

### Example Workflow

1. Write your tests using ES module syntax (`import`/`export`).
2. Run tests with:
   ```
   npm test
   ```
3. Debug tests in VS Code using the correct launch configuration.
4. For browser compatibility, ensure `<script type="module" src="script.js"></script>` in your HTML.

---

## Resources

- [Jest ES Modules Guide](https://jestjs.io/docs/ecmascript-modules)
- [MDN: JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Jasmine Documentation](https://jasmine.github.io/)
- [Karma Configuration](https://karma-runner.github.io/latest/config/configuration-file.html)

---

**Last Updated**: December 2, 2025  
**Status**: Production-ready ES module configuration with Jest