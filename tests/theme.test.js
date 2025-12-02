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
    await import('../src/script.js');

    expect(document.body.classList.contains('dark-mode')).toBe(true);
    const themeToggle = document.getElementById('themeToggle');
    expect(themeToggle.textContent).toBe('☀️');
  });
});
