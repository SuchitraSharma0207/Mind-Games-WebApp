let size = 4;
let numberOfTiles = size ** 2;
let highlighted = numberOfTiles;
let shuffled = false;
let moves = 0;
let startTime = null;
let timerInterval = null;

let buttonContainer = document.getElementById('tiles');

// Keyboard controls
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;
const UP_ARROW = 40;
const DOWN_ARROW = 38;
window.onkeydown = function (event) {
    if (event.keyCode === RIGHT_ARROW) {
        swap(highlighted + 1);
    } else if (event.keyCode === LEFT_ARROW) {
        swap(highlighted - 1);
    } else if (event.keyCode === UP_ARROW) {
        swap(highlighted + size);
    } else if (event.keyCode === DOWN_ARROW) {
        swap(highlighted - size);
    }
};

// Modal close functionality
document.getElementById('closeModal').onclick = function () {
    closeModal();
};

// New game button functionality
document.getElementById('newGameBtn').addEventListener('click', function () {
    closeModal();
    resetGame();
});

// Start the game
newGame();

function newGame() {
    loadTiles(size);
    moves = 0;
    document.getElementById('moveDisplay').innerHTML = `Moves: 0`;
    startTimer();  // Start the timer on a new game
    setTimeout(() => {
        shuffle();
    }, 500);
}

// Timer and moves tracking
function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(function () {
        let elapsedTime = Math.floor((new Date() - startTime) / 1000);
        document.getElementById('timeDisplay').innerHTML = `Time: ${elapsedTime}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function incrementMoves() {
    moves++;
    document.getElementById('moveDisplay').innerHTML = `Moves: ${moves}`;
}

function resetGame() {
    moves = 0;
    document.getElementById('moveDisplay').innerHTML = `Moves: 0`;
    document.getElementById('timeDisplay').innerHTML = `Time: 0s`;
    stopTimer();
    newGame();
}

// Show win modal
function showWinModal() {
    stopTimer();
    let elapsedTime = Math.floor((new Date() - startTime) / 1000);
    document.getElementById('winMessage').innerHTML = `Time: ${elapsedTime}s`;
    document.getElementById('movesMessage').innerHTML = `Moves: ${moves}`;
    document.getElementById('winModal').style.display = "block";
}

function closeModal() {
    document.getElementById('winModal').style.display = "none";
}

// Create the puzzle buttons (tiles)
function loadTiles(n) {
    buttonContainer.innerHTML = '';  // Clear previous tiles
    for (let b = 1; b <= numberOfTiles; b++) {
        var newTile = document.createElement('button');
        newTile.id = `btn${b}`;
        newTile.setAttribute('index', b);
        newTile.innerHTML = b;
        newTile.classList.add('btn');
        newTile.addEventListener('click', function () {
            swap(parseInt(this.getAttribute('index')));
        });
        buttonContainer.append(newTile);
    }
    selectedTileId = 'btn' + highlighted;
    selectedTile = document.getElementById(selectedTileId);
    selectedTile.classList.add("selected");
}

// Shuffle the tiles
function shuffle() {
    let minShuffles = 100;
    let totalShuffles = minShuffles + Math.floor(Math.random() * (200 - 100) + 100);

    for (let i = minShuffles; i <= totalShuffles; i++) {
        setTimeout(function timer() {
            let x = Math.floor(Math.random() * 4);
            let direction = 0;
            if (x == 0) {
                direction = highlighted + 1;
            } else if (x == 1) {
                direction = highlighted - 1;
            } else if (x == 2) {
                direction = highlighted + size;
            } else if (x == 3) {
                direction = highlighted - size;
            }
            swap(direction);
            if (i >= totalShuffles - 1) {
                shuffled = true;
            }
        }, i * 10);
    }
}

// Swap the tiles
function swap(clicked) {
    if (clicked < 1 || clicked > (numberOfTiles)) {
        return;
    }

    // Check if we are trying to swap right
    if (clicked == highlighted + 1) {
        if (clicked % size != 1) {
            setSelected(clicked);
        }
        // Check if we are trying to swap left
    } else if (clicked == highlighted - 1) {
        if (clicked % size != 0) {
            setSelected(clicked);
        }
        // Check if we are trying to swap up
    } else if (clicked == highlighted + size) {
        setSelected(clicked);
        // Check if we are trying to swap down 
    } else if (clicked == highlighted - size) {
        setSelected(clicked);
    }

    if (shuffled) {
        incrementMoves();  // Track moves only after shuffle
        if (checkHasWon()) {
            showWinModal();  // Show the winning modal
        }
    }
}

// Check if the player has won
function checkHasWon() {
    for (let b = 1; b <= numberOfTiles; b++) {
        currentTile = document.getElementById(`btn${b}`);
        currentTileIndex = currentTile.getAttribute('index');
        currentTileValue = currentTile.innerHTML;
        if (parseInt(currentTileIndex) != parseInt(currentTileValue)) {
            return false;
        }
    }
    return true;
}

// Applies styles to the selected tile
function setSelected(index) {
    currentTile = document.getElementById(`btn${highlighted}`);
    currentTileText = currentTile.innerHTML;
    currentTile.classList.remove('selected');
    newTile = document.getElementById(`btn${index}`);
    currentTile.innerHTML = newTile.innerHTML;
    newTile.innerHTML = currentTileText;
    newTile.classList.add("selected");
    highlighted = index;
}
