// HTML element selectors
const startBtnEl = document.getElementById('start-btn');
const startEl = document.getElementById('start');
const questionsEl = document.getElementById('questions');
const questionEl = document.getElementById('question');
const possibleAnswersEl = document.getElementById('possible-answers');
const timeEl = document.getElementById('time');
const formEl = document.getElementById('end-game-form');
const scoreEl = document.getElementById('score');
const submitEl = document.getElementById('submit');
const nameEl = document.getElementById('name');
const spanEl = document.getElementById('result');


var gameOver = false;
var score = 0;
var i = 0;
var questionNumber = 0;

// array of questions
const questions = [
    {
        'question': 'Commonly used data types DO NOT include :', 
        'possible': ['strings', 'booleans', 'alerts', 'numbers'],
        'answer': 'alerts'
    },
    {
        'question': 'The condition in an if / else statement is enclosed within :', 
        'possible': ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        'answer': 'parenthesis'
    },
    {
        'question': 'Arrays in JavaScript can be used to store :', 
        'possible': ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        'answer': 'all of the above'
    },
    {
        'question': 'String values must be enclosed within ____ when being assigned to variables.', 
        'possible': ['commas', 'curly brackets', 'quotes', 'parenthesis'],
        'answer': 'quotes'
    }, 
    {
        'question': 'A very useful tool used during development and debugging for printing content to the debugger is :', 
        'possible': ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
        'answer': 'console.log'
    }
];



// global time variable for timer
let timeLeft = 60;

// timer function
function setTime(){
    
    let timerInterval = setInterval(function() {
        // checks if game is over before the time ran out
        timeEl.innerHTML = timeLeft;
        if (gameOver === true) {
            clearInterval(timerInterval);
            return;
        // checks if time has run out before questions are answered
        } else if(timeLeft === 0) {
            clearInterval(timerInterval);
            console.log('out of time');
            //end game and show highscores
            endGame();
        }
        timeLeft--;
        
    }, 1000)
}





// check answer function
function checkAnswer (event) {
    event.preventDefault()
    let userAnswer = event.target.textContent;
    // for some reason when i put the variable questionNumber in the [] 
    let trueAnswer = questions[questionNumber].answer;

    // if answer is correct
    if (userAnswer.includes(trueAnswer)){
        spanEl.textContent = 'Correct!';
    } else {
        //remove time for wrong answer
        spanEl.textContent = 'Wrong!'
        if (timeLeft > 10) {
            timeLeft-=10;
        } else if (timeLeft <= 10){
            timeLeft = 0;
        }
    }
    clearQuestion();
        // checks what question we're on
    questionNumber++;
    if (questionNumber < questions.length) {
        displayQuestion();
    } else if (questionNumber === questions.length) {
        endGame();
    }
    return;
}


function clearQuestion() {
    // from stackoverflow
    // the forEach method loops through all the elements given and it removes each element
    document.querySelectorAll('.answer-btn').forEach(e => e.remove())
}



function displayQuestion() {
    // display current question
    questionEl.textContent = questions[questionNumber].question;

    // displays possible answers
    for (let j=0; j < questions[questionNumber].possible.length; j++) {
        let newListItemEl = document.createElement('li');
        let newListBtnEl = document.createElement('button');
        let possibleAnswer = questions[questionNumber].possible[j];
        
        // creates elements for each question 
        newListBtnEl.textContent = j+1 + '. ' + possibleAnswer;
        newListBtnEl.classList.add('answer-btn')
        newListBtnEl.dataset.value = possibleAnswer;
        possibleAnswersEl.appendChild(newListItemEl);
        newListItemEl.appendChild(newListBtnEl);
    }
    // add event listener to check for answers
    possibleAnswersEl.addEventListener('click', checkAnswer);
    
}


// 3. create a start game function that starts a timer
function startGame(){
    // sets timer
    setTime();
    // gets starting prompt out of view
    startEl.setAttribute('style', 'display:none'); 
    questionsEl.setAttribute('style', 'display:flex');
    
    //loop through each question
    displayQuestion();
}



function endGame() {
    // stops showing question
    gameOver = true;
    score = timeLeft;
    questionsEl.setAttribute('style', 'display: none');
    formEl.setAttribute('style', 'display: flex');
    scoreEl.textContent = score;
    // when submitted, the user should see a list of highscores
    submitEl.addEventListener('click', function(event){
        event.preventDefault();
        let initials = nameEl.value;
        console.log(initials);
        localStorage.setItem('initials', initials);
        localStorage.setItem('score', score);

    })
}




//adds event listener for the start button
startBtnEl.addEventListener('click', startGame);
