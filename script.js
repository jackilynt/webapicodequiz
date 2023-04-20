// Get references to HTML elements
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const scoresList = document.getElementById("scores");

// Define quiz questions
const myQuestions = [
  {
    question: "What is an example of a JavaScript data type?",
    answers: {
      1: "String",
      2: "Method",
      3: "Stylesheet"
    },
    correctAnswer: "1"
  },
  {
    question: "What is JavaScript?",
    answers: {
      1: "JQuery",
      2: "A code function",
      3: "A web programming language"
    },
    correctAnswer: "3"
  },
  {
    question: "What is an API?",
    answers: {
      1: "Method of an application",
      2: "A component of HTML",
      3: "An application programming interface"
    },
    correctAnswer: "3"
  }
];

let currentSlide = 0;
let numCorrect = 0;

// Build quiz and display first question
function buildQuiz() {
  const output = [];
  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answers = [];
    for (const option in currentQuestion.answers) {
      answers.push(
        '<label> <input type="radio" name="question' + questionNumber + '" value="' + option + '"> ' + option + ': ' + currentQuestion.answers[option] + '</label>'
      );
    }
    output.push(
      '<div class="slide"> <div class="question">' + currentQuestion.question + '</div> <div class="answers">' + answers.join("") + '</div> </div>'
    );
  });
  quizContainer.innerHTML = output.join('');
}

// Show current slide
function showSlide(n) {
  const slides = document.querySelectorAll('.slide');
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if (currentSlide === 0) {
    previousButton.style.display = 'none';
  } else {
    previousButton.style.display = 'inline-block';
  }
  if (currentSlide === slides.length - 1) {
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  } else {
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
}

// Show next slide
function showNextSlide() {
  showSlide(currentSlide + 1);
}

// Show previous slide
function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

// Calculate and display quiz results
function showResults() {
  const answerContainers = quizContainer.querySelectorAll('.answers');
  let numCorrect = 0;
  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
      answerContainers[questionNumber].style.color = 'green';
    } else {
      answerContainers[questionNumber].style.color = 'red';
    }
  });
  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;

  // Save score and initials
  const initials = prompt("Please enter your initials to save your score:");
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push({ initials: initials, score: numCorrect });
  localStorage.setItem("highScores", JSON.stringify(highScores));

  // Display high scores
  displayScores(highScores);
}


// Display high scores
function displayScores(scores) {
  scoresList.innerHTML = "";
  scores.sort((a, b) => b.score - a.score);
  scores.forEach((score) => {
    const scoreItem = document.createElement("li");
    scoreItem.innerText = "${score.initials} - ${score.score}";
    scoresList.appendChild(scoreItem);
  });
}

// Event listeners
submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

// Build quiz
buildQuiz();




