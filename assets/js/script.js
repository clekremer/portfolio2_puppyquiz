// Define quiz data
let quizData = [
  {
    question: "What breed is this puppy?",
    image: "assets/images/boxer.jpg",
    options: ["Labrador Retriever", "German Shepherd", "Golden Retriever", "Beagle"],
    answer: "Labrador Retriever"
  },
  {
    question: "Identify the breed of this puppy.",
    image: "assets/images/husky.jpg",
    options: ["Bulldog", "Poodle", "Boxer", "Dachshund"],
    answer: "Poodle"
  }
  // Add more quiz questions here
];

// Fetch necessary DOM elements
let popup = document.getElementById('popup');
let usernameInput = document.getElementById('username');
let startGameBtn = document.getElementById('start-game-btn');
let quizContainer = document.getElementById('quiz-container');
let questionElement = document.getElementById('question');
let imageElement = document.getElementById('puppy-image');
let optionsContainer = document.getElementById('options-container');
let refreshButton = document.getElementById('refresh-btn');
let scoreContainer = document.getElementById('score-container');

// Initialize variables
let currentQuestion = 0;
let score = 0;
let username = '';

// Function to display current question
function showQuestion(questionIndex) {
  let currentQuizItem = quizData[questionIndex];
  questionElement.textContent = currentQuizItem.question;
  imageElement.src = currentQuizItem.image;
  imageElement.alt = "Puppy Image";
  optionsContainer.innerHTML = "";
  currentQuizItem.options.forEach(option => {
    let optionElement = document.createElement('div');
    optionElement.textContent = option;
    optionElement.classList.add('option');
    optionElement.addEventListener('click', () => checkAnswer(option, currentQuizItem.answer));
    optionsContainer.appendChild(optionElement);
  });
}

// Function to check user's answer
function checkAnswer(userAnswer, correctAnswer) {
  let isCorrect = userAnswer === correctAnswer;
  // Display notification
  if (isCorrect) {
    alert("Correct!");
  } else {
    alert("Wrong! The correct answer is: " + correctAnswer);
  }
  // Increase score if correct
  if (isCorrect) {
    score++;
  }
  // Display score after each question
  scoreContainer.textContent = "Score: " + score;
  currentQuestion++; // Move to the next question
  // If there are more questions, display the next one; otherwise, end the quiz
  if (currentQuestion < quizData.length) {
    showQuestion(currentQuestion);
  } else {
    endQuiz();
  }
}

// Function to end the quiz
function endQuiz() {
  // Display final score with username
  scoreContainer.textContent = "Congratulations " + username + "! Your final score is: " + score + " out of " + quizData.length;
}

// Event listener for start game button
startGameBtn.addEventListener('click', () => {
  // Get username
  username = usernameInput.value;
  // Hide popup
  popup.style.display = 'none';
  // Show quiz container
  quizContainer.style.display = 'block';
  // Show the first question
  showQuestion(currentQuestion);
});

// Event listener for refresh button
refreshButton.addEventListener('click', () => {
  // Reset quiz variables
  currentQuestion = 0;
  score = 0;
  // Clear previous score
  scoreContainer.textContent = "";
  // Start quiz from the beginning
  showQuestion(currentQuestion);
});

// Show the popup when the page is loaded
window.addEventListener('load', function() {
  popup.style.display = 'block';
});
