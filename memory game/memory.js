const ballsContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const playButton = document.getElementById('play-button');
const modal = document.getElementById('game-over-modal');
const finalScoreDisplay = document.getElementById('final-score');
const finalHighScoreDisplay = document.getElementById('final-high-score');
const newGameButton = document.getElementById('new-game-button');
const easyButton = document.getElementById('easy-button');
const mediumButton = document.getElementById('medium-button');
const hardButton = document.getElementById('hard-button');

let sequence = [];
let userSequence = [];
let level = 1;
let score = 0;
let highScore = 0;
let canClick = false;
let numBalls = 9;

// Generate balls dynamically based on difficulty
function generateBalls(num) {
  ballsContainer.innerHTML = '';
  ballsContainer.style.gridTemplateColumns = `repeat(${Math.sqrt(num)}, 1fr)`;
  for (let i = 0; i < num; i++) {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.id = `ball-${i + 1}`;
    ballsContainer.appendChild(ball);
  }
  addBallClickListeners();
}

// Add click listeners for balls
function addBallClickListeners() {
  const balls = document.querySelectorAll('.ball');
  balls.forEach((ball, index) => {
    ball.addEventListener('click', () => {
      if (!canClick) return;
      lightUpBall(index);
      userSequence.push(index);
      checkSequence();
    });
  });
}

// Light up a ball
function lightUpBall(ballIndex) {
  const balls = document.querySelectorAll('.ball');
  balls[ballIndex].classList.add('active');
  setTimeout(() => {
    balls[ballIndex].classList.remove('active');
  }, 500);
}

// Check the sequence
// Check the user's input sequence
function checkSequence() {
    for (let i = 0; i < userSequence.length; i++) {
      if (userSequence[i] !== sequence[i]) {
        gameOver();
        return;
      }
    }
  
    // If user has completed the sequence, go to next round
    if (userSequence.length === sequence.length) {
      score += 10 * level; // Increase score by 10 points per round, progressively more
      scoreDisplay.textContent = `Score: ${score}`;
      level++;
      userSequence = [];
      nextRound();
    }
  }

// Game over logic with modal
function gameOver() {
  if (score > highScore) highScore = score;
  highScoreDisplay.textContent = `High Score: ${highScore}`;
  finalScoreDisplay.textContent = score;
  finalHighScoreDisplay.textContent = highScore;
  modal.style.display = 'block';
}

function nextRound() {
  generateSequence();
  playSequence();
}

function resetGame() {
  sequence = [];
  userSequence = [];
  level = 1;
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  generateBalls(numBalls);
}

// Set up difficulty buttons
easyButton.addEventListener('click', () => {
  numBalls = 9;
  resetGame();
  playButton.style.display = 'block';
});

mediumButton.addEventListener('click', () => {
  numBalls = 16;
  resetGame();
  playButton.style.display = 'block';
});

hardButton.addEventListener('click', () => {
  numBalls = 25;
  resetGame();
  playButton.style.display = 'block';
});

playButton.addEventListener('click', () => {
  playButton.style.display = 'none';
  nextRound();
});

newGameButton.addEventListener('click', () => {
  modal.style.display = 'none';
  resetGame();
  nextRound();
});

// Generate random sequence
function generateSequence() {
  const randomBall = Math.floor(Math.random() * numBalls);
  sequence.push(randomBall);
}

// Play the sequence for the player
function playSequence() {
  let i = 0;
  canClick = false;

  const interval = setInterval(() => {
    lightUpBall(sequence[i]);
    i++;

    if (i >= sequence.length) {
      clearInterval(interval);
      canClick = true;
    }
  }, 1000);
}
