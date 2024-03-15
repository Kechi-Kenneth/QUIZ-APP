// alert('hello');

const questions = [
  {
    question: "Which part of Africa is Nigeria in?",
    answers: [
      { text: "North Africa", correct: false },
      { text: "West Africa", correct: true },
      { text: "East Africa", correct: false },
      { text: "Central Africa", correct: false },
    ],
  },
  {
    question: "What is the capital City of Nigeria?",
    answers: [
      { text: "Lagos", correct: false },
      { text: "Abuja", correct: true },
      { text: "Accra", correct: false },
      { text: "Calabar", correct: false },
    ],
  },

  {
    question: "Who is the current president of Nigeria?",
    answers: [
      { text: "Peter Obi", correct: false },
      { text: "Bola Tinubu", correct: true },
      { text: "Nyesom Wike", correct: false },
      { text: "Kechi Kenneth", correct: false },
    ],
  },

  {
    question: "Where do amapiano originate from?",
    answers: [
      { text: "South Africa", correct: true },
      { text: "West Africa", correct: false },
      { text: "Nigeria", correct: false },
      { text: "Central Africa", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  let percentage = score/questions.length * 100;
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!... and  you've got  ${percentage}% out of of 100%.`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
