/**
 * Keyboard support tests for calculator
 */

describe('Keyboard Event Handler', () => {
  beforeEach(async () => {
    // Set up DOM expected by the script before importing
    document.body.innerHTML = `
      <input type="text" id="display" value="0">
      <button id="themeToggle">🌙</button>
    `;
    await import('../src/script.js');
  });

  test('Should calculate on Enter key', () => {
    const display = document.getElementById('display');
    display.value = '5+3';

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    document.dispatchEvent(event);

    expect(display.value).toBe('8');
  });

  test('Ctrl+C should not clear display', () => {
    const display = document.getElementById('display');
    display.value = '123';

    const event = new KeyboardEvent('keydown', { key: 'c', ctrlKey: true });
    document.dispatchEvent(event);

    expect(display.value).toBe('123');
  });

  test('Should ignore invalid keys', () => {
    const display = document.getElementById('display');
    display.value = '5';

    const event = new KeyboardEvent('keydown', { key: 'a' });
    document.dispatchEvent(event);

    // invalid keys should not change the display value
    expect(display.value).toBe('5');
  });

  test('Backspace should delete last character', () => {
    const display = document.getElementById('display');
    display.value = '123';

    const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    document.dispatchEvent(event);

    expect(display.value).toBe('12');
  });
});
