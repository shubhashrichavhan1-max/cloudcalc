/**
 * CloudCalc — Web Calculator
 * Mini Project: Web Application on Public Cloud
 * ------------------------------------------------
 * Full-featured calculator with:
 *  - Basic arithmetic (+, −, ×, ÷)
 *  - Percentage, negation
 *  - Chained operations
 *  - Keyboard support
 *  - Ripple animation
 *  - History display
 */

// ── State ────────────────────────────────────────────
const state = {
  current:    '0',      // Currently displayed value
  previous:   null,     // Value before operator
  operator:   null,     // Pending operator
  justEquals: false,    // Did user just press '='?
  expression: '',       // Expression string shown above display
  history:    '',       // Small history label
};

// ── DOM ──────────────────────────────────────────────
const display       = document.getElementById('display');
const expressionEl  = document.getElementById('expression');
const historyLabel  = document.getElementById('history-label');
const calculator    = document.getElementById('calculator');

// ── Helpers ──────────────────────────────────────────
function formatNumber(n) {
  const num = parseFloat(n);
  if (isNaN(num)) return n;
  // Avoid crazy float precision
  const str = parseFloat(num.toPrecision(12)).toString();
  return str;
}

function updateDisplay(val) {
  const s = String(val);
  display.classList.remove('shrink', 'shrink2');
  if (s.length > 12) display.classList.add('shrink2');
  else if (s.length > 8) display.classList.add('shrink');
  display.textContent = s;
}

function setActiveOp(op) {
  document.querySelectorAll('.btn-op').forEach(b => b.classList.remove('active'));
  if (op) {
    const map = { '+': 'add', '-': 'subtract', '*': 'multiply', '/': 'divide' };
    const btn = document.querySelector(`[data-action="${map[op]}"]`);
    if (btn) btn.classList.add('active');
  }
}

function opSymbol(op) {
  const s = { '+': '+', '-': '−', '*': '×', '/': '÷' };
  return s[op] || op;
}

// ── Core Logic ────────────────────────────────────────
function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? 'Error' : a / b;
    default:  return b;
  }
}

function handleAction(action, value) {
  switch (action) {

    case 'num': {
      if (state.justEquals) {
        state.current = value;
        state.justEquals = false;
        state.expression = '';
      } else if (state.current === '0' || state.current === 'Error') {
        state.current = value;
      } else {
        if (state.current.replace('.', '').replace('-', '').length >= 12) break;
        state.current += value;
      }
      updateDisplay(state.current);
      break;
    }

    case 'decimal': {
      if (state.justEquals) {
        state.current = '0.';
        state.justEquals = false;
        state.expression = '';
      } else if (!state.current.includes('.')) {
        state.current += '.';
      }
      updateDisplay(state.current);
      break;
    }

    case 'clear': {
      state.current    = '0';
      state.previous   = null;
      state.operator   = null;
      state.justEquals = false;
      state.expression = '';
      state.history    = '';
      expressionEl.textContent = '';
      historyLabel.textContent = '';
      setActiveOp(null);
      updateDisplay('0');
      break;
    }

    case 'negate': {
      if (state.current !== '0' && state.current !== 'Error') {
        state.current = formatNumber(parseFloat(state.current) * -1);
        updateDisplay(state.current);
      }
      break;
    }

    case 'percent': {
      if (state.current !== 'Error') {
        const pct = parseFloat(state.current) / 100;
        state.current = formatNumber(pct);
        updateDisplay(state.current);
      }
      break;
    }

    case 'add':      handleOperator('+'); break;
    case 'subtract': handleOperator('-'); break;
    case 'multiply': handleOperator('*'); break;
    case 'divide':   handleOperator('/'); break;

    case 'equals': {
      if (state.operator && state.previous !== null) {
        const expr = `${state.previous} ${opSymbol(state.operator)} ${state.current}`;
        const result = calculate(state.previous, state.current, state.operator);
        const formatted = formatNumber(result);

        expressionEl.textContent = expr + ' =';
        state.history    = `${expr} = ${formatted}`;
        historyLabel.textContent = '';

        state.current    = formatted;
        state.previous   = null;
        state.operator   = null;
        state.justEquals = true;

        setActiveOp(null);
        updateDisplay(formatted);
      }
      break;
    }
  }
}

function handleOperator(op) {
  if (state.current === 'Error') return;

  if (state.operator && !state.justEquals && state.previous !== null) {
    // Chain: evaluate first
    const result = calculate(state.previous, state.current, state.operator);
    state.previous = formatNumber(result);
    updateDisplay(state.previous);
  } else {
    state.previous = state.current;
  }

  state.operator   = op;
  state.justEquals = false;
  state.expression = `${state.previous} ${opSymbol(op)}`;
  expressionEl.textContent = state.expression;
  setActiveOp(op);

  // Next typed number replaces display
  state.current = '0';
}

// ── Event Listeners ───────────────────────────────────
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const action = btn.dataset.action;
    const value  = btn.dataset.value || '';
    handleAction(action, value);
    addRipple(btn, e);
  });
});

// Ripple Effect
function addRipple(btn, e) {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  const rect = btn.getBoundingClientRect();
  ripple.style.left = (e.clientX - rect.left) + 'px';
  ripple.style.top  = (e.clientY - rect.top)  + 'px';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 500);
}

// ── Keyboard Support ──────────────────────────────────
const keyMap = {
  '0': ['num', '0'],   '1': ['num', '1'],   '2': ['num', '2'],
  '3': ['num', '3'],   '4': ['num', '4'],   '5': ['num', '5'],
  '6': ['num', '6'],   '7': ['num', '7'],   '8': ['num', '8'],
  '9': ['num', '9'],   '.': ['decimal', ''],',': ['decimal', ''],
  '+': ['add', ''],    '-': ['subtract', ''],'*': ['multiply', ''],
  '/': ['divide', ''], 'Enter': ['equals', ''], '=': ['equals', ''],
  'Escape': ['clear', ''], 'Backspace': ['backspace', ''],
  '%': ['percent', ''],
};

document.addEventListener('keydown', e => {
  const mapped = keyMap[e.key];
  if (!mapped) return;
  e.preventDefault();

  if (mapped[0] === 'backspace') {
    if (!state.justEquals && state.current !== '0' && state.current !== 'Error') {
      state.current = state.current.length === 1 || (state.current.length === 2 && state.current[0] === '-')
        ? '0'
        : state.current.slice(0, -1);
      updateDisplay(state.current);
    }
    return;
  }

  handleAction(mapped[0], mapped[1]);

  // Visual key press feedback
  const actionToData = {
    'num': `[data-value="${mapped[1]}"]`,
    'decimal': `[data-action="decimal"]`,
    'add': `[data-action="add"]`,
    'subtract': `[data-action="subtract"]`,
    'multiply': `[data-action="multiply"]`,
    'divide': `[data-action="divide"]`,
    'equals': `[data-action="equals"]`,
    'clear': `[data-action="clear"]`,
    'percent': `[data-action="percent"]`,
  };
  const sel = actionToData[mapped[0]];
  if (sel) {
    const btn = document.querySelector(sel);
    if (btn) {
      btn.style.transform = 'scale(0.93)';
      setTimeout(() => btn.style.transform = '', 100);
    }
  }
});

// ── Init ──────────────────────────────────────────────
updateDisplay('0');
console.log('%c☁ CloudCalc loaded', 'color:#5b8dee;font-size:14px;font-weight:bold;');
console.log('Keyboard shortcuts: numbers, +, -, *, /, Enter, Escape, Backspace');
