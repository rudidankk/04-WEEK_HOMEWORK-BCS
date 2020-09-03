// Array of Questions

var questions = [
    {
        title: "How many scripts can you have in a document?",
        choices: ["One", "Two", "Six", "Unlimited"],
        answer: "Unlimited"
    },
    {
        title: "Can the external script contain the <script></script> tags?",
        choices: ["Yes", "No"],
        answer: "No"
    },
    {
        title: "How are single line comments started?",
        choices: ["//", "\\", "||", "?"],
        answer: "//"
    },
    {
        title: "What result would you get if you add a string and a number?",
        choices: ["Number", "String", "Boolean", "Algorithim"],
        answer: "String"
    },
    {
        title:"What are the kind(s) of pop-up boxes?",
        choices: ["Alert box", "Confirm box", "Prompt box", "All of the above"],
        answer: "All of the above"
    }
];

// DOM
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// Timer
var currentQuestionIndex = 0;
var time = questions.length * 30;
var timerId;

// Functions
// Start Quiz
function startQuiz() {

    var startScreenEl = document.getElementById("start-screen");
    //Hide Start Screen
    startScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;

    getQuestion();
}


  // Get Quetsions from Array
function getQuestion() {
    
    var currentQuestion = questions[currentQuestionIndex];
    var titleEl = document.getElementById("question-title");
    
    titleEl.textContent = currentQuestion.title;

    choicesEl.innerHTML = "";

    // loop over choices
    currentQuestion.choices.forEach(function(choice, i) {
      // create new button for each choice
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice;

      // click event listener for each choice
        choiceNode.onclick = questionClick;

      // display on the page
        choicesEl.appendChild(choiceNode);
    });
}


  // Subtract time for wrong answers 
function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 10;
    
        if (time < 0) {
        time = 0;
    }

      // New time on page
        timerEl.textContent = time;

    feedbackEl.textContent = "Nope!";
    } else {  
    feedbackEl.textContent = "Yes!";
    }

    // Feedback Text Time
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 800);

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}


  // Quiz End
function quizEnd() {

    clearInterval(timerId);

    // Show End Screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    // show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

  // Save Score to Local storage and User
function saveHighscore() {
    var initials = initialsEl.value.trim();

    // make sure value wasn't empty
    if (initials !== "") {
        var highscores =
            JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore = {
            score: time,
            initials: initials
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        window.location.href = "highscores.html";
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}


submitBtn.onclick = saveHighscore;

startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;