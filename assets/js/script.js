const quizData = [
    {
      question: "What breed is this puppy?",
      image: "assets/images/husky.jpg", 
      options: ["Labrador Retriever", "German Shepherd", "Golden Retriever", "Beagle"],
      answer: "Labrador Retriever"
    },
    {
      question: "Identify the breed of this puppy.",
      image: "assets/images/boxer.jpg",
      options: ["Bulldog", "Poodle", "Boxer", "Dachshund"],
      answer: "Poodle"
    }
    // Add more quiz questions here
  ];
const questionElement = document.getElementById('question');
const imageElement = document.getElementById('puppy-image');
const optionsContainer = document.getElementById('options-container');
const refreshButton = document.getElementById('refresh-btn');
const scoreElement = document.getElementById('score');

let currentQuestion = 0;
let score = 0;

function showQuestion(questionIndex) {
  const currentQuizItem = quizData[questionIndex];
  questionElement.textContent = currentQuizItem.question;
  imageElement.src = currentQuizItem.image;
  imageElement.alt = "Puppy Image";
  optionsContainer.innerHTML = "";
  currentQuizItem.options.forEach(option => {
    const optionElement = document.createElement('div');
    optionElement.textContent = option;
    optionElement.classList.add('option');
    optionElement.addEventListener('click', () => checkAnswer(option, currentQuizItem.answer));
    optionsContainer.appendChild(optionElement);
  });
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
  scoreElement.textContent = "Final Score: " + score + " out of " + quizData.length;
}

refreshButton.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  scoreElement.textContent = "Score: 0";
  showQuestion(currentQuestion);
});

showQuestion(currentQuestion);