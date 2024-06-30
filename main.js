const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const restartButton = document.getElementById('restartButton');
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.textContent = ''; // Clear text content for a fresh start
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });

    // Remove any existing winning message
    const existingMessage = document.querySelector('.winning-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        displayWinMessage(currentClass === X_CLASS ? "Player X won!" : "Player O won!", currentClass);
    } else if (isDraw()) {
        displayWinMessage('Draw!', 'draw');
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = circleTurn ? 'O' : 'X'; // Display the mark
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function displayWinMessage(message, winnerClass) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('winning-message');
    if (winnerClass === 'x') {
        messageElement.classList.add('x');
    } else if (winnerClass === 'o') {
        messageElement.classList.add('o');
    }
    messageElement.textContent = message;
    document.body.appendChild(messageElement);
}
