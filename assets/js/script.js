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
let questionElement = document.getElementById('question');
let imageElement = document.getElementById('puppy-image');
let optionsContainer = document.getElementById('options-container');
let refreshButton = document.getElementById('refresh-btn');
let scoreContainer = document.getElementById('score-container');
let usernameInput = document.getElementById('username');

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
  if (userAnswer === correctAnswer) {
    score++; // Increase score if correct
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

// Event listener for refresh button
refreshButton.addEventListener('click', () => {
  // Reset quiz variables
  currentQuestion = 0;
  score = 0;
  // Clear previous score
  scoreContainer.textContent = "";
  // Clear previous username
  usernameInput.value = "";
  // Start quiz from the beginning
  showQuestion(currentQuestion);
});

// Event listener for username input
usernameInput.addEventListener('input', () => {
  // Update username when input changes
  username = usernameInput.value;
});

// Show the first question when the page loads
showQuestion(currentQuestion);