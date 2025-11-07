# Calculator AI Coding Instructions

## Project Overview

Vanilla HTML/CSS/JavaScript calculator with dark mode support. No frameworks or build tools - direct browser execution.

## Architecture Pattern

- **3-file structure**: `index.html` (structure), `styles.css` (theming), `script.js` (logic)
- **Inline event handling**: HTML buttons use `onclick="functionName()"` directly
- **Global state management**: All variables in global scope, display element as source of truth
- **Theme system**: CSS class toggle on `<body>` with `dark-mode` modifier

## Key Implementation Patterns

### Mathematical Operations

- **Display vs calculation separation**: Shows `×` symbol but calculates with `*`
- **Eval-based computation**: Uses `eval()` with regex validation (`/^[0-9+\-*/.() ]+$/`)
- **State-based display reset**: `shouldResetDisplay` flag clears on next input after calculation

### Event Handling Approach

```javascript
// Mixed pattern: inline HTML + addEventListener
onclick = "appendToDisplay('7')"; // In HTML
document.addEventListener('keydown', handler); // In JS
```

### Theme Toggle Implementation

- **localStorage persistence**: `localStorage.setItem('theme', 'dark'|'light')`
- **Icon synchronization**: Button shows 🌙/☀️ based on current theme
- **CSS cascade**: `.dark-mode .btn` overrides base button styles

### CSS Grid Calculator Layout

```css
.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}
```

## Development Workflows

### Adding New Features

1. **HTML**: Add button with `onclick="newFunction()"`
2. **CSS**: Add both base styles and `.dark-mode` variants
3. **JavaScript**: Implement function and add keyboard mapping if needed

### Modifying Themes

- **Both modes required**: Always update base styles AND `.dark-mode` overrides
- **Color consistency**: Use semantic classes (`.number`, `.operator`, `.equals`, `.clear`)

### Input Validation Pattern

```javascript
// Always validate before eval()
if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
  throw new Error('Invalid expression');
}
```

## Critical Conventions

### Button Classification System

- `.number` - digit buttons (0-9, .)
- `.operator` - arithmetic operators (+, -, /, ×)
- `.equals` - calculation trigger (=)
- `.clear` - reset functionality (C, ⌫)

### State Management Rules

- **Display element is truth**: `document.getElementById('display').value` holds current expression
- **Reset flag pattern**: Use `shouldResetDisplay` to clear on next input after calculation
- **Direct DOM updates**: No virtual DOM - modify `.value` and classes directly

### Error Handling Approach

- **Graceful degradation**: Show "Error" for invalid operations
- **Input sanitization**: Strip invalid characters in real-time
- **Floating point precision**: Round to 10 decimal places to avoid JS precision issues

## Integration Points

- **No external dependencies**: Completely self-contained
- **Browser APIs**: localStorage for theme persistence, standard DOM events
- **Live Server compatible**: Works with VS Code Live Server extension for development

## Testing Strategy

Direct browser testing - open `index.html` in browser. No build process or testing framework.

---

_This calculator uses traditional web patterns ideal for learning and rapid prototyping. Maintain simplicity and avoid introducing frameworks or complex tooling._
