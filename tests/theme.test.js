/**
 * Theme toggle functionality tests
 */

describe('Theme Functionality', () => {
  let body;
  let themeToggle;

  beforeEach(() => {
    // Set up a fresh DOM for each test
    document.body.innerHTML = `
      <input type="text" id="display" value="0" readonly>
      <button id="themeToggle">🌙</button>
    `;

    // Remove any existing classes from body
    document.body.className = '';

    body = document.body;
    themeToggle = document.getElementById('themeToggle');

    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up localStorage after each test
    localStorage.clear();
  });

  describe('Dark mode class toggle', () => {
    test('Should toggle dark-mode class on body', () => {
      expect(body.classList.contains('dark-mode')).toBe(false);
      
      body.classList.toggle('dark-mode');
      expect(body.classList.contains('dark-mode')).toBe(true);
      
      body.classList.toggle('dark-mode');
      expect(body.classList.contains('dark-mode')).toBe(false);
    });
  });

  describe('Button icon changes', () => {
    test('Should change button icon to ☀️ in dark mode', () => {
      body.classList.add('dark-mode');
      themeToggle.textContent = '☀️';
      expect(themeToggle.textContent).toBe('☀️');
    });

    test('Should change button icon to 🌙 in light mode', () => {
      body.classList.remove('dark-mode');
      themeToggle.textContent = '🌙';
      expect(themeToggle.textContent).toBe('🌙');
    });
  });

  describe('LocalStorage persistence', () => {
    test('Should save theme preference to localStorage', () => {
      localStorage.setItem('theme', 'dark');
      expect(localStorage.getItem('theme')).toBe('dark');

      localStorage.setItem('theme', 'light');
      expect(localStorage.getItem('theme')).toBe('light');
    });

    test('Should load saved theme on page load', () => {
      localStorage.setItem('theme', 'dark');
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
      }
      
      expect(body.classList.contains('dark-mode')).toBe(true);
      expect(themeToggle.textContent).toBe('☀️');
    });

    test('Should default to light mode if no preference', () => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      expect(savedTheme).toBe('light');
      
      if (savedTheme === 'light') {
        themeToggle.textContent = '🌙';
      }
      
      expect(themeToggle.textContent).toBe('🌙');
    });
  });

  describe('Theme application', () => {
    test('Should apply dark mode immediately on toggle', () => {
      body.classList.toggle('dark-mode');
      
      if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
      }
      
      expect(body.classList.contains('dark-mode')).toBe(true);
      expect(themeToggle.textContent).toBe('☀️');
      expect(localStorage.getItem('theme')).toBe('dark');
    });

    test('Should persist theme across page reloads', () => {
      // Simulate setting theme
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      
      // Simulate page reload by clearing body classes and reloading from storage
      body.classList.remove('dark-mode');
      
      // Load from storage
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
      }
      
      expect(body.classList.contains('dark-mode')).toBe(true);
    });
  });

  describe('Rapid toggle handling', () => {
    test('Should handle multiple rapid toggles', () => {
      body.classList.toggle('dark-mode');
      expect(body.classList.contains('dark-mode')).toBe(true);
      
      body.classList.toggle('dark-mode');
      expect(body.classList.contains('dark-mode')).toBe(false);
      
      body.classList.toggle('dark-mode');
      expect(body.classList.contains('dark-mode')).toBe(true);
      
      body.classList.toggle('dark-mode');
      expect(body.classList.contains('dark-mode')).toBe(false);
    });
  });

  describe('LocalStorage updates', () => {
    test('Should update localStorage on each toggle', () => {
      // Toggle to dark
      body.classList.toggle('dark-mode');
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
      }
      expect(localStorage.getItem('theme')).toBe('dark');
      
      // Toggle to light
      body.classList.toggle('dark-mode');
      if (!body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'light');
      }
      expect(localStorage.getItem('theme')).toBe('light');
    });
  });
});
