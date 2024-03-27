// Define quiz data
let quizData = [
  {
    question: "What breed is this puppy?",
    image: "assets/images/shepherd.jpg",
    options: ["Labrador Retriever", "German Shepherd", "Golden Retriever", "Beagle"],
    answer: "German Shepherd"
  },
  {
    question: "What breed is this puppy?",
    image: "assets/images/poodle.jpg",
    options: ["Bulldog", "Poodle", "Boxer", "Dachshund"],
    answer: "Poodle"
  },
  {
    question: "What breed is this puppy?",
    image: "assets/images/boxer.jpg",
    options: ["Bulldog", "Poodle", "Boxer", "Dachshund"],
    answer: "Boxer"
  },
  {
    question: "What breed is this puppy?",
    image: "assets/images/beagle.jpg",
    options: ["Border Collie", "Greyhound", "Beagle", "Fox Terrier"],
    answer: "Beagle"
  },
  {
    question: "What breed is this puppy?",
    image: "assets/images/labrador.jpg",
    options: ["Border Collie", "Labrador", "Beagle", "Fox Terrier"],
    answer: "Labrador"
  },
  {
    question: "What breed is this puppy?",
    image: "assets/images/goldenretriever.jpg",
    options: ["Golden Retriever", "Labrador", "Beagle", "Mops"],
    answer: "Golden Retriever"
  },
  {
    question: "What breed is this puppy?",
    image: "assets/images/husky.jpg",
    options: ["Australian Shepherd", "Collie", "Boxer", "Husky"],
    answer: "Husky"
  },
  {
    question: "What breed is this puppy?",
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
let quizProgress = document.getElementById('quiz-progress');

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
  updateQuizProgress();
}

// Function to update quiz progress
function updateQuizProgress() {
  quizProgress.textContent = "Question " + (currentQuestion + 1) + " of " + quizData.length;
}

// Function to check user's answer
function checkAnswer(userAnswer, correctAnswer) {
  if (answeredQuestions.has(currentQuestion)) return;

  let isCorrect = userAnswer === correctAnswer;
  if (isCorrect) {
    showNotification("Correct!", true);
    score++;
  } else {
    showNotification("Wrong! The correct answer is: " + correctAnswer, false);
  }
  scoreContainer.textContent = "Score: " + score;
  answeredQuestions.add(currentQuestion);
  optionsContainer.querySelectorAll('.option').forEach(option => {
    option.removeEventListener('click', optionClickHandler);
    option.style.pointerEvents = 'none';
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
    setTimeout(() => {
        notification.remove();
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++; // Move to the next question
            showQuestion(currentQuestion);
        } else {
            endQuiz(); // End the quiz
        }
    }, 3000); // Show notification for 3 seconds
}

// Function to end the quiz
function endQuiz() {
  scoreContainer.textContent = "Congratulations " + username + "! Your final score is: " + score + " out of " + quizData.length;
  refreshButton.style.display = 'block'; // Show the refresh button
}

// Event listener for start game button
startGameBtn.addEventListener('click', () => {
  username = usernameInput.value;
  popup.style.display = 'none';
  quizContainer.style.display = 'block';
  score = 0;
  scoreContainer.textContent = "Score: 0";
  showQuestion(currentQuestion);
});

// Event listener for refresh button
refreshButton.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  answeredQuestions.clear();
  scoreContainer.textContent = "";
  showQuestion(currentQuestion);
});

// Show the popup when the page is loaded
window.addEventListener('load', function() {
  popup.style.display = 'block';
});
