/*
 * BC Learning Network (bclearningnetwork.com)
 * Image Labelling Game
 * @authors Colin Bernard and Brittany Miller
 */


var mute = false;
var FPS = 24;

var STAGE_WIDTH, STAGE_HEIGHT;

var questionCounter = 0; //used
var score;

var MAIN_PIC_WIDTH = 350;
var MAIN_PIC_HEIGHT = 350;

var gameStarted;


// text
var questionText;
var scoreText;
var num, denom;

var buttons = [];
var buttonsh = []; // hover buttons
var letters = ["a", "b", "c", "d", "e", "f", "g", "h"];


var tries = 0;






/*
 * Called by body onload
 */
function init() {
	STAGE_WIDTH = parseInt(document.getElementById("gameCanvas").getAttribute("width"));
	STAGE_HEIGHT = parseInt(document.getElementById("gameCanvas").getAttribute("height"));

	// init state object
	stage = new createjs.Stage("gameCanvas"); // canvas id is gameCanvas
	stage.mouseEventsEnabled = true;
	stage.enableMouseOver(50); // Default, checks the mouse 20 times/second for hovering cursor changes

	setupManifest(); // preloadJS
	startPreload();

	score = 0; // reset game score
	questionCounter = 0;
	levelCounter = 1;
	stage.update();
}

/*
 * Main game loop
 */
function update(event) {

	if (gameStarted) {

	}

	stage.update(event);
}



/*
 * Ends the game
 */
function endGame() {
	gameStarted = false;
	playSound("winsound");
	stage.addChild(fade);
	stage.addChild(gameOver);


	//playSound("timeout"); gonna be a diff sound maybe

	//display the score:
	scoreText = new createjs.Text('Score: ' + score + '/' + questions.length*number_of_buttons, '30px Arial', "black");
	scoreText.x = 170;
	scoreText.y = 271;
	stage.addChild(scoreText);

	playAgain.x = 155;
	playAgain.y = 400;

	playAgainHover.x = 155;
	playAgainHover.y = 400;

	stage.addChild(playAgain);
	initPlayAgain();

}


function updateScore(){

	num.text = score;



}

//copied from divis

function showRightSplash() {
	right.alpha = 1;
	stage.addChild(right);

	createjs.Tween.get(right).to({alpha:0}, 1000).call(function() {
		stage.removeChild(right);
	})
}

function showWrongSplash() {
	wrong.alpha = 1;
	stage.addChild(wrong);

	createjs.Tween.get(wrong).to({alpha:0}, 1000).call(function() {
		stage.removeChild(wrong);
	})
}

/*
 * Starts the game. Called by preloadJS loadComplete
 */
function startGame() {


	stage.addChild(fade);
	stage.addChild(instructions);
	startButtonHover.x = startButton.x = 150;
	startButtonHover.y = startButton.y = 420;
	startButtonHover.cursor = "pointer";

	stage.addChild(startButton);

	startButton.on("mouseover", function(){
		stage.removeChild(startButton);
		stage.addChild(startButtonHover);

	});

	startButtonHover.on("mouseout", function(){
		stage.addChild(startButton);
		stage.removeChild(startButtonHover);
	});

	startButtonHover.on("mousedown", function(){
		playSound("click");
		startButton.visible = false;
		startButtonHover.visible = false;
		stage.removeChild(startButton);
		stage.removeChild(startButtonHover);
		stage.removeChild(instructions);
		stage.removeChild(fade);


		num = new createjs.Text('0', '30px Arial', "black");
		denom = new createjs.Text(number_of_buttons*questions.length + '', '30px Arial', "black");

		num.x = denom.x = 455;
		num.y = 192;
		denom.y = 230;

		stage.addChild(num); stage.addChild(denom);
		gameStarted = true;
	});






}

/*
 * Updates and renders question and option text
 */
function nextQuestion() {

	if (gameStarted) {
		questionCounter++;
		updateScore();
		if (questionCounter == questions.length) {
			endGame();
		} else {


			questionText.text = questions[questionCounter].question;


		}
	}
}

/*
 * Loads and positions graphics
 */
