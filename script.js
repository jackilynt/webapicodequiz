(function(){
    function buildQuiz(){
      var output = [];
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
          var answers = [];
          for(letter in currentQuestion.answers){
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
      quizContainer.innerHTML = output.join('');
    }
    function showResults(){
      var answerContainers = quizContainer.querySelectorAll('.answers');
      let numCorrect = 0;
      myQuestions.forEach( (currentQuestion, questionNumber) => {
        var answerContainer = answerContainers[questionNumber];
        var selector = `input[name=question${questionNumber}]:checked`;
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;
        if(userAnswer === currentQuestion.correctAnswer){
          numCorrect++;
          answerContainers[questionNumber].style.color = 'green';
        }
        else{
          answerContainers[questionNumber].style.color = 'red';
        }
      });
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
    var quizContainer = document.getElementById('quiz');
    var resultsContainer = document.getElementById('results');
    var submitButton = document.getElementById('submit');
    var myQuestions = [
      {
        question: "What is an example Javascript data type?",
        answers: {
          1: "String",
          2: "Method",
          3: "Stylesheet"
        },
        correctAnswer: "1"
      },
      {
        question: "What is Javascript?",
        answers: {
          1: "JQuery",
          2: "A code fucntion",
          3: "A web programming language"
        },
        correctAnswer: "3"
      },
      {
        question: "What is an API",
        answers: {
          1: "Method of an application",
          2: "A component of an HTML",
          3: "An application programming interface"
        },
        correctAnswer: "3"
      }
    ];
    buildQuiz();
    var previousButton = document.getElementById("previous");
    var nextButton = document.getElementById("next");
    var slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    showSlide(currentSlide);
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  