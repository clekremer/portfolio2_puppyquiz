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
  },
  {
    question: "What breed is this puppy?",
    image: "assets/images/crossbreed_rocky.png",
    options: ["Crossbreed", "French Bulldog", "Dalmatian", "Chihuahua"],
    answer: "Crossbreed"
  },
  {
    question: "What breed is this puppy?",
    image: "assets/images/marshall_dalmatian.png",
    options: ["Dalmatian", "Cockapoo", "Jack Russell Terrier", "Rhodesian Ridgeback"],
    answer: "Dalmatian"
  },
  {
    question: "What breed is this puppy?",
    image: "assets/images/rubble_bulldog.png",
    options: ["Bulldog", "Rottweiler", "Scotch Terrier", "Bernese Mountain Dog"],
    answer: "Bulldog"
  },
  {
    question: "What breed is this puppy?",
    image: "assets/images/skye_cockapoo.png",
    options: ["Shih Tzu", "Labradoodle", "Yorkshire Terrier", "Cockapoo"],
    answer: "Cockapoo"
  },
  {
    question: "What breed is this puppy?",
    image: "assets/images/zuma_labrador.png",
    options: ["Golden Retriever", "Labrador", "Weimaraner", "Doberman"],
    answer: "Labrador"
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
let notificationContainer = document.getElementById('notification-container');

// Initialize variables
let currentQuestion = 0;
let score = 0;
let username = '';git
let answeredQuestions = new Set();
let quizEnded = false;



// Function to shuffle the quiz questions
function shuffleQuizQuestions() {
  for (let i = quizData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quizData[i], quizData[j]] = [quizData[j], quizData[i]];
  }
}

// Function to use a maximum of 5 questions
function useMaxFiveQuestions() {
  if (quizData.length > 5) {
    quizData = quizData.slice(0, 5);
  }
}

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
  if (quizEnded || answeredQuestions.has(currentQuestion)) return;

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
    option.style.pointerEvents = 'none';
  });
}

// Function to show notifications
function showNotification(message, isSuccess) {
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
  }, 1000); // Show notification for 3 seconds
}

// Function to end the quiz
function endQuiz() {
  notificationContainer.textContent = "Congratulations " + username + "! Your final score is: " + score + " out of " + quizData.length;
  notificationContainer.classList.add('end-game'); // Add the end-game class
  refreshButton.style.display = 'block'; // Show the refresh button
  quizEnded = true;
}

// Event listener for start game button
startGameBtn.addEventListener('click', () => {
  username = usernameInput.value;
  popup.style.display = 'none';
  quizContainer.style.display = 'block';
  score = 0;
  scoreContainer.textContent = "Score: 0";
  shuffleQuizQuestions();
  useMaxFiveQuestions();
  showQuestion(currentQuestion);
});




// Event listener for refresh button
refreshButton.addEventListener('click', () => {


  quizData = [
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
    },
    {
      question: "What breed is this puppy?",
      image: "assets/images/crossbreed_rocky.png",
      options: ["Crossbreed", "French Bulldog", "Dalmatian", "Chihuahua"],
      answer: "Crossbreed"
    },
    {
      question: "What breed is this puppy?",
      image: "assets/images/marshall_dalmatian.png",
      options: ["Dalmatian", "Cockapoo", "Jack Russell Terrier", "Rhodesian Ridgeback"],
      answer: "Dalmatian"
    },
    {
      question: "What breed is this puppy?",
      image: "assets/images/rubble_bulldog.png",
      options: ["Bulldog", "Rottweiler", "Scotch Terrier", "Bernese Mountain Dog"],
      answer: "Bulldog"
    },
    {
      question: "What breed is this puppy?",
      image: "assets/images/skye_cockapoo.png",
      options: ["Shih Tzu", "Labradoodle", "Yorkshire Terrier", "Cockapoo"],
      answer: "Cockapoo"
    },
    {
      question: "What breed is this puppy?",
      image: "assets/images/zuma_labrador.png",
      options: ["Golden Retriever", "Labrador", "Weimaraner", "Doberman"],
      answer: "Labrador"
    }
    // Add more quiz questions here
  ];
  currentQuestion = 0;
  score = 0;
  answeredQuestions.clear();
  scoreContainer.textContent = "Score: 0"; 
  
  notificationContainer.textContent = ""; // Clear the notification container
  notificationContainer.classList.remove('end-game'); // Remove the end-game class
  quizEnded = false;
  
  shuffleQuizQuestions();
  useMaxFiveQuestions();
  showQuestion(currentQuestion);
});

// Show the popup when the page is loaded
window.addEventListener('load', function() {
  popup.style.display = 'block';
});
