# TODOs: TypeScript Migration

**Status:** 🟡 Pending (Execute after 100% test coverage)  
**Prerequisites:** ✅ All 158 unit tests passing  
**Total Migration Tasks:** 42  
**Progress:** 0/42 (0%)

---

## 📋 Phase 1: Pre-Migration Verification (4 tasks)

**Goal:** Ensure codebase is ready for migration  
**Progress:** 0/4 (0%)

### Prerequisites Checklist

- [ ] 1. Verify all 158 tests passing (`npm test`)
- [ ] 2. Confirm 100% code coverage (`npm run test:coverage`)
- [ ] 3. Complete code review of JavaScript implementation
- [ ] 4. Create Git branch `feat/typescript-migration`

---

## 📦 Phase 2: TypeScript Setup (8 tasks)

**Goal:** Install and configure TypeScript infrastructure  
**Progress:** 0/8 (0%)

### Setup Tasks

#### 2.1 Package Installation

- [ ] 5. Install TypeScript: `npm install --save-dev typescript`
- [ ] 6. Install Jest types: `npm install --save-dev @types/jest`
- [ ] 7. Install Node types: `npm install --save-dev @types/node`
- [ ] 8. Install ts-jest: `npm install --save-dev ts-jest`

#### 2.2 Configuration Files

- [ ] 9. Initialize TypeScript config: `npx tsc --init`
- [ ] 10. Update `tsconfig.json` with project-specific settings
  ```json
  {
    "compilerOptions": {
      "target": "ES2020",
      "module": "ESNext",
      "lib": ["ES2020", "DOM"],
      "outDir": "./dist",
      "rootDir": "./src",
      "strict": false,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "moduleResolution": "node",
      "allowJs": true,
      "checkJs": false
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "tests", "dist"]
  }
  ```

#### 2.3 Jest Configuration Update

- [ ] 11. Update `jest.config.js` for TypeScript support
  ```javascript
  preset: 'ts-jest',
  testMatch: ['**/tests/**/*.test.[jt]s'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  ```
- [ ] 12. Verify tests still run: `npm test` (all 158 should pass)

---

## 🔄 Phase 3: Core File Migration (12 tasks)

**Goal:** Convert JavaScript files to TypeScript  
**Progress:** 0/12 (0%)

### 3.1 Rename Files

- [ ] 13. Rename `src/script.js` → `src/script.ts`
- [ ] 14. Update HTML script reference if needed

### 3.2 Add Basic Type Annotations

#### Display State Variables

- [ ] 15. Add types to state variables:
  ```typescript
  let display: HTMLInputElement = document.getElementById(
    'display'
  ) as HTMLInputElement;
  let currentInput: string = '';
  let operator: string = '';
  let previousInput: string = '';
  let shouldResetDisplay: boolean = false;
  ```

#### Function Signatures

- [ ] 16. Add types to `appendToDisplay(value: string): void`
- [ ] 17. Add types to `clearDisplay(): void`
- [ ] 18. Add types to `deleteLast(): void`
- [ ] 19. Add types to `safeEvaluate(expression: string): number`
- [ ] 20. Add types to `calculateResult(): void`

#### Event Handlers

- [ ] 21. Add types to keyboard event: `(event: KeyboardEvent): void`
- [ ] 22. Add types to theme toggle: `(): void`

#### DOM References

- [ ] 23. Add types to `themeToggle: HTMLButtonElement`
- [ ] 24. Add types to `body: HTMLBodyElement`

---

## ✅ Phase 4: Validation After Basic Migration (3 tasks)

**Goal:** Ensure TypeScript compiles and all tests pass  
**Progress:** 0/3 (0%)

- [ ] 25. Run TypeScript compiler: `npx tsc --noEmit`
- [ ] 26. Run all tests: `npm test` (expect 158 passing)
- [ ] 27. Fix any compilation errors or failing tests

**Checkpoint:** Commit migration if all tests passing  
**Commit message:** `refactor: migrate calculator to TypeScript`

---

## 🔒 Phase 5: Enhanced Type Safety (7 tasks)

**Goal:** Add strict types and custom interfaces  
**Progress:** 0/7 (0%)

### 5.1 Custom Type Definitions

- [ ] 28. Create `src/types.ts` file
- [ ] 29. Define `MathOperator` type: `'+' | '-' | '*' | '/' | '×'`
- [ ] 30. Define `Theme` type: `'light' | 'dark'`
- [ ] 31. Define `CalculationResult` type
- [ ] 32. Define `CalculatorState` interface

