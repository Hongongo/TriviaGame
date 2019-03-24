function Question (question, a1, a2, a3, a4, correctAnswer) {
  this.question      = question;
  this.a1            = a1;
  this.a2            = a2;
  this.a3            = a3;
  this.a4            = a4;
  this.correctAnswer = correctAnswer;
}

Question.prototype.checkAnswer = function(userAnswer) {
  if(userAnswer===this.correctAnswer) {
    console.log("Correct");
    return true;
  } else {
    console.log("Incorrect");
    return false;
  }
};

var questions = [
    new Question(
      "Who invented the Flaming Moe?",
      "Moe, duh!",
      "Homer",
      "Barney",
      "Carl",
      "a2"),
    new Question(
      "Who was the president of the US BEFORE lisa took office?",
      "Fat Tony",
      "Arnold Schwarzenegger",
      "Montgomery Burns",
      "Donald Trump",
      "a4"),
    new Question(
      "Whats the name of Lisa´s substitute teacher?",
      "Mr. Crabapple",
      "Mr. Bergstrom",
      "Mr. Hoover",
      "Mr. Crowley",
      "a2"),
    new Question(
      "Where do all the &quot;smucks&quot; work?",
      "At the Factory Box",
      "In Shelbyville",
      "At the glue factory",
      "On Krusty's program",
      "a1"),
    new Question(
      "Why are the politicians holding hands in the &quot;Tree House of Horror VII&quot;",
      "They're a couple",
      "It's a call for world peace",
      "They lost a bet",
      "They're merely exchanging long protein strings",
      "a4")
];

var questionCounter = 0;
var questionTimer;
var answerTimer;
var questionDuration = 10;
var answerDuration = 3;
var correct = 0;
var incorrect = 0;
var unanswered = 0;

/**
 * FUNCTIONS
 */
function startGame() {
  var startButton = $("<button>");
  $(startButton).addClass(".start");
  $(startButton).html("UP AND ATOM!");
  $(".stage").html("<h2>SIMPSON FAN?</h2> <p>LETS SEE HOW MUCH YOU KNOW ABOUT SIMPSONS </p>");
  $(".stage").append(startButton);

  $(startButton).click(function(){
    askQuestion();
  });
}

function reset() {
  questionCounter = 0;
  correct = 0;
  incorrect = 0;
  unanswered = 0;
  clearTimeout(answerTimer);
  clearInterval(questionTimer);
  startGame();
}

function startQuestionTimer(t, q) {
  questionTimer = setInterval(function(){
    if (t <= 0) {
      renderWrong(q, true);
      return;
    } else {
      $("h4.timer span").text(t);
      t--;
    }
  }, 1000);
}

function startAnswerTimer(){
  console.log(answerDuration);
  answerTimer = setTimeout(function(){
    askQuestion();
  },answerDuration*1000);
}

function renderGameOver() {
  var output = "<h2>These are the results</h2>";
  output += "<table><tbody><tr><td class='left'>";
  output += "Correct:</td><td class='left'>  "+correct+"</td></tr><tr><td class='left'>";
  output += "Incorrect:</td><td class='left'>  "+incorrect+"</td></tr><tr><td class='left'>";
  output += "Unanswered:</td><td class='left'>  "+unanswered+"</td></tr></tbody></table>";
  output += "<button class='reset'>Go again</button>";
  $(".stage").html(output);
  $(".reset").click(function(){
    reset();
  });
}

function askQuestion() {
  $(".stage").empty();
  clearTimeout(answerTimer);
  if(questionCounter < questions.length) {
    var q = questions[questionCounter];
    var currentQuestion = new Question(q);
    var output = "<h4 class='timer'> Time remaining: <span>"+questionDuration+"</span></h4>";
    output += "<h3>"+q.question+"</h3>";
    output += "<ul class='answers'>";
    output += "<li id='a1'>"+q.a1+"</li>";
    output += "<li id='a2'>"+q.a2+"</li>";
    output += "<li id='a3'>"+q.a3+"</li>";
    output += "<li id='a4'>"+q.a4+"</li>";
    output += "</ul>";
    $(".stage").html(output);
    startQuestionTimer(questionDuration, q);
    questionCounter++;

    $("li").click(function(){
      $(this).addClass('selected');
      if(q.checkAnswer($(this).attr("id"))) {
        renderCorrect(q);
      } else {
        renderWrong(q);
      }
    });
  } else {
    renderGameOver();
}
}

function renderCorrect(q) {
  correct++;
  clearInterval(questionTimer);
  startAnswerTimer();
  var output = "<h3>UP AND ATOM!</h3>";
  output += "<img src='./assets/images/win"+questionCounter+".png'>";
  $(".stage").html(output);
}

function renderWrong(q, ranOutofTime) {
  clearInterval(questionTimer);
  startAnswerTimer();
  var correct = q[q.correctAnswer];
  var output;
  if (ranOutofTime === true) {
    output = "<h3>TIME OUT</h3>";
    unanswered++;
  } else {
    output = "<h3>INCORRECT</h3>";
    incorrect++;
  }
  output += "<h4 class='correction'>The correct answer was "+correct+".</h4>";
  output += "<img src='./assets/images/fail.png'>";
  $(".stage").html(output);
}

$(document).ready(function(){
  startGame();
});