function initGraphics() {
	stage.addChild(background);
	initMuteUnMuteButtons(); 

	//main image to label
	mainPic.scaleX = MAIN_PIC_WIDTH / mainPic.image.width;
	mainPic.scaleY = MAIN_PIC_HEIGHT / mainPic.image.height;
	mainPic.x = 30;
	mainPic.y = 145;
	stage.addChild(mainPic);

	// draw buttons
	for (var i = 0; i < number_of_buttons; i++) {
		buttons[i].x = buttonsh[i].x = 15 + 65*i;
		buttons[i].y = buttonsh[i].y = 535;
		buttonsh[i].cursor = "pointer";
		buttons[i].id = buttonsh[i].id = i;
		stage.addChild(buttons[i]);
	}

	initButtonListeners();

	questionText = new createjs.Text(questions[questionCounter].question, '25px Arial', "black");
	questionText.x = 155;
	questionText.y = 91;
	stage.addChild(questionText);

	right.x = wrong.x = 20;
	right.y = wrong.y = 100;


}


//Event listeners for the play again button

function initPlayAgain() {

	playAgainHover.cursor = "pointer";

	playAgain.on("mouseover", function(){
		stage.removeChild(playAgain);
		stage.addChild(playAgainHover);
	});

	playAgainHover.on("mouseout", function(){
		stage.removeChild(playAgainHover);
		stage.addChild(playAgain);

	});

	playAgainHover.on("mousedown", function(){
		playSound("click");
		location.reload();
	});

}

//Event Listeners for the letter buttons

function initButtonListeners() {

	for (var i = 0; i < number_of_buttons; i++) {

		buttons[i].on("mouseover", function(event) {
			if (gameStarted) {
				stage.addChild(buttonsh[event.target.id]);
				stage.removeChild(buttons[event.target.id]);
			}
		});

		buttonsh[i].on("mouseout", function(event) {
			if (gameStarted) {
				stage.addChild(buttons[event.target.id]);
				stage.removeChild(buttonsh[event.target.id]);
			}
		});

		buttonsh[i].on("mousedown", function(event) {
			if (gameStarted) {
				playSound("click");
				checkAnswer(letters[event.target.id]);

			}
		});
	}
}


//Checks if an answer is right

function checkAnswer(letter){
	letterString = new String(letter);
	q = questions[questionCounter].question;
	ans = new String(questions[questionCounter].answer);
	ans = ans.toLowerCase().trim(); //Just in case user inputs answer key as caps / with white space

	if(letterString.valueOf() === ans.valueOf()){
		score = score + (number_of_buttons - tries);
		tries = 0;
		playSound("correctSound");
		showRightSplash();
		resetButtons();
		nextQuestion();
	} else if (tries < number_of_buttons) {
		tries++;
		playSound("wrongSound");
		showWrongSplash();
		disableButton(letterString);
	} else {
		playSound("wrongSound");
		showWrongSplash();
	}
}

//Resets the buttons back to visible after a successful answer.
function resetButtons(){

	for (var i = 0; i < number_of_buttons; i++) {
		buttons[i].visible = true;
		buttonsh[i].visible = true;
	}
}




function disableButton(letter){

	var index = letters.indexOf(letter[0]);
	buttons[index].visible = false;
	buttonsh[index].visible = false;
}

/*
 * Adds the mute and unmute buttons to the stage and defines listeners
 */
function initMuteUnMuteButtons() {
	var hitArea = new createjs.Shape();
	hitArea.graphics.beginFill("#000").drawRect(0, 0, muteButton.image.width, muteButton.image.height);
	muteButton.hitArea = unmuteButton.hitArea = hitArea;

	muteButton.x = unmuteButton.x = 465;
	muteButton.y = unmuteButton.y = 400;

	muteButton.on("click", toggleMute);
	unmuteButton.on("click", toggleMute);

	stage.addChild(muteButton);
}


////////////////////////////////////////////////// PRE LOAD JS FUNCTIONS

// bitmap variables
var background;
var mainPic;
var gameOver;
var playAgain;
var playAgainHover;
var fade;
var muteButton, unmuteButton;
var startButton, startButtonHover, instructions;
var right, wrong;