### 5.2 Enable Strict Mode

- [ ] 33. Update `tsconfig.json` - set `"strict": true`
- [ ] 34. Fix all strict mode errors (expect type-related issues)

---

## 🎯 Phase 6: Strict Type Compliance (5 tasks)

**Goal:** Resolve all strict mode errors  
**Progress:** 0/5 (0%)

- [ ] 35. Add explicit return types to all functions
- [ ] 36. Add null checks for DOM element access
- [ ] 37. Replace `as` type assertions with proper type guards
- [ ] 38. Add error handling types
- [ ] 39. Run tests and TypeScript compiler - verify zero errors

**Checkpoint:** Commit enhanced types if all passing  
**Commit message:** `refactor: add strict TypeScript types`

---

## 🧪 Phase 7: Test File Migration (Optional) (3 tasks)

**Goal:** Migrate test files to TypeScript  
**Progress:** 0/3 (0%)

- [ ] 40. Rename test files: `*.test.js` → `*.test.ts`
- [ ] 41. Add type annotations to test fixtures and mocks
- [ ] 42. Verify all tests still passing with TypeScript

**Checkpoint:** Commit test migration  
**Commit message:** `test: migrate test files to TypeScript`

---

## 🎉 Phase 8: Final Validation & Completion

**All tasks complete when:**

- ✅ All 42 tasks checked
- ✅ All 158 tests passing
- ✅ TypeScript compiler shows zero errors (`npx tsc --noEmit`)
- ✅ Strict mode enabled with no warnings
- ✅ Calculator functions identically to JavaScript version
- ✅ Coverage report still shows 100%

---

## 📊 Progress Tracking

### Overall Migration Status

```
Phase 1: Pre-Migration Verification    [    ] 0/4   (0%)
Phase 2: TypeScript Setup               [    ] 0/8   (0%)
Phase 3: Core File Migration            [    ] 0/12  (0%)
Phase 4: Validation                     [    ] 0/3   (0%)
Phase 5: Enhanced Type Safety           [    ] 0/7   (0%)
Phase 6: Strict Type Compliance         [    ] 0/5   (0%)
Phase 7: Test Migration (Optional)      [    ] 0/3   (0%)

Total Progress: 0/42 (0%)
```

### Milestone Tracking

- [ ] **Milestone 1:** TypeScript installed and configured
- [ ] **Milestone 2:** JavaScript files migrated to .ts
- [ ] **Milestone 3:** All tests passing with TypeScript
- [ ] **Milestone 4:** Strict mode enabled
- [ ] **Milestone 5:** Custom types and interfaces defined
- [ ] **Milestone 6:** Test files migrated (optional)
- [ ] **Milestone 7:** 100% coverage maintained

---

## 🚀 Getting Started

**When ready to begin (after testing complete):**

1. Open this file in VS Code
2. Start with Phase 1, Task 1
3. Check off each task as completed: `- [ ]` → `- [x]`
4. Run tests after each phase
5. Commit after each phase completion
6. Update progress counters manually or ask Copilot

**Command to start:**

```bash
# Verify tests first
npm test

# Create feature branch
git checkout -b feat/typescript-migration

# Begin Phase 2 installations
npm install --save-dev typescript @types/jest @types/node ts-jest
```

---

## 📝 Notes & Learnings

### Common Issues & Solutions

_(Add notes as you encounter issues during migration)_

- **Issue:** [Describe problem]
  - **Solution:** [How you fixed it]

### TypeScript Patterns Learned

_(Document useful patterns discovered during migration)_

- **Pattern:** [Name]
  - **Usage:** [Where/how you used it]

---

## ⏱️ Time Tracking

**Estimated Time:** 9-13 hours  
**Actual Time:** _[Track as you go]_

- Phase 1: **\_** hours
- Phase 2: **\_** hours
- Phase 3: **\_** hours
- Phase 4: **\_** hours
- Phase 5: **\_** hours
- Phase 6: **\_** hours
- Phase 7: **\_** hours

---

## 🔗 Related Documents

- **Migration Strategy:** `#file:docs/Migration-Plan-TypeScript.md`
- **Test Plan:** `#file:docs/Test-Plan.md`
- **Testing Progress:** `#file:docs/TODOS-Testing.md`
- **Source Code:** `#file:src/script.js` (will become `script.ts`)

---

**Last Updated:** 2025-11-08  
**Next Action:** Complete all 158 unit tests, then return here to begin TypeScript migration! 🎯
