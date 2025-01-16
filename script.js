var runStart = 0;
function keyCheck(event) {
    if (event.which == 13) {
        if (runWorkerId == 0) {
            createBlockID = setInterval(createBlock, 100);
            moveBlockId = setInterval(moveBlocks, 100);
            runWorkerId = setInterval(run, 100);
            runStart = 1;
            runSound.play();
            backgroundWorkerId = setInterval(moveBackground, 100);
            scoreWorkerId = setInterval(updateScore, 100)
        }
    }

    if (event.which == 32) {
        if (runStart == 1) {
            if (jumpWorkerId == 0) {
                clearInterval(runWorkerId);
                runSound.pause();
                jumpWorkerId = setInterval(jump, 100);
                jumpSound.play();
            }
        }
    }
}

//create block
var blockMarginLeft = 600;
var blockId = 1;
var createBlockID = 0;


function createBlock() {
    var block = document.createElement("div");   //<div></div>
    block.className = "block";   //<div class="block"></div>

    block.id = "block" + blockId;
    blockId++;

    var gap = Math.random() * (1000 - 400) + 400;
    blockMarginLeft = blockMarginLeft + gap;

    block.style.marginLeft = blockMarginLeft + "px";
    document.getElementById("background").appendChild(block);
}

//Move Blocks

var moveBlockId = 0;
function moveBlocks() {
    for (var i = 1; i <= blockId; i++) {//blockId
        var currentBlock = document.getElementById("block" + i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        currentBlock.style.marginLeft = newMarginLeft + "px";
        // alert(newMarginLeft);
        if (newMarginLeft <= 48) {//48  (-31)
            if (newMarginLeft >= -31) {
                //alert(boyMarginTop);
                if (boyMarginTop <= 450) { //360-450
                    if (boyMarginTop >= 350) {
                        clearInterval(runWorkerId);
                        runSound.pause();
                        clearInterval(jumpWorkerId);
                        jumpWorkerId = -1;
                        clearInterval(backgroundWorkerId);
                        clearInterval(scoreWorkerId);
                        clearInterval(createBlockID);
                        clearInterval(moveBlockId);
                        deadWorkerId = setInterval(dead, 100);
                        deadSound.play();
                    }
                }
            }
        }
    }
}

// run sound
var runSound = new Audio("resources\audio\run.mp3");
runSound.loop = true;

//run function done
var boy = document.getElementById("boy");
var runImageNumber = 1;
var runWorkerId = 0;

function run() {
    runImageNumber++;
    if (runImageNumber == 11) {
        runImageNumber = 1;
    }
    boy.src = "resources\images\Run (" + runImageNumber + ").png";
}


var jumpSound = new Audio("resources/audio/jump.mp3");
//jump function done

var jumpImageNumber = 1;
var jumpWorkerId = 0;
var boyMarginTop = 450;

function jump() {
    jumpImageNumber++;
    if (jumpImageNumber <= 6) {
        boyMarginTop = boyMarginTop - 50;
        boy.style.marginTop = boyMarginTop + "px";
    }
    if (jumpImageNumber >= 7) {
        boyMarginTop = boyMarginTop + 50;
        boy.style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber == 11) {
        jumpImageNumber = 1;
        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;

        runWorkerId = setInterval(run, 100);
        runSound.play();
    }
    boy.src = "resources\images\Jump (" + jumpImageNumber + ").png"
}

//Background move done

var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWorkerId = 0;
function moveBackground() {
    backgroundX = backgroundX - 20;
    background.style.backgroundPositionX = backgroundX + "px";
}



var winSound = new Audio("resources\audio\won.wav");
// score update done

var score = document.getElementById("score");
var newScore = 1;
var scoreWorkerId = 0;
function updateScore() {
    newScore++;
    score.innerHTML = newScore;
    if (newScore==100){//500 ,100, ets.
        clearInterval(runWorkerId);
        runSound.pause();
        clearInterval(jumpWorkerId);
        jumpWorkerId = -1;
        clearInterval(backgroundWorkerId);
        clearInterval(scoreWorkerId);
        clearInterval(createBlockID);
        clearInterval(moveBlockId);

        document.getElementById("gameWon").style.visibility = "visible";

        runSound.pause();
        winSound.play();

    }
}


var deadSound = new Audio("resources\audio\dead.mp3");

//dead function done

var deadImageNumber = 1;
var deadWorkerId = 0;
function dead() {
    deadImageNumber++;
    if (deadImageNumber == 11) {
        deadImageNumber == 10;
        // clearInterval(deadWorkerId);
        //boy.style.marginTop = "450px";
        
        document.getElementById("gameOver").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newScore;
    }
    boy.src = "resources\images\Dead (" + deadImageNumber + ").png";
    boy.style.marginTop = "450px";
}

//function restart

function re() {
    location.reload();
}

//start game window

function startWindow(){
    document.getElementById("startGame").style.visibility = "hidden";
    document.getElementById("background").style.visibility = "visible";

}