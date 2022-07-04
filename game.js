var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence(){

    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;
    $("h1").text("Level " + level);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern)
    // var audio2 = new Audio("sounds/" + userChosenColour + ".mp3");
    // audio2.play();
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

$(document).keydown(function(){
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }
    else{
        var audio3 = new Audio("sounds/wrong.mp3");
        audio3.play();
        $("h1").text("Game over, Press any key to restart !")
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },400);
        console.log("fail");
        startOver();
    }
        
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}






