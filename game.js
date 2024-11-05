// alert("Hello");
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];
var level=0;                                                                                                                                                                
function nextSequence(){
    userClickedPattern=[];
    var randomNumber=Math.random();
    randomNumber*=4;
    randomNumber=Math.floor(randomNumber);  //random number between 0 and 3
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
    level+=1;
    $('h1').text("Level " + level);
}
$(".btn").on("click",function(){
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    // var audio =new Audio('sounds/' + userChosenColour + '.mp3');
    // audio.play();
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
function playsound(color){
    var audio =new Audio( color + '.mp3');
    audio.play();
}
function animatePress(color){
    $("." + color).addClass("pressed");
    setTimeout(function(){
        $("." + color).removeClass("pressed");
    },100);
}
$('body').keypress(function(){
    if(level===0){
         $('h1').text("Level " + level);
        nextSequence();
    }
    
})
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            },1000)
        }
    }
    else{
        var audioWr =new Audio('wrong.mp3');
        audioWr.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $('h1').text("Game Over! Press any key to start");
        level=0;
        gamePattern=[];
    }
}