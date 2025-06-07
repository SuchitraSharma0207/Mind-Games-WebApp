// List of items with images and prices
const items = [
    { name: 'pencil', price: 0, imgSrc: 'pencil.jpg' },
    { name: 'eraser', price: 0, imgSrc: 'rubber.jpg' },
    { name: 'sharpener', price: 0, imgSrc: 'sharpner.jpg' },
    { name: 'rounder', price: 0, imgSrc: 'rounder.jpg' },
    { name: 'scale', price: 0, imgSrc: 'scale.jpg' },
    { name: 'colourplat', price: 0, imgSrc: 'colorplate.jpg' }
];

let score = 0;
let currentQuestion = {};
let selectedItems = [];

// Function to initialize prices
function initializePrices() {
    items.forEach(item => {
        item.price = getRandomPrice(1, 10);
        document.getElementById(`price-${item.name}`).innerText = `$${item.price}`;
    });
}

// Function to get random price
function getRandomPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a question with images and operators between them
function generateQuestion() {
    const numItems = Math.random() < 0.5 ? 2 : 4;  // Decide whether to include 2 or 4 items
    selectedItems = shuffleArray([...items]).slice(0, numItems);

    // Randomly assign quantities (1-5) to each selected item
    let questionContainer = document.getElementById('question');
    questionContainer.innerHTML = '';  // Clear any previous question
    let correctAnswer = 0;

    selectedItems.forEach((item, index) => {
        const quantity = getRandomPrice(1, 5);  // Random quantity between 1 and 5
        correctAnswer += item.price * quantity;

        // Create a div to hold the quantity and item image
        let itemDiv = document.createElement('div');
        itemDiv.style.display = 'inline-block';
        itemDiv.style.margin = '0 10px';

        // Create an image element for the item
        let img = document.createElement('img');
        img.src = item.imgSrc;
        img.alt = item.name;
        img.style.width = '50px';  // Adjust image size as needed
        img.style.height = '50px';  // Adjust image size as needed
        img.style.display = 'block';
        img.style.margin = '0 auto';

        // Create a span for the quantity
        let quantitySpan = document.createElement('span');
        quantitySpan.innerText = `${quantity} x `;
        quantitySpan.style.fontSize = '16px';
        quantitySpan.style.display = 'block';
        quantitySpan.style.textAlign = 'center';

        // Append quantity and image to the item div
        itemDiv.appendChild(quantitySpan);
        itemDiv.appendChild(img);

        // Append the item div to the question container
        questionContainer.appendChild(itemDiv);

        // Add a "+" operator after each item except the last one
        if (index < selectedItems.length - 1) {
            let plusOperator = document.createElement('span');
            plusOperator.innerText = '+';
            plusOperator.style.fontSize = '20px';
            plusOperator.style.margin = '0 10px';
            plusOperator.style.verticalAlign = 'middle';
            questionContainer.appendChild(plusOperator);
        }
    });

    // Set the current correct answer
    currentQuestion = {
        items: selectedItems,
        correctAnswer: correctAnswer
    };

    // Add an "=" sign at the end of the question
    let equalsSign = document.createElement('span');
    equalsSign.innerText = '=';
    equalsSign.style.fontSize = '20px';
    equalsSign.style.display = 'block';
    equalsSign.style.marginTop = '10px';
    questionContainer.appendChild(equalsSign);

    // Clear previous answer and feedback
    document.getElementById('answer').value = '';
    document.getElementById('feedback').innerText = '';
}

// Function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to handle submission
function handleSubmit() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    if (isNaN(userAnswer)) {
        alert('Please enter a valid number.');
        return;
    }

    const feedback = document.getElementById('feedback');
    if (userAnswer === currentQuestion.correctAnswer) {
        score += 5;
        feedback.innerText = 'Correct! +5 points';
        feedback.classList.remove('incorrect');
        feedback.classList.add('correct');
    } else {
        feedback.innerText = `Incorrect! The correct answer was ${currentQuestion.correctAnswer}.`;
        feedback.classList.remove('correct');
        feedback.classList.add('incorrect');
    }

    document.getElementById('score').innerText = score;
}

// Function to handle next question
function handleNext() {
    initializePrices();
    generateQuestion();
}

// Initialize game on page load
window.onload = function () {
    initializePrices();
    generateQuestion();

    document.getElementById('submit').addEventListener('click', handleSubmit);
    document.getElementById('next').addEventListener('click', handleNext);
};