function setupManifest() {
	manifest = [
		{
			src: "sounds/click.mp3",
			id: "click"
		},
		{
			src: "images/mute.png",
			id: "mute"
		},
		{
			src: "images/unmute.png",
			id: "unmute"
		},
		{
			src: "images/wide_bg.png",
			id: "background"
		},
		{
			src: "images/button_A.png",
			id: "aButton"
		},
		{
			src: "images/button_Ah.png",
			id: "aButtonHover"
		},
		{
			src: "images/button_B.png",
			id: "bButton"
		},
		{
			src: "images/button_Bh.png",
			id: "bButtonHover"
		},
		{
			src: "images/button_C.png",
			id: "cButton"
		},
		{
			src: "images/button_Ch.png",
			id: "cButtonHover"
		},
		{
			src: "images/button_D.png",
			id: "dButton"
		},
		{
			src: "images/button_Dh.png",
			id: "dButtonHover"
		},
		{
			src: "images/button_E.png",
			id: "eButton"
		},
		{
			src: "images/button_Eh.png",
			id: "eButtonHover"
		},
		{
			src: "images/button_G.png",
			id: "eButton"
		},
		{
			src: "images/button_Gh.png",
			id: "eButtonHover"
		},
		{
			src: "images/button_F.png",
			id: "fButton"
		},
		{
			src: "images/button_Fh.png",
			id: "fButtonHover"
		},
		{
			src: "images/button_H.png",
			id: "eButton"
		},
		{
			src: "images/button_Hh.png",
			id: "eButtonHover"
		},
		{
			src: "versions/"+ version +"/mainpic.jpg",
			id: "mainpic"
		},
		{
			src: "sounds/correct.wav",
			id: "correctSound"
		},
		{
			src: "sounds/wrong.wav",
			id: "wrongSound"
		},
		{
			src: "images/black.png",
			id: "fade"
		},
		{
			src: "images/game_over.png",
			id: "gameOver"
		},
		{
			src: "images/play_again.png",
			id: "playAgain"
		},
		{
			src: "images/play_againH.png",
			id: "playAgainHover"
		},
		{
			src: "images/instructions.png",
			id: "instructions"
		},
		{
			src: "images/startButton.png",
			id: "start"
		},
		{
			src: "images/startButtonHover.png",
			id: "startHover"
		},
		{
			src: "images/right.png",
			id: "right"
		},
		{
			src: "images/wrong.png",
			id: "wrong"
		},
		{
			src: "sounds/win.mp3",
			id: "winsound"
		}
	];
}

function startPreload() {
	preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);
    preload.on("fileload", handleFileLoad);
    preload.on("progress", handleFileProgress);
    preload.on("complete", loadComplete);
    preload.on("error", loadError);
    preload.loadManifest(manifest);
}

function handleFileLoad(event) {
	console.log("A file has loaded of type: " + event.item.type);
  // create bitmaps of images
 	if (event.item.id == "mute") {
 		muteButton = new createjs.Bitmap(event.result);
 	} else if (event.item.id == "unmute") {
 		unmuteButton = new createjs.Bitmap(event.result);
 	} else if (event.item.id == "background") {
 		background = new createjs.Bitmap(event.result);
 	} else if (event.item.id == "mainpic") {
 		mainPic = new createjs.Bitmap(event.result);
 	}  else if (event.item.id == "fade") {
 		fade = new createjs.Bitmap(event.result);
	} else if (event.item.id == "gameOver") {
   		gameOver = new createjs.Bitmap(event.result);
	}  else if (event.item.id == "playAgain") {
   		playAgain = new createjs.Bitmap(event.result);
	}  else if (event.item.id == "playAgainHover") {
   		playAgainHover = new createjs.Bitmap(event.result);
	} else if (event.item.id == "instructions") {
   		instructions = new createjs.Bitmap(event.result);
	} else if (event.item.id == "startHover") {
   		startButtonHover = new createjs.Bitmap(event.result);
	} else if (event.item.id == "start") {
   		startButton = new createjs.Bitmap(event.result);
	} else if (event.item.id.includes("ButtonHover")) {
		buttonsh.push(new createjs.Bitmap(event.result));
	} else if (event.item.id.includes("Button")) {
		buttons.push(new createjs.Bitmap(event.result));
	} else if (event.item.id == "right") {
   		right = new createjs.Bitmap(event.result);
	} else if (event.item.id == "wrong") {
   		wrong = new createjs.Bitmap(event.result);
	} 
}

function loadError(evt) {
    console.log("Error!",evt.text);
}

// not currently used as load time is short
function handleFileProgress(event) {

}

/*
 * Displays the start screen.
 */
function loadComplete(event) {
  console.log("Finished Loading Assets");

  // ticker calls update function, set the FPS
	createjs.Ticker.setFPS(FPS);
	createjs.Ticker.addEventListener("tick", update); // call update function

	initGraphics();
  stage.update();
  startGame();
}

///////////////////////////////////// END PRELOADJS FUNCTIONS
