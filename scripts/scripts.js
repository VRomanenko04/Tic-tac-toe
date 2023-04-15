// Переменные DOM
const blocks = document.querySelectorAll('.squere');
const newGameBtn = document.querySelector('.new_game_btn');
const blocksArray = Array.from(blocks);

// Выигрышные варианты
let winningVariants = [
    [0, 1 ,2], 
    [0, 3, 6], 
    [0, 4, 8], 
    [2, 5, 8], 
    [2, 4, 6], 
    [1, 4, 7], 
    [3, 4, 5], 
    [6, 7, 8]
];
// Игровой стол в виде массива
let playBoard = [];
const symbols = ['X', '0'];

let click = 0;

// Перебираем блоки
for (let i= 0; i< blocksArray.length; i++) {
    // Ивент при клике
    blocksArray[i].addEventListener("click", () => {
        // Считаем нажатия
        click++
        if (click === 5) {
            // Отображается крестик и записывается в массив
            blocksArray[i].classList.add('cross');
            playBoard[i] = symbols[0];
            findWinner();
        } else if (click < 5) {
            // Отображается крестик и записывается в массив
            blocksArray[i].classList.add('cross');
            playBoard[i] = symbols[0];
            // Генерируется целое случайное число от 0 до 9
            let rand = Math.floor(Math.random() * blocksArray.length);
            // Проверяется не является ли это число равным i и не занято ли место в массиве так же чтобы rand не заменяло X и не накладывалось на 0
            while (rand === i || (playBoard.includes('X') && playBoard[rand] === 'X') || (playBoard.includes('0') && playBoard[rand] === '0')) {
                rand = Math.floor(Math.random() * blocksArray.length);
            }
            // Отображается нолик и записывается в массив если рандомное число входит в массив, иначе выдаём ошибку в консоль
            if (blocksArray[rand]) {
                blocksArray[rand].classList.add('zero');
                playBoard[rand] = symbols[1];
            } else {
                console.error(`Error: blocksArray[${rand}] is undefined`);
            }
            // Проверка на победный вариант
            findWinner();
        }
    });
}

// Находим победителя
function findWinner() {
    let foundWinner = false; // флаг, обозначающий найдена ли уже победная комбинация
    // Перебираем победные варинты или ничью
    for (let i = 0; i < winningVariants.length; i++) {
        let [a, b, c] = winningVariants[i];
        if (playBoard[a] == symbols[0] && playBoard[b] == symbols[0] && playBoard[c] == symbols[0]) {
            console.log('X player win');
            Swal.fire({
                title: 'First player wins!',
                confirmButtonText: 'New Game',
            }).then(() => {
                reloadGame();
            });
            foundWinner = true; // устанавливаем флаг в true, чтобы прервать проверку на ничью
            break; // выходим из цикла, так как уже найдена победная комбинация
        } else if (playBoard[a] == symbols[1] && playBoard[b] == symbols[1] && playBoard[c] == symbols[1]) {
            console.log('0 player win');
            Swal.fire({
                title: 'Second player wins!',
                confirmButtonText: 'New Game',
            }).then(() => {
                reloadGame();
            });
            foundWinner = true; // устанавливаем флаг в true, чтобы прервать проверку на ничью
            break; // выходим из цикла, так как уже найдена победная комбинация
        } else if (click === 5 && !foundWinner) {
            console.log('it`s tie!');
            Swal.fire({
                title: 'It`s tie!',
                confirmButtonText: 'New Game',
            }).then(() => {
                reloadGame();
            });
        }
    }
}

// Функция перезапуска
function reloadGame() {
    for (let j= 0; j< blocksArray.length; j++) {
        blocksArray[j].classList.remove('zero');
        blocksArray[j].classList.remove('cross');
        playBoard.length = 0;
        click = 0;
    }
}

// Кнопка перезапуска игры
newGameBtn.addEventListener('click', () => {
    reloadGame();
});

// Модальное окно при перезагрузке, инструкция
document.addEventListener("DOMContentLoaded", function(){
    Swal.fire({
        title: 'You play first!',
        showDenyButton: true,
        confirmButtonText: 'Go to play :)',
        denyButtonText: `I need more instructions`,
    }).then((result) => {
        if (result.isDenied) {
            Swal.fire('By clicking on any square, you start with your game move, the AI goes further, and so on until the end of the game, after which you will be asked to start over.', '', 'info');
        }
    });
});