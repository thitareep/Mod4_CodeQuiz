var containerQuestionEl = document.getElementById("question-container");
var containerStartEl = document.getElementById("starter-container");
var containerEndEl = document.getElementById("end-container")
var containerScoreEl = document.getElementById("score-banner")
var formInitials = document.getElementById("initials-form")
var containerHighScoresEl = document.getElementById("high-score-container")
var ViewHighScoreEl = document.getElementById("view-high-scores")
var listHighScoreEl = document.getElementById("high-score-list")
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("wrong")

// The Buttons //
var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back")
var btnClearScoresEl = document.querySelector("#clear-high-scores")

// Questions & Answers element//
var questionEl = document.getElementById("question")
var answerbuttonsEl = document.getElementById("answer-buttons")
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;

// Highscore Array //
var HighScores = [];

//assign array details for questions 
var arrayShuffledQuestions
var QuestionIndex = 0


var questions = [
    {
        q: "Commonly used data types DO NOT include:",
        a: "1. Alerts",
        choices: [{choice: "1. Alerts"}, {choice: "2. Booleans"}, {choice: "3. Strings"}, {choice: "4. Numbers"}]
    },
    {
        q: "Arrays in JavaScript can be used to store ______",
        a: "4. All The Above",
        choices: [{choice: "1. Other Arrays"}, {choice: "2. Numbers and Strings"}, {choice: "3. Booleans"}, {choice: "4. All The Above"}]
    },
    {
        q: "A very useful tool used during the development and debugging for printing content to the debugger is: ",
        a: "2. Console Log",
        choices: [{choice: "A. Terminal/Bash"}, {choice: "2. Console Log"}, {choice: "3. JavaScript"}, {choice: "4. For Loops"}]
    },
    {
        q: "The condition in an if/else statement is enclosed with ______",
        a: "4. Parenthesis",
        choices: [{choice: "1. Curly Brackets"}, {choice: "2. Quotes"}, {choice: "3. Square Brackets"}, {choice: "4. Parenthesis"}]
    },
    {
        q: "String values must be enclosed within ______ when being assigned to variables.",
        a: "3. Quotes",
        choices: [{choice: "1. Parenthesis"}, {choice: "2. Square Brackets"}, {choice: "3. Quotes"}, {choice: "4. Curly Brackets"}]
    },
];

 // For back button on highscores screen //
var renderStartPage = function () {
    containerHighScoresEl.classList.add("hide")
    containerHighScoresEl.classList.remove("display")
    containerStartEl.classList.remove("hide")
    containerStartEl.classList.add("display")
    containerScoreEl.removeChild(containerScoreEl.lastChild)
    QuestionIndex = 0
    gameover = ""
    timerEl.textContent = 0 
    score = 0

    if (correctEl.className = "display") {
        correctEl.classList.remove("display");
        correctEl.classList.add("hide")
    }
    if (wrongEl.className = "display") {
        wrongEl.classList.remove("display");
        wrongEl.classList.add("hide");
    }
}

// Timer starts at 60 seconds // 
var setTime = function () {
    timeleft = 60;

var timercheck = setInterval(function() {
    timerEl.innerText = timeleft;
    timeleft--

    if (gameover) {
        clearInterval(timercheck)
    }   
    if (timeleft < 0) {
        showScore()
        timerEl.innerText = 0
        clearInterval(timercheck)
    }

    }, 1000)
}

var startQuiz = function() {
    // Classes to display & hide start/intro screen //
    containerStartEl.classList.add('hide');
    containerStartEl.classList.remove('display');
    containerQuestionEl.classList.remove('hide');
    containerQuestionEl.classList.add('display');
    // Shuffle questions in random order //
    arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
}

// Set the next question //
var setQuestion = function() {
    resetAnswers()
    displayQuestion(arrayShuffledQuestions[QuestionIndex])
}

// Remove answer buttons //
var resetAnswers = function() {
    while (answerbuttonsEl.firstChild) {
        answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
    };
};

