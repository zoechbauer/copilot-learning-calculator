# Calculator Project - GitHub Copilot Learning Lab 🚀

![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Enabled-blue?logo=github)
![Test Coverage](https://img.shields.io/badge/Test%20Coverage-0%25-red)
![TypeScript Migration](https://img.shields.io/badge/TypeScript-Planned-yellow)

## 🎯 Project Purpose

**This is NOT just another calculator app.** This is a **GitHub Copilot mastery project** where the calculator serves as a practical vehicle to explore and master every feature of GitHub Copilot - from AI-assisted coding to autonomous coding agents.

### What Makes This Different?

- ✅ **AI-Generated Code**: Core calculator built entirely with GitHub Copilot
- 🧪 **Test-Driven Learning**: Comprehensive test plan (158+ tests) for practicing test-driven development with AI
- 🔄 **Real-World Refactoring**: TypeScript migration plan demonstrates safe refactoring with AI assistance
- 🤖 **Coding Agent Exploration**: Designed to practice GitHub Copilot Coding Agent workflows
- 📚 **Documentation-First**: Every decision, pattern, and learning documented

## 🌟 Learning Objectives

### GitHub Copilot Features Explored

1. **Copilot Chat** - Interactive AI pair programming
2. **Copilot Edits** - Multi-file AI-assisted refactoring
3. **Copilot Coding Agent** - Autonomous AI developer workflow
4. **Code Reviews** - AI-powered code analysis and suggestions
5. **Test Generation** - AI-assisted test writing with Jest
6. **Documentation** - AI-generated technical documentation

### Technical Learning Path

```
Phase 1: AI-Assisted Development
└── Build calculator with Copilot Chat
└── Learn prompt engineering
└── Understand inline suggestions

Phase 2: Test-Driven Development (CURRENT)
└── Implement 158+ comprehensive tests
└── Achieve 100% code coverage
└── Practice test writing with AI

Phase 3: TypeScript Migration
└── Refactor JavaScript → TypeScript
└── Add strict type safety
└── Learn migration patterns

Phase 4: Coding Agent Mastery
└── Create GitHub issues
└── Assign tasks to @copilot
└── Review autonomous PRs
```

## 📁 Project Structure

```
calculator/
├── .github/
│   ├── copilot-instructions.md      # AI coding guidelines
│   ├── chatmodes/
│   │   └── Code Reviewer.md         # Custom code review agent
│   └── prompts/
│       └── plan-calculatorTestPlan.prompt.md
├── docs/
│   ├── Test-Plan.md                 # 158-test comprehensive plan
│   ├── TODOS-Testing.md             # Test implementation checklist
│   ├── Migration-Plan-TypeScript.md # TypeScript migration strategy
│   ├── TODOS-TypeScript-Migration.md
│   ├── How-to-avoid-Copilot-Premium-Requests.md
│   └── Copilot Coding Agent.md      # Autonomous agent guide
├── src/
│   ├── index.html                   # Calculator UI
│   ├── script.js                    # Core logic (to migrate to TS)
│   └── styles.css                   # Theme system
├── tests/
│   ├── script.test.js               # Unit tests (0/85)
│   ├── dom.test.js                  # DOM integration (0/36)
│   ├── theme.test.js                # Theme toggle tests (0/10)
│   ├── keyboard.test.js             # Keyboard support (0/15)
│   └── e2e.spec.js                  # End-to-end tests (0/18)
├── tools/
│   ├── backup_non_committed_files.ps1   # PowerShell backup script
│   ├── backup_non_committed_files.txt   # Script usage instructions
│   └── README.md                        # Tools folder documentation
├── jest.config.js                   # Jest test configuration
├── package.json                     # Dependencies & scripts
├── LICENSE                          # MIT License
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **VS Code** with GitHub Copilot extension
- **GitHub Copilot subscription** (Pro, Pro+, Business, or Enterprise)

### Installation

```bash
# Clone the repository
git clone https://github.com/zoechbauer/calculator.git
cd calculator

# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Running the Calculator

Open `src/index.html` in your browser, or use VS Code Live Server:

```bash
# If you have Live Server extension installed
# Right-click index.html → "Open with Live Server"
```

## 📊 Current Progress

### Test Implementation Status

| Category           | Tests | Progress      | Status       |
| ------------------ | ----- | ------------- | ------------ |
| Unit Tests         | 85    | 85/85         | 🟢 Completed |
| DOM Integration    | 36    | 36/36         | 🟢 Completed |
| Edge Cases         | 19    | 0/19          | 🔴 TODO      |
| E2E Tests          | 18    | 0/18          | 🔴 TODO      |
| **Total**          | **158** | **121/158** | **🟡 77%**   |


### Migration Roadmap

- [x] **Phase 0**: Initial calculator implementation (AI-generated)
- [x] **Phase 1**: Unit test suite (100% coverage)
- [x] **Phase 2**: DOM integration tests (100% coverage)
- [ ] **Phase 3**: Edge case and error handling tests (planned)
- [ ] **Phase 4**: E2E workflow and browser compatibility tests (planned)
- [ ] **Phase 5**: TypeScript migration (after all tests)
- [ ] **Phase 6**: Coding agent experiments
- [ ] **Phase 7**: Advanced features with AI

## 🧪 Testing Strategy

### Test Coverage Goals

- **Target**: 100% code coverage (158 tests)
- **Framework**: Jest + jsdom
- **E2E**: Playwright (planned)

### Test Categories

1. **Display Management** (21 tests) - `appendToDisplay()`, `clearDisplay()`, `deleteLast()`
2. **Calculation Engine** (27 tests) - `safeEvaluate()`, `calculateResult()`
3. **Input Validation** (6 tests) - Regex validation, input sanitization
4. **Keyboard Support** (15 tests) - Key events, shortcuts
5. **Theme Toggle** (10 tests) - Dark/light mode, localStorage
6. **DOM Integration** (36 tests) - Button clicks, display updates
7. **Edge Cases** (19 tests) - Math edge cases, security, state management
8. **E2E Workflows** (18 tests) - Complete user scenarios

## 🔄 TypeScript Migration Plan

### Why Migrate After Testing?

1. **Safety Net**: Tests ensure no regression during migration
2. **Learning Opportunity**: Experience real-world refactoring patterns
3. **Quality Assurance**: Validate TypeScript types against proven behavior

### Migration Phases

```
Phase 1: Setup TypeScript → Install dependencies, configure tsconfig
Phase 2: Basic Migration → Rename .js → .ts, add basic types
Phase 3: Enhanced Types → Custom types, interfaces, strict mode
Phase 4: Test Migration → Migrate test files to TypeScript (optional)
```

**Detailed plan**: See [`docs/Migration-Plan-TypeScript.md`](docs/Migration-Plan-TypeScript.md)

## 🤖 GitHub Copilot Coding Agent

This project is designed to practice the **Copilot Coding Agent** workflow:

### Typical Workflow

1. **Create GitHub Issue**: "Add keyboard shortcut for percentage calculation"
2. **Assign to @copilot**: Let the AI work autonomously
3. **Review Pull Request**: AI creates PR with implementation
4. **Provide Feedback**: Comment on PR to request changes
5. **Approve & Merge**: Finalize when satisfied

**Learn more**: [`docs/Copilot Coding Agent.md`](docs/Copilot%20Coding%20Agent.md)

## 📚 Key Learnings & Patterns

### AI Coding Instructions

The project uses [`copilot-instructions.md`](.github/copilot-instructions.md) to guide AI behavior:

- **Architecture**: 3-file vanilla structure (no frameworks)
- **Event Handling**: Mixed inline HTML + addEventListener pattern
- **State Management**: Display element as source of truth
- **Theme System**: CSS class toggle with localStorage persistence

### Custom Chat Modes

- **Code Reviewer Mode**: [`Code Reviewer.md`](.github/chatmodes/Code%20Reviewer.md)
  - Provides structured code reviews
  - Categorizes issues (Critical, Improvements, Suggestions)
  - Educational feedback with examples

## 🛠️ Technologies

- **Core**: Vanilla HTML, CSS, JavaScript (ES6+)
- **Testing**: Jest, jsdom, @testing-library
- **Future**: TypeScript (post-testing phase)
- **AI Tools**: GitHub Copilot (Chat, Edits, Coding Agent)

## 📖 Documentation

All documentation lives in [`docs/`](docs/):

- **[Test-Plan.md](docs/Test-Plan.md)** - Comprehensive 158-test strategy
- **[TODOS-Testing.md](docs/TODOS-Testing.md)** - Test implementation checklist
- **[Migration-Plan-TypeScript.md](docs/Migration-Plan-TypeScript.md)** - TypeScript migration guide
- **[TODOS-TypeScript-Migration.md](docs/TODOS-TypeScript-Migration.md)** - Migration task checklist
- **[Copilot Coding Agent.md](docs/Copilot%20Coding%20Agent.md)** - Autonomous AI developer guide

## 🎓 What You'll Learn

### From This Project

1. **Prompt Engineering**: Craft effective prompts for AI assistance
2. **Test-Driven Development**: Write tests first, then implement
3. **Safe Refactoring**: Use tests to enable confident code changes
4. **AI Workflows**: Master GitHub Copilot's full feature set
5. **Code Quality**: Reviews, coverage, and best practices
6. **Documentation**: Clear, maintainable project documentation

### Applicable Skills

- Using AI as a pair programmer
- Writing comprehensive test suites
- Migrating JavaScript to TypeScript
- Working with autonomous coding agents
- Reviewing AI-generated code critically
- Maintaining high-quality codebases with AI

## 🤝 Contributing

This is a personal learning project, but feedback and suggestions are welcome!

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/suggestion`)
3. **Commit** your changes (`git commit -m 'Add suggestion'`)
4. **Push** to the branch (`git push origin feature/suggestion`)
5. **Open** a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **GitHub Copilot** - For making AI pair programming accessible
- **Jest** - For excellent testing framework
- **VS Code** - For the best developer experience

## 📧 Contact

**Learning Journey**: Follow my GitHub Copilot exploration at [@zoechbauer](https://github.com/zoechbauer)

---

**Remember**: The calculator is just the vehicle. The real project is mastering GitHub Copilot! 🚀

---

_Last Updated: November 9, 2025_