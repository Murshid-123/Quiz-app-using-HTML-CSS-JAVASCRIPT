import { questions } from './qustionlist.js';

const questionElement = document.getElementById("question");//we are taking question string as questionElement
const answerButtons = document.getElementById("answer-buttons");//we are selecting answers button div for adding option buttons as answerButtons
const nextButton = document.getElementById("next-btn");// we are selecting next button as nextButton to make changes

let currentQuestionIndex,score ;

function startQuiz(){
    currentQuestionIndex =0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];//we r selecting objs from qustions arry as currentQuestion,it includes qn an options
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

    /* we are iterate through this array to display options
        answers:[
        {text:"Paris",correct:true},
        {text:"Rome",correct: false},
        {text:"Madrid",correct:false},
        {text:"London",correct:false},
    ] */
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = true;
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
} 

function selectAnswer(event){
    const selectedBtn = event.target; //we are selecting the button if it is clicked.
    const isCorrect = selectedBtn.dataset.correct === "true";//The value of isCorrect is true if the answer is correct.
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true ;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}


function  handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();

    }
    else{
        startQuiz();
    }

})

startQuiz()

const darkMode = document.getElementById("mode");
let isDarkMode = true;
darkMode.classList.add("dark-mode-button");


function toggleMode() {
  const body = document.body;
  if (isDarkMode) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
  isDarkMode = !isDarkMode;
}

darkMode.addEventListener("click", toggleMode);

//
///kljkl