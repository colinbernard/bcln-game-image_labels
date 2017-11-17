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
	scoreText = new createjs.Text('Score: ' + score + '/' + questions.length*6, '30px Arial', "black");
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
		gameStarted = true;
	});






}

/*
 * Updates and renders question and option text
 */
function nextQuestion() {

	if (gameStarted) {
		questionCounter++;

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

	//draw buttons
	a.x = 30;
	a.y = 530;
	stage.addChild(a);

	b.x = 30 + 60;
	b.y = 530;
	stage.addChild(b);

	c.x = 30 + 60*2;
	c.y = 530;
	stage.addChild(c);

	d.x = 30 + 60*3;
	d.y = 530;
	stage.addChild(d);

	e.x = 30 + 60*4;
	e.y = 530;
	stage.addChild(e);

	f.x = 30 + 60*5;
	f.y = 530;
	stage.addChild(f);


	//hover buttons

	ah.x = 30;
	ah.y = 530;
	ah.cursor = "pointer";

	bh.x = 30 + 60;
	bh.y = 530;
	bh.cursor = "pointer";

	ch.x = 30 + 60*2;
	ch.y = 530;
	ch.cursor = "pointer";

	dh.x = 30 + 60*3;
	dh.y = 530;
	dh.cursor = "pointer";

	eh.x = 30 + 60*4;
	eh.y = 530;
	eh.cursor = "pointer";

	fh.x = 30 + 60*5;
	fh.y = 530;
	fh.cursor = "pointer";

	initButtonListeners();

	questionText = new createjs.Text(questions[questionCounter].question, '25px Arial', "black");
	questionText.x = 145;
	questionText.y = 91;
	stage.addChild(questionText);

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
	a.on("mouseover", function() {
		if (gameStarted) {
			stage.addChild(ah);
			stage.removeChild(a);
		}
	});

	ah.on("mouseout", function() {
		if (gameStarted) {
			stage.addChild(a);
			stage.removeChild(ah);
		}
	});


	ah.on("mousedown", function() {
		if (gameStarted) {
			playSound("click");
			checkAnswer("a");

		}
	});


	b.on("mouseover", function() {
		if (gameStarted) {
			stage.addChild(bh);
			stage.removeChild(b);
		}
	});

	bh.on("mouseout", function() {
		if (gameStarted) {
			stage.addChild(b);
			stage.removeChild(bh);
		}
	});

	bh.on("mousedown", function() {
		if (gameStarted) {
			playSound("click");
			checkAnswer("b");

		}
	});


	c.on("mouseover", function() {
		if (gameStarted) {
			stage.addChild(ch);
			stage.removeChild(c);
		}
	});

	ch.on("mouseout", function() {
		if (gameStarted) {
			stage.addChild(c);
			stage.removeChild(ch);
		}
	});

	ch.on("mousedown", function() {
		if (gameStarted) {
			playSound("click");
			checkAnswer("c");

		}
	});


	d.on("mouseover", function() {
		if (gameStarted) {
			stage.addChild(dh);
			stage.removeChild(d);
		}
	});

	dh.on("mouseout", function() {
		if (gameStarted) {
			stage.addChild(d);
			stage.removeChild(dh);
		}
	});

	dh.on("mousedown", function() {
		if (gameStarted) {
			playSound("click");
			checkAnswer("d");

		}
	});

	e.on("mouseover", function() {
		if (gameStarted) {
			stage.addChild(eh);
			stage.removeChild(e);
		}
	});

	eh.on("mouseout", function() {
		if (gameStarted) {
			stage.addChild(e);
			stage.removeChild(eh);
		}
	});

	eh.on("mousedown", function() {
		if (gameStarted) {
			playSound("click");
			checkAnswer("e");

		}
	});


	f.on("mouseover", function() {
		if (gameStarted) {
			stage.addChild(fh);
			stage.removeChild(f);
		}
	});

	fh.on("mouseout", function() {
		if (gameStarted) {
			stage.addChild(f);
			stage.removeChild(fh);
		}
	});


	fh.on("mousedown", function() {
		if (gameStarted) {
			playSound("click");
			checkAnswer("f");

		}
	});
}


//Checks if an answer is right

function checkAnswer(letter){
	letterString = new String(letter);
	q = questions[questionCounter].question;
	ans = new String(questions[questionCounter].answer);
	ans = ans.toLowerCase().trim(); //Just in case user inputs answer key as caps / with white space

	if(letterString.valueOf() === ans.valueOf()){
		score = score + (6 - tries);
		tries = 0;
		playSound("correctSound");
		resetButtons();
		nextQuestion();
	} else if (tries < 5) {
		tries++;
		playSound("wrongSound");
		disableButton(letterString);
	} else {
		playSound("wrongSound");
	}

//Resets the buttons back to visible after a successful answer.

function resetButtons(){
	a.visible = true;
	ah.visible = true;
	b.visible = true;
	bh.visible = true;
	c.visible = true;
	ch.visible = true;
	d.visible = true;
	dh.visible = true;
	e.visible = true;
	eh.visible = true;
	f.visible = true;
	fh.visible = true;
}


}

function disableButton(letter){
	letterString = new String(letter);
	if (letterString.valueOf() === "a"){
		a.visible = false;
		ah.visible = false;
	} else if (letterString.valueOf() === "b"){
		b.visible = false;
		bh.visible = false;
	} else if (letterString.valueOf() === "c"){
		c.visible = false;
		ch.visible = false;
	} else if (letterString.valueOf() === "d"){
		d.visible = false;
		dh.visible = false;
	} else if (letterString.valueOf() === "e"){
		e.visible = false;
		eh.visible = false;
	} else if (letterString.valueOf() === "f"){
		f.visible = false;
		fh.visible = false;
	}
}

/*
 * Adds the mute and unmute buttons to the stage and defines listeners
 */
function initMuteUnMuteButtons() {
	var hitArea = new createjs.Shape();
	hitArea.graphics.beginFill("#000").drawRect(0, 0, muteButton.image.width, muteButton.image.height);
	muteButton.hitArea = unmuteButton.hitArea = hitArea;

	muteButton.x = unmuteButton.x = 430;
	muteButton.y = unmuteButton.y = 535;

	muteButton.on("click", toggleMute);
	unmuteButton.on("click", toggleMute);

	stage.addChild(muteButton);
}


////////////////////////////////////////////////// PRE LOAD JS FUNCTIONS

// bitmap variables
var a, b, c, d, e, f;
var ah, bh, ch, dh, eh, fh;
var background;
var mainPic;
var gameOver;
var playAgain;
var playAgainHover;
var fade;
var muteButton, unmuteButton;
var startButton, startButtonHover, instructions;

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
			src: "images/BG.png",
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
			src: "images/button_F.png",
			id: "fButton"
		},
		{
			src: "images/button_Fh.png",
			id: "fButtonHover"
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
			id: "startButton"
		},
		{
			src: "images/startButtonHover.png",
			id: "startButtonHover"
		},
		{
			src: "sounds/win.mp3",
			id: "winsound"
		},
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
   	} else if (event.item.id == "aButton") {
   		a = new createjs.Bitmap(event.result);
   	} else if (event.item.id == "aButtonHover") {
   		ah = new createjs.Bitmap(event.result);
   	} else if (event.item.id == "bButton") {
   		b = new createjs.Bitmap(event.result);
   	} else if (event.item.id == "bButtonHover") {
   		bh = new createjs.Bitmap(event.result);
   	} else if (event.item.id == "cButton") {
   		c = new createjs.Bitmap(event.result);
   	} else if (event.item.id == "cButtonHover") {
   		ch = new createjs.Bitmap(event.result);
   	} else if (event.item.id == "dButton") {
   		d = new createjs.Bitmap(event.result);
   	} else if (event.item.id == "dButtonHover") {
   		dh = new createjs.Bitmap(event.result);
   	} else if (event.item.id == "eButton") {
   		e = new createjs.Bitmap(event.result);
   	} else if (event.item.id == "eButtonHover") {
   		eh = new createjs.Bitmap(event.result);
   	} else if (event.item.id == "fButton") {
   		f = new createjs.Bitmap(event.result);
   	} else if (event.item.id == "fButtonHover") {
   		fh = new createjs.Bitmap(event.result);
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
	} else if (event.item.id == "startButtonHover") {
   		startButtonHover = new createjs.Bitmap(event.result);
	} else if (event.item.id == "startButton") {
   		startButton = new createjs.Bitmap(event.result);
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
