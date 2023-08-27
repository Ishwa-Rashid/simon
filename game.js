var colors =  ["green","red","yellow","blue"]
var gameSequence = [];
var userClickedPattern = [];
var gameStart = false
var levelNo= 0;
$(document).keypress(function(){
    if(gameStart == false){
        nextSequence();
        gameStart = true;
    }
});

$(".btn").click(function(){
    // which button
    var buttonColor = $(this).attr("id");
    // pressed animation 
    pressedAnimation(buttonColor)
    // play sound
    playSound(buttonColor);
    // store button
    userClickedPattern.push(buttonColor);
    // match button
    checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currentLevel){
    if(gameSequence[currentLevel] === userClickedPattern[currentLevel]){
        if(gameSequence.length === userClickedPattern.length){
            setTimeout(function(){
                // new sequence
                nextSequence();
                
            },1000);    
        }
    }
    else{
        // game over
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    levelNo++;
    $("#level-title").text("Level " + levelNo)
    var num = Math.floor(Math.random()*4);
    newColor = colors[num];
    gameSequence.push(newColor);
    // animation
    $("#" + newColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // play sound
    playSound(newColor);
}

function startOver(){
    levelNo = 0 ;
    gameSequence = [];
    gameStart = false;
}

function pressedAnimation(btn){

    $("#" + btn).addClass("pressed");
    setTimeout(function(){
        $("#" + btn).removeClass("pressed");
    },100);
}

function playSound(btn){
    var audio = new Audio("sounds/"+ btn + ".mp3");
    audio.play();
}
