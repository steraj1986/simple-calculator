let display = document.getElementById('display');

function appendNumber(num) {
    // Prevent multiple decimals
    if (num === '.' && display.value.includes('.')) {
        return;
    }
    display.value += num;
}

function appendOperator(operator) {
    const lastChar = display.value[display.value.length - 1];
    
    // Prevent multiple operators in a row
    if (['+', '-', '*', '/'].includes(lastChar)) {
        return;
    }
    
    // Prevent operator at the beginning
    if (display.value === '') {
        return;
    }
    
    display.value += operator;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Evaluate the expression
        const result = eval(display.value);
        
        // Check if result is a valid number
        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Error';
            return;
        }
        
        // Round to avoid floating point errors
        display.value = Math.round(result * 100000000) / 100000000;
    } catch (error) {
        display.value = 'Error';
    }
}

// Allow keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Numbers
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    }
    // Operators
    else if (key === '+' || key === '-' || key === '*') {
        appendOperator(key);
    }
    else if (key === '/') {
        event.preventDefault(); // Prevent browser search
        appendOperator(key);
    }
    // Decimal
    else if (key === '.') {
        appendNumber(key);
    }
    // Enter or equals
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    // Backspace
    else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
    // Clear (C key)
    else if (key.toUpperCase() === 'C') {
        clearDisplay();
    }
});
