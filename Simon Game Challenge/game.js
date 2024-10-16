var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = true;

function nextSequence(){
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $('#'+randomChosenColor).fadeOut(300).fadeIn(300); 
    
    playSound(randomChosenColor);
    animatePress(randomChosenColor);

    level += 1;

    $("#level-title").text("Level "+ level);
    console.log(gamePattern);
}

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);

    console.log(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $('#'+currentColour).addClass("pressed");

    setTimeout(() => {
        $('#'+currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function(event){
    if(event.key == "a" && started == true){
        nextSequence();
        started = false;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    }else{
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title ").text("Game Over, Press Any Key to Restart");
        console.log("Wrong");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = true;

    $(document).keypress(function(event){
        if(event.key != "a" && started == true){
            nextSequence();
            started = false;
        }
    });


}