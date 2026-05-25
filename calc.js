function appendToDisplay(input) {
    const display = document.getElementById('display');
    if (display) {
        // Если на экране горит дефолтный ноль, убираем его перед вводом цифры
        if (display.value === '0' && input !== '.') {
            display.value = '';
        }
        display.value += input;
        display.scrollLeft = display.scrollWidth;
    }
}

function clearDisplay() {
    const display = document.getElementById('display');
    if (display) {
        display.value = '0';
    }
}

function calculate() {
    const display = document.getElementById('display');
    if (display) {
        try {
            let expression = display.value
                .replace(/×/g, '*')
                .replace(/−/g, '-')
                .replace(/sin/g, 'Math.sin')
                .replace(/cos/g, 'Math.cos')
                .replace(/tan/g, 'Math.tan')
                .replace(/log/g, 'Math.log10') // lg в Xiaomi — это десятичный логарифм
                .replace(/exp/g, 'Math.log')   // ln в Xiaomi — это натуральный логарифм
                .replace(/π/g, 'Math.PI')
                .replace(/1\//g, '1/');

            // Автоматически закрываем скобки
            let openBrackets = (expression.match(/\(/g) || []).length;
            let closeBrackets = (expression.match(/\)/g) || []).length;
            while (openBrackets > closeBrackets) {
                expression += ')';
                closeBrackets++;
            }

            let result = eval(expression);

            if (typeof result === 'number' && !Number.isInteger(result)) {
                display.value = parseFloat(result.toFixed(8));
            } else {
                display.value = result;
            }
        } catch (e) {
            display.value = 'Error';
        }
    }
}

function backspace() {
    const display = document.getElementById('display');
    if (display) {
        display.value = display.value.slice(0, -1);
        if (display.value === '') {
            display.value = '0';
        }
    }
}

function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('theme-btn');
    
    if (body && themeBtn) {
        // Переключаем класс светлой темы на всем документе
        body.classList.toggle('light-theme');
        
        // Меняем иконку в зависимости от того, включена ли светлая тема
        if (body.classList.contains('light-theme')) {
            themeBtn.innerText = '☀️'; // Если светло — показываем солнце
        } else {
            themeBtn.innerText = '🌙'; // Если темно — возвращаем луну
        }
    }
}