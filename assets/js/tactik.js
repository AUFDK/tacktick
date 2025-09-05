const applyTheme = (theme) => {
    document.documentElement.style.setProperty('--bg-color', theme.bg_color || '#f4f4f4');
    document.documentElement.style.setProperty('--text-color', theme.text_color || '#000000');
    document.documentElement.style.setProperty('--hint-color', theme.hint_color || '#666');
    document.documentElement.style.setProperty('--button-color', theme.button_color || '#5d7c9d');
    document.documentElement.style.setProperty('--button-text-color', theme.button_text_color || '#ffffff');
    document.documentElement.style.setProperty('--button-hover-color', theme.button_color ? `${theme.button_color}99` : '#0056b3');
    document.documentElement.style.setProperty('--container-bg-color', theme.bg_color ? `${theme.bg_color}99` : '#ffffff');
    document.documentElement.style.setProperty('--info-block-bg-color', theme.bg_color ? `${theme.bg_color}77` : '#eef');
};
const tg = window.Telegram.WebApp;
applyTheme(tg.themeParams);

document.addEventListener("DOMContentLoaded", () => {

    if (!window.Telegram || !Telegram.WebApp) {
        window.location.href = 'loading.html';
        return;
    }

    Telegram.WebApp.expand();
    const user = Telegram.WebApp.initDataUnsafe?.user;

    if (!user) {
        window.location.href = 'loading.html';
        return;
    }
});
const TACTICS = {
    'Тактика от Edisa': {
        '1': ['5 7 26', '22 24 20'],
        '2': ['2 8 10', '21 16 1'],
        '3': ['26 30 35', '5 22 26'],
        '4': ['18 25 10', '35 21 10'],
        '5': ['34 36 0', '32 26 11'],
        '6': ['10 24 20', '6 21 27'],
        '7': ['11 4 33', '11 28 0'],
        '8': ['8 27 36', '8 24 36'],
        '9': ['26 8 10', '26 8 6'],
        '10': ['17 20 7', '25 7 32'],
        '11': ['16 21 18', '21 0 16'],
        '12': ['13 17 36', '20 22 13'],
        '13': ['36 0 9', '0 36 00'],
        '14': ['25 31 29', '6 8 10'],
        '15': ['30 32 26', '3 5 7'],
        '16': ['10 22 20', '31 10 29'],
        '17': ['32 9 23', '32 26 9'],
        '18': ['36 00 13', '00 36 1'],
        '19': ['13 20 11', '0 00 1'],
        '20': ['00 15 14', '0 00 4'],
        '21': ['6 25 27', '6 31 29'],
        '22': ['22 24 9', '22 24 17'],
        '23': ['16 19 25', '4 21 31'],
        '24': ['22 7 14', '22 11 3'],
        '25': ['10 5 3', '10 1 3'],
        '26': ['9 31 29', '9 14 8'],
        '27': ['28 1 2', '28 1 2'],
        '28': ['27 19 25', '27 1 2'],
        '29': ['5 7 9', '20 7 11'],
        '30': ['30 8 6', '30 5 4'],
        '31': ['00 14 5', '0 00 1'],
        '32': ['0 00 2', '0 00 26'],
        '33': ['13 24 15', '1 3 5'],
        '34': ['2 26 23', '22 11 5'],
        '35': ['4 8 29', '4 33 31'],
        '36': ['0 00 13', '0 00 34'],
        '0': ['00 8 10', '6 8 10'],
        '00': ['1 20 36', '0 36 10'],
    },

    'Тактика рандом': {
        '1': ['random'],
        '2': ['random'],
        '3': ['random'],
        '4': ['random'],
        '5': ['random'],
        '6': ['random'],
        '7': ['random'],
        '8': ['random'],
        '9': ['random'],
        '10': ['random'],
        '11': ['random'],
        '12': ['random'],
        '13': ['random'],
        '14': ['random'],
        '15': ['random'],
        '16': ['random'],
        '17': ['random'],
        '18': ['random'],
        '19': ['random'],
        '20': ['random'],
        '21': ['random'],
        '22': ['random'],
        '23': ['random'],
        '24': ['random'],
        '25': ['random'],
        '26': ['random'],
        '27': ['random'],
        '28': ['random'],
        '29': ['random'],
        '30': ['random'],
        '31': ['random'],
        '32': ['random'],
        '33': ['random'],
        '34': ['random'],
        '35': ['random'],
        '36': ['random'],
        '0': ['random'],
        '00': ['random']
    },

    'Тактика от Славы Спец': {
        '1': ['28 21 27', '13 2 00'],
        '2': ['27 23 3', '28 35 14'],
        '3': ['12 27 6', '30 34 15'],
        '4': ['11 24 35', '6 8 7'],
        '5': ['30 18 24', '5 25 3'],
        '6': ['17 18 32', '9 26 16'],
        '7': ['16 12 14', '11 20 10'],
        '8': ['15 29 34', '22 11 33'],
        '9': ['14 26 30', '27 30 6'],
        '10': ['13 15 20', '30 5 25'],
        '11': ['4 35 33', '22 20 7'],
        '12': ['16 19 3', '13 00 27'],
        '13': ['27 10 36', '1 25 31'],
        '14': ['9 16 18', '34 3 12'],
        '15': ['8 22 24', '35 1 00'],
        '16': ['7 18 19', '32 14 9'],
        '17': ['20 6 23', '32 22 5'],
        '18': ['36 00 1', '5 17 19'],
        '19': ['34 22 23', '1 00 21'],
        '20': ['33 7 30', '10 22 24'],
        '21': ['32 12 1', '22 18 20'],
        '22': ['31 17 6', '33 11 23'],
        '23': ['30 9 26', '32 33 35'],
        '24': ['22 29 4', '35 36 13'],
        '25': ['10 36 27', '5 30 32'],
        '26': ['35 9 30', '4 14 35'],
        '27': ['1 10 00', '2 21 7'],
        '28': ['1 22 2', '9 8 35'],
        '29': ['24 22 30', '12 25 14'],
        '30': ['23 5 20', '32 27 3'],
        '31': ['22 29 13', '33 28 36'],
        '32': ['21 17 5', '20 1 00'],
        '33': ['20 7 22', '35 23 9'],
        '34': ['19 35 14', '17 15 22'],
        '35': ['4 26 31', '9 26 12'],
        '36': ['13 25 10', '1 24 18'],
        '0': ['18 23 00', '5 24 13'],
        '00': ['8 27 35', '19 29 32'],
    },

    'Тактика от Драгона': {
        '1': ['30 18 10', '32 36 23'],
        '2': ['6 28 10', '28 33 31'],
        '3': ['7 12 27', '14 17 29'],
        '4': ['35 5 10', '0 00 1'],
        '5': ['30 22 24', '23 1 00'],
        '6': ['10 33 31', '0 1 28'],
        '7': ['12 34 00', '11 20 8'],
        '8': ['20 26 14', '11 7 13'],
        '9': ['26 23 33', '27 30 6'],
        '10': ['13 15 20', '1 3 25'],
        '11': ['22 17 33', '7 0 10'],
        '12': ['16 19 34', '3 00 27'],
        '13': ['27 11 22', '17 26 29'],
        '14': ['32 16 17', '5 7 3'],
        '15': ['17 22 24', '9 1 00'],
        '16': ['21 18 19', '34 14 9'],
        '17': ['2 19 3', '32 6 29'],
        '18': ['36 00 1', '26 25 10'],
        '19': ['11 7 20', '1 00 3'],
        '20': ['26 8 30', '21 22 24'],
        '21': ['7 0 8', '22 3 12'],
        '22': ['24 17 6', '1 0 22'],
        '23': ['30 12 5', '33 26 9'],
        '24': ['22 31 9', '35 4 10'],
        '25': ['10 25 27', '30 27 32'],
        '26': ['9 23 33', '16 12 0'],
        '27': ['30 36 34', '25 10 2'],
        '28': ['29 22 2', '6 8 2'],
        '29': ['2 17 3', '30 31 14'],
        '30': ['5 12 22', '24 1 34'],
        '31': ['6 16 19', '33 28 6'],
        '32': ['14 5 3', '36 1 00'],
        '33': ['28 31 6', '25 3 5'],
        '34': ['36 12 7', '11 00 0'],
        '35': ['4 8 31', '9 26 12'],
        '36': ['0 00 1', '0 00 30'],
        '0': ['2 5 6', '6 8 10'],
        '00': ['5 27 35', '36 17 32'],
    }
}

