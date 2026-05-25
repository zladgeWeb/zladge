// 1. Инициализация переменных (только один раз!)
let score = Number(localStorage.getItem("score")) || 0;
let clickPower = Number(localStorage.getItem("clickPower")) || 1;
let passiveIncome = Number(localStorage.getItem("passiveIncome")) || 0;
let upgradePrice = Number(localStorage.getItem("upgradePrice")) || 5;

// 2. Функции управления
function updateUI() {
    document.getElementById("my-text").innerText = score;
}

function saveData() {
    localStorage.setItem("score", score);
    localStorage.setItem("clickPower", clickPower);
    localStorage.setItem("passiveIncome", passiveIncome);
    localStorage.setItem("upgradePrice", upgradePrice);
}

function sayHello() {
    score = score + clickPower;
    updateUI();
    saveData();
}

function buyUpgrade() {
    if (score >= upgradePrice) {
        score = score - upgradePrice;
        clickPower = clickPower + 5;
        upgradePrice = upgradePrice * 2;
        updateUI();
        saveData();
    }
}

function buyAuto() {
    if (score >= 20) {
        score = score - 20;
        passiveIncome = passiveIncome + 2;
        updateUI();
        saveData();
    }
}

// 3. Логика бонуса
function spawnbonus() {
    let btn = document.getElementById("bonus-btn");
    
    // Вычисляем размеры
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    
    // Случайная позиция в ПРАВОЙ половине экрана
    // X от 50% до 85% ширины, Y от 10% до 80% высоты
    let randomX = Math.floor(Math.random() * (winWidth * 0.35)) + (winWidth * 0.5);
    let randomY = Math.floor(Math.random() * (winHeight * 0.7)) + (winHeight * 0.1);
    
    btn.style.left = randomX + "px";
    btn.style.top = randomY + "px";
    
    btn.style.visibility = "visible";
    btn.style.opacity = "1";
    
    console.log("Бонус появился в:", randomX, randomY); // Проверка в консоли
    
    setTimeout(() => {
        btn.style.opacity = "0";
        btn.style.visibility = "hidden";
    }, 3000);
}
        

document.getElementById("bonus-btn").addEventListener("click", function() {
    score += 500;
    this.style.opacity = "0";
    this.style.visibility = "hidden";
    updateUI();
    saveData();
});

// 4. Запуск
updateUI();

setInterval(function() {
    score = score + passiveIncome;
    updateUI();
    saveData();
}, 1000);

setInterval(spawnbonus, 15000);
