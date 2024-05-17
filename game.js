var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];

var keyPressed = false;
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  level++;
  $("#level-title").text("Level " + level);

  let timeout = 0;

  if (level === 1) {
    $("#" + randomChosenColor)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    playSound(randomChosenColor);
  } else {
    for (let color of gamePattern) {
      setTimeout(() => {
        $("#" + color)
          .fadeIn(100)
          .fadeOut(100)
          .fadeIn(100);
        playSound(color);
      }, (timeout += 500));
    }
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  keyPressed = false;
}

function checkAnswer(lastIndex) {
  if (gamePattern[lastIndex] === userClickedPattern[lastIndex]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key To Restart");
    playSound("wrong");
    startOver();

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
  }
}

// keyboard press
$(document).keypress(function () {
  if (!keyPressed) {
    nextSequence();
    keyPressed = true;
  }
});

// mouse click
$(".btn").click(function () {
  if (keyPressed) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }
});
