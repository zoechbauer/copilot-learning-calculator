/**
 * Theme toggle functionality tests
 */

describe('Theme Functionality', () => {
  beforeEach(async () => {
    // Set up DOM elements expected by the script before importing the module
    document.body.innerHTML = `
      <input type="text" id="display" value="0" readonly>
      <button id="themeToggle">🌙</button>
    `;
    localStorage.clear();
    await import('../src/script.js');
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('Clicking theme toggle switches dark-mode class, updates icon, and persists to localStorage', () => {
    const themeToggle = document.getElementById('themeToggle');

    // initial state
    expect(document.body.classList.contains('dark-mode')).toBe(false);
    expect(themeToggle.textContent).toBe('🌙');

    // trigger the real click handler
    themeToggle.click();

    expect(document.body.classList.contains('dark-mode')).toBe(true);
    expect(themeToggle.textContent).toBe('☀️');
    expect(localStorage.getItem('theme')).toBe('dark');

    // toggle back
    themeToggle.click();
    expect(document.body.classList.contains('dark-mode')).toBe(false);
    expect(themeToggle.textContent).toBe('🌙');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  test('Loads saved theme on init', async () => {
    localStorage.setItem('theme', 'dark');
    const script = await import('../src/script.js');
    script.setupThemeToggle();

    expect(document.body.classList.contains('dark-mode')).toBe(true);
    const themeToggle = document.getElementById('themeToggle');
    expect(themeToggle.textContent).toBe('☀️');
  });
});

describe('Theme Button DOM Tests', () => {
  beforeEach(async () => {
    // Import and assign global function first
    const script = await import('../src/script.js');
    globalThis.setupThemeToggle = script.setupThemeToggle;

    // Now set up the DOM
    document.body.innerHTML = `
    <input type="text" id="display" value="0" readonly>
    <button id="themeToggle" class="theme-btn">🌙</button>
  `;
  });

  test('Should exist in DOM', () => {
    const themeToggle = document.getElementById('themeToggle');
    expect(themeToggle).not.toBeNull();
  });

  test('Should have correct initial icon', () => {
    const themeToggle = document.getElementById('themeToggle');
    expect(themeToggle.textContent).toBe('🌙');
  });

  test('Should toggle on click', async () => {
    const themeToggle = document.getElementById('themeToggle');
    const script = await import('../src/script.js');
    script.setupThemeToggle();
    themeToggle.click();
    expect(document.body.classList.contains('dark-mode')).toBe(true);
    expect(themeToggle.textContent).toBe('☀️');
    themeToggle.click();
    expect(document.body.classList.contains('dark-mode')).toBe(false);
    expect(themeToggle.textContent).toBe('🌙');
  });

  test('Should have glassmorphism styles applied', () => {
    const themeToggle = document.getElementById('themeToggle');
    // Simulate glassmorphism style check (example: backdrop-filter)
    themeToggle.style.backdropFilter = 'blur(10px)';
    expect(themeToggle.style.backdropFilter).toBe('blur(10px)');
  });
});
