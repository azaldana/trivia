// console.log('it works!');

var questions = [
    {
        q: 'Favorite color?',
        options: ['red', 'blue', 'green', 'black'],
        answer: 'black',

    },
    {
        q: 'Favorite something',
        options: ['wheels on the bus', 'hokipoki', 'redlight', 'green light'],
        answer: 'wheels on the bus',

    }
]


var $app = $('#app');
var correct = 0;
var incorrect = 0;
var questionIndex = 0;
var remainingTime;
var timer;

init();

function init(){
    var $start = $('<button>Start</button>');
    $start.on('click', showQuestion);
    $app.empty();
    $app.append($start);
    correct = 0;
    incorrect = 0;
    questionIndex = 0;
}



function displayClock(){
    remainingTime--;
    if (remainingTime === 0) {
        clearInterval(timer);
        showAnswer();
    }
    $('#clock').text(remainingTime);
}

function showQuestion(){
    remainingTime = 5;
    $app.empty();
    var question = questions[questionIndex];
    var $question = $('<div class="card">');
    var $clock = $('<div>Time Remaining: <span id="clock">' + remainingTime + '</span></div>');
    var $q = $('<h2>' + question.q + '</h2>');
    var $button;
    timer = setInterval(displayClock, 1000);

    $question.append($clock);
    $question.append($q);

    for (var i=0; i<question.options.length; i++){
        $button = $('<button>' + question.options[i] + '</button>');
        $button.on('click', handleAnswer);
        
        $question.append($button);
    
    }
   $app.append($question);
   
}

// console.log(showQuestion());


function handleAnswer(){
var value = $(this).text();
showAnswer(value);
}

function showAnswer(userAnswer){
    var question = questions[questionIndex];
    $app.empty();
    $app.append('<h2>Answer</h2>');
    $app.append('<h3>The Correct Answer is: ' + question.answer + '</h3>');
    $app.append('<h3>You Selected: ' + userAnswer + '</h3>');

    if (userAnswer === undefined) {
        $app.append('<h2>Time Out!</h2>');
        incorrect++;
    } else if (userAnswer === question.answer){
        correct++;
    } else {
        incorrect++;
    }
    
    questionIndex++;

    if (questionIndex < questions.length) {
        setTimeout(showQuestion, 5000);
    
    } else {
        setTimeout(showScore, 5000);
        
    }
    
}

function showScore (){
    $app.empty();
    var $score = $("<h2>Let's See How You Did:</h2>");
    $app.append($score);
    var correctAnswer = $('<p>Correct Answers: ' + correct + '</p>');
    var incorrectAnswer = $('<p>Incorrect Answers: ' + incorrect + '</p>');
    $app.append(correctAnswer, incorrectAnswer);
}