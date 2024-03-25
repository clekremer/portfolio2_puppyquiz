// Define quiz data
let quizData = [
  {
    question: "What breed is this puppy?",
    image: "assets/images/shepherd.jpg",
    options: ["Labrador Retriever", "German Shepherd", "Golden Retriever", "Beagle"],
    answer: "German Shepherd"
  },
  {
    question: "Identify the breed of this puppy.",
    image: "assets/images/poodle.jpg",
    options: ["Bulldog", "Poodle", "Boxer", "Dachshund"],
    answer: "Poodle"
  },

  {
    question: "Identify the breed of this puppy.",
    image: "assets/images/boxer.jpg",
    options: ["Bulldog", "Poodle", "Boxer", "Dachshund"],
    answer: "Boxer"
  },

  {
    question: "Identify the breed of this puppy.",
    image: "assets/images/beagle.jpg",
    options: ["Border Collie", "Greyhound", "Beagle", "Fox Terrier"],
    answer: "Beagle"
  },

  {
    question: "Identify the breed of this puppy.",
    image: "assets/images/labrador.jpg",
    options: ["Border Collie", "Labrador", "Beagle", "Fox Terrier"],
    answer: "Labrador"
  },

  {
    question: "Identify the breed of this puppy.",
    image: "assets/images/goldenretriever.jpg",
    options: ["Golden Retriever", "Labrador", "Beagle", "Mops"],
    answer: "Golden Retriever"
  },

  {
    question: "Identify the breed of this puppy.",
    image: "assets/images/husky.jpg",
    options: ["Australian Shepherd", "Collie", "Boxer", "Husky"],
    answer: "Husky"
  },

  {
    question: "Identify the breed of this puppy.",
    image: "assets/images/bulldog.jpg",
    options: ["Bulldog", "French Bulldog", "Pitbull", "Chihuahua"],
    answer: "Bulldog"
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
let nextButton = document.getElementById('next-btn'); // New
let quizProgress = document.getElementById('quiz-progress'); // New

// Initialize variables
let currentQuestion = 0;
let score = 0;
let username = '';
let answeredQuestions = new Set();

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
  nextButton.style.display = 'none'; // Hide Next button initially
  updateQuizProgress(); // Update quiz progress
}

// Function to update quiz progress
function updateQuizProgress() {
  quizProgress.textContent = "Question " + (currentQuestion + 1) + " of " + quizData.length;
}

// Function to check user's answer
function checkAnswer(userAnswer, correctAnswer) {
  if (answeredQuestions.has(currentQuestion)) return; // Check if question already answered
  
  let isCorrect = userAnswer === correctAnswer;
  // Display notification
  if (isCorrect) {
    showNotification("Correct!", true);
    score++; // Increase score if correct
  } else {
    showNotification("Wrong! The correct answer is: " + correctAnswer, false);
  }
  // Display score after each question
  scoreContainer.textContent = "Score: " + score;
  answeredQuestions.add(currentQuestion); // Add question to answered set

  // Disable all options after the user selects one
  optionsContainer.querySelectorAll('.option').forEach(option => {
    option.removeEventListener('click', optionClickHandler); // Remove click event listener
    option.style.pointerEvents = 'none'; // Disable pointer events
  });
}

// Function to show notifications
function showNotification(message, isSuccess) {
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.classList.add('notification');
    if (isSuccess) {
        notification.classList.add('success');
    } else {
        notification.classList.add('error');
    }
    notification.textContent = message;
    notificationContainer.appendChild(notification);
    // Automatically remove notification after a certain time (e.g., 3 seconds)
    setTimeout(() => {
        notification.remove();
        nextButton.style.display = 'block'; // Display Next button after notification disappears
    }, 1500);
}

// Event listener for Next button
nextButton.addEventListener('click', () => {
  currentQuestion++; // Move to the next question
  // If there are more questions, display the next one; otherwise, end the quiz
  if (currentQuestion < quizData.length) {
    showQuestion(currentQuestion);
  } else {
    endQuiz();
  }
});

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
  // Initialize score to 0
  score = 0;
  scoreContainer.textContent = "Score: 0"; // Set initial score text content
  // Show the first question
  showQuestion(currentQuestion);
});

// Event listener for refresh button
refreshButton.addEventListener('click', () => {
  // Reset quiz variables
  currentQuestion = 0;
  score = 0;
  answeredQuestions.clear(); // Clear answered questions set
  // Clear previous score
  scoreContainer.textContent = "";
  // Start quiz from the beginning
  showQuestion(currentQuestion);
});

// Show the popup when the page is loaded
window.addEventListener('load', function() {
  popup.style.display = 'block';
});