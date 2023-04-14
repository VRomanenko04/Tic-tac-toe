// Переменные DOM
const blocks = document.querySelectorAll('.squere');
const newGameBtn = document.querySelector('.new_game_btn');
const blocksArray = Array.from(blocks);
let winningVariants = [[0, 1 ,2], [0, 3, 6], [0, 4, 8], [2, 5, 8], [2, 4, 6], [1, 4, 7], [3, 4, 5], [6, 7, 8]];
let playBoard = [];
const symbols = ['X', '0'];

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

// Визуальщина
let click = 0;
// Перебираем блоки
for (let i= 0; i< blocksArray.length; i++) {
    //Добавляем ивент zero или cross в зависимости от очерёдности клика
    blocksArray[i].addEventListener("click", () => {
        click++
        console.log(click);
        if (click % 2 === 0) {
            blocksArray[i].classList.add('zero');
            playBoard[i] = symbols[1];
        } else {
            blocksArray[i].classList.add('cross');
            playBoard[i] = symbols[0];
        }
        // console.log(playBoard);
        findWinner();
        });
}

// Находим победителя
function findWinner() {
    for (let i = 0; i < winningVariants.length; i++) {
        let [a, b, c] = winningVariants[i];
        if (playBoard[a] == symbols[0] && playBoard[b] == symbols[0] && playBoard[c] == symbols[0]) {
            console.log('X player win');
            return;
        }
        if (playBoard[a] == symbols[1] && playBoard[b] == symbols[1] && playBoard[c] == symbols[1]) {
            console.log('0 player win');
            return;
        }
    }
}

// Кнопка перезапуска игры
newGameBtn.addEventListener('click', () => {
    for (let j= 0; j< blocksArray.length; j++) {
        blocksArray[j].classList.remove('zero');
        blocksArray[j].classList.remove('cross');
        playBoard.length = 0;
    }
});