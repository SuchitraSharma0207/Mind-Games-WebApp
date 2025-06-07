const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');
const modal = document.getElementById('result-modal');
const resultMessage = document.getElementById('result-message');
const playAgainBtn = document.getElementById('play-again-btn');
const closeBtn = document.querySelector('.close');
let board = Array(9).fill(null);
let isPlayerTurn = true; // Player starts with X
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Handle player click
cells.forEach(cell => {
    cell.addEventListener('click', playerMove);
});

restartBtn.addEventListener('click', restartGame);
playAgainBtn.addEventListener('click', restartGame);
closeBtn.addEventListener('click', closeModal);

function playerMove(e) {
    const index = e.target.getAttribute('data-index');
    if (board[index] || !isPlayerTurn) return;
    
    board[index] = 'X';
    e.target.textContent = 'X';
    
    if (checkWinner('X')) {
        showResult("Player wins!");
        return;
    }
    
    if (isBoardFull()) {
        showResult("It's a draw!");
        return;
    }
    
    isPlayerTurn = false;
    setTimeout(aiMove, 500);
}

// AI move using Minimax
function aiMove() {
    const bestMove = minimax(board, 'O').index;
    board[bestMove] = 'O';
    cells[bestMove].textContent = 'O';
    
    if (checkWinner('O')) {
        showResult("AI wins!");
        return;
    }
    
    if (isBoardFull()) {
        showResult("It's a draw!");
        return;
    }
    
    isPlayerTurn = true;
}

// Minimax algorithm
function minimax(newBoard, player) {
    const emptyCells = getEmptyCells(newBoard);
    
    if (checkWinnerMinimax(newBoard, 'X')) return { score: -10 };
    if (checkWinnerMinimax(newBoard, 'O')) return { score: 10 };
    if (emptyCells.length === 0) return { score: 0 };
    
    let moves = [];
    
    for (let i = 0; i < emptyCells.length; i++) {
        let move = {};
        move.index = emptyCells[i];
        newBoard[emptyCells[i]] = player;
        
        if (player === 'O') {
            const result = minimax(newBoard, 'X');
            move.score = result.score;
        } else {
            const result = minimax(newBoard, 'O');
            move.score = result.score;
        }
        
        newBoard[emptyCells[i]] = null;
        moves.push(move);
    }
    
    let bestMove;
    
    if (player === 'O') {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    
    return moves[bestMove];
}

// Check winner for Minimax
function checkWinnerMinimax(board, player) {
    return winningCombos.some(combo => {
        return combo.every(index => board[index] === player);
    });
}

// Check if someone has won
function checkWinner(player) {
    return winningCombos.some(combo => combo.every(index => board[index] === player));
}

// Get all empty cells
function getEmptyCells(board) {
    return board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
}

// Check if the board is full
function isBoardFull() {
    return board.every(cell => cell !== null);
}
// Show modal with result
function showResult(message) {
    resultMessage.textContent = message;
    modal.style.display = "block";
}

// Close modal
function closeModal() {
    modal.style.display = "none";
}

// Restart game
function restartGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#fff';
    });
    isPlayerTurn = true;
    closeModal();
}