const selectedTactic = localStorage.getItem('selectedTactic');
document.getElementById('tacticName').innerText = selectedTactic;
const tacticData = TACTICS[selectedTactic];
const buttonsContainer = document.getElementById('buttonsContainer');
const resultDisplay = document.getElementById('resultDisplay');
const gridMain = document.querySelector('.grid-main');

// Создаем кнопки с правильными цветами казино
for (let i = 1; i <= 36; i++) {
    const button = document.createElement('button');
    button.className = 'numberButton0'; // Используем правильный класс
    button.textContent = i;
    button.dataset.key = i;
    
    // НЕ применяем стили через JavaScript - пусть CSS работает!
    
    // Добавляем только эффект выбора
    button.addEventListener('click', function() {
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Вибрация для мобильных
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    });

    gridMain.appendChild(button);
}

// Применяем только анимации к кнопкам 0 и 00 (CSS сам покрасит их)
setTimeout(() => {
    const zeroButtons = document.querySelectorAll('.numberButton0[data-key="0"], .numberButton0[data-key="00"]');
    zeroButtons.forEach(button => {
        // НЕ применяем цвета - пусть CSS работает!
        
        button.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        });
    });
}, 100);

resultDisplay.textContent = "Выберите значение";

// Обработчики для всех кнопок
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('numberButton0') || e.target.classList.contains('numberButton')) {
        const key = e.target.dataset.key;
        showNumbers(key);
    }
});

