document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    let currentInput = '';
    let currentOperation = null;
    let previousInput = '';

    // Add click event listeners to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;

            if (!isNaN(value) || value === '.') {
                handleNumber(value);
            } else {
                handleOperator(value);
            }
            updateDisplay();
        });
    });

    function handleNumber(value) {
        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value;
    }

    function handleOperator(operator) {
        switch(operator) {
            case 'clear':
                clear();
                break;
            case 'backspace':
                currentInput = currentInput.slice(0, -1);
                break;
            case '=':
                calculate();
                break;
            default:
                if (currentInput !== '') {
                    if (previousInput !== '') {
                        calculate();
                        previousInput = currentInput;
                    } else {
                        previousInput = currentInput;
                    }
                    currentInput = '';
                    currentOperation = operator;
                    updateDisplay();
                } else if (previousInput !== '') {
                    currentOperation = operator;
                }
        }
    }

    function calculate() {
        if (previousInput === '' || currentInput === '') return;
        
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch(currentOperation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        previousInput = '';
        currentOperation = null;
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        currentOperation = null;
    }

    function updateDisplay() {
        result.value = currentInput || previousInput || '0';
    }
});
