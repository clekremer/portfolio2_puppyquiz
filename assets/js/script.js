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

let questionElement = document.getElementById('question');
let imageElement = document.getElementById('puppy-image');
let optionsContainer = document.getElementById('options-container');
let refreshButton = document.getElementById('refresh-btn');
let scoreContainer = document.getElementById('score-container');

let currentQuestion = 0;
let score = 0;

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
  scoreContainer.textContent = "Score: " + score; // Update score display
}

function checkAnswer(userAnswer, correctAnswer) {
  if (userAnswer === correctAnswer) {
    score++;
    alert("Correct!");
  } else {
    alert("Wrong! The correct answer is: " + correctAnswer);
  }
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion(currentQuestion);
  } else {
    endQuiz();
  }
}

function endQuiz() {
  scoreContainer.textContent = "Final Score: " + score; // Display final score
}

refreshButton.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  showQuestion(currentQuestion);
});

showQuestion(currentQuestion);