async function loadNumbers() {
    try {
        const response = await fetch('numbers.txt');
        const text = await response.text();
        const cleanedText = text.replace(/\s/g, '');
        const numbersArray = cleanedText
            .split(',')
            .map(num => parseInt(num, 10))
            .filter(n => !isNaN(n));
        return numbersArray;
    } catch (error) {
        console.error('Ошибка загрузки файла numbers.txt:', error);
        return [];
    }
}

function calculateNextNumbers(chosenNumber, numbersArray) {
    let nextCounts = {};
    chosenNumber = Number(chosenNumber);
    for (let i = 0; i < numbersArray.length - 1; i++) {
        if (numbersArray[i] === chosenNumber) {
            const nextNumber = numbersArray[i + 1];
            nextCounts[nextNumber] = (nextCounts[nextNumber] || 0) + 1;
        }
    }
    let countsArray = Object.entries(nextCounts).map(([num, count]) => ({
        number: parseInt(num, 10),
        count
    }));
    countsArray.sort((a, b) => b.count - a.count);
    let top5 = countsArray.slice(0, 3);
    let totalCount = top5.reduce((sum, item) => sum + item.count, 0);
    if (totalCount === 0) return [];
    let predictions = top5.map(item => ({
        number: item.number,
        percent: Math.round((item.count / totalCount) * 100)
    }));
    let sumPercent = predictions.reduce((sum, item) => sum + item.percent, 0);
    let diff = 100 - sumPercent;
    if (predictions.length > 0) {
        predictions[0].percent += diff;
    }

    return predictions;
}

function displayPredictions(chosenNumber, predictions) {
    const container = document.getElementById('resultDisplay');
    if (predictions.length === 0) {
        container.textContent = `Нет данных для выбранного числа ${chosenNumber}.`;
        return;
    }
    let resultText = `Часто выполняемые числа после ${chosenNumber}:<br>`;
    resultText += predictions
        .map(item => `${item.number}:${item.percent}%`);

    container.innerHTML = resultText;
}

function showNumbers(chosenNumber) {
    if (selectedTactic === 'Тактика от HOMA') {
        loadNumbers().then(numbersArray => {
            let predictions = calculateNextNumbers(chosenNumber, numbersArray);

            let counter = 0;
            const interval = setInterval(() => {
                resultDisplay.textContent = "Расчёт...";
                counter++;

                if (counter >= 10) {
                    clearInterval(interval);
                    displayPredictions(chosenNumber, predictions);
                }
            }, 0);
        }).catch(err => {
            console.error(err);
            resultDisplay.textContent = "Ошибка загрузки данных.";
        });
    
    } else if (selectedTactic === 'Тактика рандом') {
        let counter = 0;
        const interval = setInterval(() => {
            const randomNumbers = [
                Math.floor(Math.random() * 37),
                Math.floor(Math.random() * 37),
                Math.floor(Math.random() * 37)
            ];
            const displayNumbers = randomNumbers.map(num => num === 0 ? '00' : num);
            resultDisplay.textContent = "Ответ: " + displayNumbers.join(" ");
            counter++;

            if (counter >= 10) {
                clearInterval(interval);
                const finalRandomNumbers = [
                    Math.floor(Math.random() * 37),
                    Math.floor(Math.random() * 37),
                    Math.floor(Math.random() * 37)
                ];
                const finalDisplayNumbers = finalRandomNumbers.map(num => num === 0 ? '00' : num);
                resultDisplay.textContent = "Ответ: " + finalDisplayNumbers.join(" ");
            }
        }, 15);
    } else if (tacticData[chosenNumber]) {
        const numbersArray = tacticData[chosenNumber];
        let counter = 0;

        const interval = setInterval(() => {
            const randomNumbers = [
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100)
            ];
            resultDisplay.textContent = "Ответ: " + randomNumbers.join(" ");
            counter++;

            if (counter >= 10) {
                clearInterval(interval);
                const finalIndex = Math.floor(Math.random() * numbersArray.length);
                const finalNumbers = numbersArray[finalIndex];
                resultDisplay.textContent = "Ответ: " + finalNumbers;
            }
        }, 15);
    } else {
        resultDisplay.textContent = '—';
    }
}
