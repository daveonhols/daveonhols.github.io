
// the buttons should be enabled on start up -->
$(".button-level").attr('disabled', false);

// set some game state variables -->
var rounds=10; // user gets ten rounds to play
var red=0; // will store index of image which is currently red on each round
var multiplier=0; // score multiplier, higher for harder levels.
var active_multiplier=0; // track how the multiplier multiplies up further each time you get a guess right
var score=0; // current score
var delay=0; // the number of milliseconds to wait for the user to try and click red
var timer; // keep track of the timer so we can switch it off if the user clicked in time.

//-- function called when the user ran out of time -->
function timeout(){
	score-=10; // lose some points
	shuffle(); // choose a new place to put the red image
	update_score(); // update the score text
}

function shuffle(){	
	rounds-=1; // count down one round finished
	if(0==rounds){
		end(); // if we finished the final round, game over.
	}
	else{
		// actual shuffle logic
		// first of all we set all images blue, based on shared class ".click-img"
		$(".click-img").attr('src', "blue.png");
		red = "image"+Math.floor((Math.random() * 4) + 1); // this will pick a random number from 1 to 4
		$("#"+red).attr('src', "red.png"); // set the name of the image we will set red, based on "image" + <random number>
		timer=setTimeout(function(){timeout()}, delay); // reset the timer so the user has another X milliseconds to click
	}
}

// on game finished, set everything grey, then pop up user score
// press F5 to pay again.
function end(){
	$(".click-img").attr('src', "grey.png");
	alert('Game Over.  You scored:'+score);
	
}

// write html content of the score text by it's ID
function update_score(){
	$("#score").html("Score: "+score);
}

// handle the event when a user clicks an image
function img_clicked(which){
	clearTimeout(timer); // stop the timer, the user clicked in time.
	clicked=which.attr('id'); // find the id of the clicked image, will be "imageN"
	if (clicked==red){
		// if the user clicked the one which is red
		// increase the score
		score+=active_multiplier*10;
		// increase the multiplier!
		// very high scores are possible!!!
		active_multiplier+=active_multiplier;
	}
	else {
		// if the user pressed the wrong (blue not red) image
		// reduce their score
		score-=active_multiplier*5;
		// reset the multiplier to the base value for this difficulty level
		active_multiplier=multiplier;
	}
	update_score(); // show updated (higher or lower) score
	shuffle(); // reshulf and go for next round
}

// Clicking the level button will start the game in one of Easy, Medium or Hard mode.
// set the multiplier, timeout delay etc based on level
$(".button-level").click(function(){
	var button_id = $(this).attr('id');
	$(".button-level").attr('disabled', true);
	
	$(".click-img").click(function(){
		img_clicked($(this));
	})
	
	if (button_id=="Easy"){
		multiplier=2; // params for Easy mode
		delay=1500;
	}
	if (button_id=="Medium"){
		multiplier=5; // params for Medium mode
		delay=900;
	}	
	if (button_id=="Hard"){
		multiplier=10; // params for Hard mode
		delay=400;	// it's really hard!!!
		// good luck if you pressed this one you are crazy!!!
	}			
	shuffle(); // first shuffle at start
	active_multiplier=multiplier; // initisalise active multiplier
});