// Display question and answer info //
var displayQuestion = function(index) {
    questionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", answerCheck)
        answerbuttonsEl.appendChild(answerbutton)
        }
    };

// Display 'Correct' message on screen //
var answerCorrect = function() {
    if (correctEl.className = "hide") {
        correctEl.classList.remove("hide")
        correctEl.classList.add("banner")
        wrongEl.classList.remove("banner")
        wrongEl.classList.add("hide")
        }
    }  

// Display 'Wrong' message on screen //
var answerWrong = function() {
    if (wrongEl.className = "hide") {
        wrongEl.classList.remove("hide")
        wrongEl.classList.add("banner")
        correctEl.classList.remove("banner")
        correctEl.classList.add("hide")
    }
}

// Verify if answer is correct //  
var answerCheck = function(event) {
    var selectedanswer = event.target
        if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
            answerCorrect()
            score = score + 10
        }
// Subtract 10 seconds for every wrong answer //
        else {
        answerWrong()
        score = score - 1;
        timeleft = timeleft - 10;
    };

    //go to next question, check if there is more questions
    QuestionIndex++
        if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
            setQuestion()
        }   
        else {
        gameover = "true";
        showScore();
            }
}

    //Display total score screen at end of game
var showScore = function () {
    containerQuestionEl.classList.add("hide");
    containerEndEl.classList.remove("hide");
    containerEndEl.classList.add("display");

    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score + "!");
    containerScoreEl.appendChild(scoreDisplay);
}       

// Highscore values //
var createHighScore = function(event) { 
    event.preventDefault() 
    var initials = document.querySelector("#initials").value;
    if (!initials) {
    alert("Please enter your intials!");
    return;
    }

formInitials.reset();

var HighScore = {
initials: initials,
score: score
} 

HighScores.push(HighScore);
HighScores.sort((a, b) => {return b.score-a.score});

while (listHighScoreEl.firstChild) {
listHighScoreEl.removeChild(listHighScoreEl.firstChild)
}

for (var i = 0; i < HighScores.length; i++) {
var highscoreEl = document.createElement("li");
highscoreEl.ClassName = "high-score";
highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
listHighScoreEl.appendChild(highscoreEl);
}

saveHighScore();
displayHighScores();

}

// Save highscore //
var saveHighScore = function () {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))
        
}

// Load values //
var loadHighScore = function () {
    var LoadedHighScores = localStorage.getItem("HighScores")
        if (!LoadedHighScores) {
        return false;
    }

    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a, b) => {return b.score-a.score})


    for (var i = 0; i < LoadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);

        HighScores.push(LoadedHighScores[i]);
        
    }
}  

// Display highscores //
var displayHighScores = function() {

    containerHighScoresEl.classList.remove("hide");
    containerHighScoresEl.classList.add("display");
    gameover = "true"

    if (containerEndEl.className = "display") {
        containerEndEl.classList.remove("display");
        containerEndEl.classList.add("hide");
        }
    if (containerStartEl.className = "display") {
        containerStartEl.classList.remove("display");
        containerStartEl.classList.add("hide");
        }
        
    if (containerQuestionEl.className = "display") {
        containerQuestionEl.classList.remove("display");
        containerQuestionEl.classList.add("hide");
        }

    if (correctEl.className = "display") {
        correctEl.classList.remove("display");
        correctEl.classList.add("hide");
    }

    if (wrongEl.className = "display") {
        wrongEl.classList.remove("display");
        wrongEl.classList.add("hide");
        }
    
}
// Clear saved highscores //
var clearScores = function () {
    HighScores = [];

    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild);
    }

    localStorage.clear(HighScores);

} 

loadHighScore()
    
  // Click start button to start quiz //
btnStartEl.addEventListener("click", startQuiz)
  //Submit button//
formInitials.addEventListener("submit", createHighScore)
  // To view highscores //
ViewHighScoreEl.addEventListener("click", displayHighScores)
  // Back button //
btnGoBackEl.addEventListener("click", renderStartPage)
  // Button to clear scores //
btnClearScoresEl.addEventListener("click", clearScores)