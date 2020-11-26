
// var deck=[];
var deck = {card:[],result:[]};
var winner = "Dealer";

$(document).ready(function(){


var cardSkin = ["Hearts","Diamonds","Spades","Clubs"];
var cardNumbers = ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten"];
var number=0; /*create results*/



// ----------create card array------------------------
for(var x=0; x<cardSkin.length; x++){
	for(var y=0; y<cardNumbers.length; y++){
		deck.card.push(cardNumbers[y] +" of "+ cardSkin[x]);
// ----------create result array---------------
		number = y+1;
		if (number>10){     /*if you put JACK QUEEN KING the result will be 10*/
			number=10;     
		}
		deck.result.push(number);
	}
} 
/*-----------------deck created-----------------------*/
console.log(deck);

// --------------------------END DECK----------------------------------------------

// functions-----------------------------------------------------------------
function enableDealerArea(){
	$(".dealerArea").css('background-color','');
	$("#buttonCardDealer").prop('disabled',false);
}

function enablePlayerArea(){
	$(".playerArea").css('background-color','');
	$("#buttonCardPlayer").prop('disabled',false);
}

function disabledDealerArea(){
$(".dealerArea").css('background-color','#750404c4');
$("#buttonCardDealer").prop('disabled',true);
$("#buttonStopDealer").prop('disabled',true);
$("#buttonStopPlayer").prop('disabled',true);
}


function disabledPlayerArea(){
$(".playerArea").css('background-color','#750404c4');
$("#buttonCardPlayer").prop('disabled',true);
$("#buttonStopPlayer").prop('disabled',true);
$("#buttonStopDealer").prop('disabled',true);
}
// STOP DEALER
function stopButtonDealer(){
	if (winner == "Player") {
		disabledDealerArea();
	}else{
		disabledDealerArea();
		enablePlayerArea()
	}
	var closedCard = "images/closedCard.png";
	$("#imageCardDealer").attr("src",closedCard);
	console.log("Dealer"+holdNameDealer+"::::stop---------------result:"+createResultDealer);
	findTheWinner();
}
// STOP PLAYER
function stopButtonPlayer(){
	if (winner == "Player") {
		disabledPlayerArea();
		enableDealerArea()
	}else{
		disabledPlayerArea();
	}
	var closedCard = "images/closedCard.png";
	$("#imageCardPlayer").attr("src",closedCard);
	console.log("Player"+holdNamePlayer+"::::stop---------------result:"+createResultPlayer);
	findTheWinner();
}
// =21  >21  BLOCK GAME
function blockGame(){
	if (createResultDealer == 21 || createResultDealer > 21){
		disabledDealerArea();
		disabledPlayerArea();
		findTheWinner();

	}else if (createResultPlayer == 21 || createResultPlayer > 21){
		disabledDealerArea();
		disabledPlayerArea();
		findTheWinner();
	
	}
}

// LEFT PLAYER
function cardDealerPlay(){
	var setCard = Math.floor(Math.random() * deck.card.length); /*[grab an array seat]*/
	// ---get card
	var getCard = deck.card[setCard];
	$("#describeCardDealer").html(getCard);
	console.log("Dealer:"+holdNameDealer+":::"+getCard);
	// ---get outcome
	getOutcomeDealer = deck.result[setCard];
	if (getOutcomeDealer == 1){
		 getOutcomeDealer = 11;
	}
	createResultDealer = createResultDealer + getOutcomeDealer;
	$("#outcomeDealer").html(createResultDealer);
	console.log("Dealer"+holdNameDealer+"     "+createResultDealer);
	// ---get image
	var getImage = "images/"+getCard+".png";
	$("#imageCardDealer").attr("src",getImage);
	// ---enable stop button
	$("#buttonStopDealer").prop('disabled',false);
	// ---21
	blockGame();
}

// RIGHT PLAYER
function cardPlayerPlay(){
	var setCard = Math.floor(Math.random() * deck.card.length); /*[grab an array seat]*/
	// ---disable dealerArea
	disabledDealerArea();
	// ---get card
	var getCard = deck.card[setCard];
	$("#describeCardPlayer").html(getCard);
	console.log("Player:"+holdNamePlayer+":::"+getCard);
	// ---get outcome
	getOutcomePlayer = deck.result[setCard];
	if (getOutcomePlayer == 1){
		getOutcomePlayer = 11;
	}
	createResultPlayer = createResultPlayer + getOutcomePlayer;
	$("#outcomePlayer").html(createResultPlayer);
	console.log("Player"+holdNamePlayer+"     "+createResultPlayer);
	// ---get image
	var getImage = "images/"+getCard+".png";
	$("#imageCardPlayer").attr("src",getImage); 
	// ---enable stop button
	$("#buttonStopPlayer").prop('disabled',false);
	// ---21
	blockGame();

}


// FIND THE WINNER 
function findTheWinner(){
	if ((createResultDealer > createResultPlayer) && (createResultPlayer != 0) && (createResultDealer <= 20)){
		$(".nextRoundButton").show();
		$(".findTheWinner").html(holdNameDealer+ " WINS!!!");
		if (winner == "Player"){
			$(".newDealer").html(holdNameDealer + " is the new Dealer");
		}else if (winner == "Dealer"){
			$(".newDealer").html(holdNameDealer + " remains the Dealer");
		}
		console.log(holdNameDealer+":::WINS!!!!!!");
	}else if ((createResultPlayer > createResultDealer) && (createResultDealer != 0) && (createResultPlayer <= 20)){
		$(".nextRoundButton").show();
		$(".findTheWinner").html(holdNamePlayer+" WINS!!!");
		if (winner == "Dealer"){
			$(".newDealer").html(holdNamePlayer + " is the new Dealer");
		} else if (winner == "Player"){
			$(".newDealer").html(holdNamePlayer + " remains the Dealer");
		}
		console.log(holdNamePlayer+":::WINS!!!!!!");
	}else if (createResultDealer == createResultPlayer){
		$(".nextRoundButton").show();
		if (winner == "Dealer"){
			$(".findTheWinner").html(holdNameDealer+" WINS IN DRAW AS DEALER!");
			$(".newDealer").html(holdNameDealer + " remains the Dealer");
		}else if (winner == "Player"){
			$(".findTheWinner").html(holdNamePlayer +" WINS IN DRAW AS DEALER!");
			$(".newDealer").html(holdNamePlayer + " remains the Dealer");
		}
	}else if (createResultDealer == 21){
		$(".nextRoundButton").show();
		$(".findTheWinner").html(holdNameDealer+ " BLACKJACK WINS!!!" + " IN YOUR FACE " + holdNamePlayer);
		$(".newDealer").html(holdNameDealer + " is the Dealer after BlackJack");
	}else if (createResultPlayer == 21){
		$(".nextRoundButton").show();
		$(".findTheWinner").html(holdNamePlayer + " BLACKJACK WINS!!!" + " IN YOUR FACE " + holdNameDealer);
		$(".newDealer").html(holdNamePlayer + " is the Dealer after BlackJack");
	}else if (createResultDealer > 21){
		$(".nextRoundButton").show();
		$(".findTheWinner").html(holdNameDealer+ " OUT OF BOUNDS!!! " + holdNamePlayer + " WINS!!!");
		$(".newDealer").html(holdNamePlayer + " is the Dealer after out of bounds move of " + holdNameDealer);
	}else if (createResultPlayer > 21){
		$(".nextRoundButton").show();
		$(".findTheWinner").html(holdNamePlayer+ " OUT OF BOUNDS!!! " + holdNameDealer + " WINS!!!");
		$(".newDealer").html(holdNameDealer + " is the Dealer after out of bounds move of " + holdNamePlayer);
	}
	
		
};


// --------------------------START EVENTS----------------------------------------------
// --------------------------SHOW DEALER NAME------------------------------------------
 var holdNameDealer;
 var submit_button_dealerVar = true;
$(".submit_nameDealer").on("click",function(){
	holdNameDealer =  $('input[name ="dealer"]').val(); 
	$(".dealerName").html(holdNameDealer);
	 submit_button_dealerVar = false;
	 if (submit_button_dealerVar==false && submit_button_playerVar==false) {
	$(".tableGame").remove();
	$(".gameArea").show();
	$(".gameArea").css('display','flex');/*bootsrap problem to center divs if you insert collums,dispaly:flex necessary and after that justify-conent:center to the parent*/
	};
});
// -----------------------SHOW PLAYER NAME----------------------------------------------
var holdNamePlayer;
var submit_button_playerVar = true;
$(".submit_namePlayer").on("click",function(){
	holdNamePlayer =  $('input[name ="player"]').val(); 
	$(".playerName").html(holdNamePlayer);
	 submit_button_playerVar = false;
	 if (submit_button_dealerVar==false && submit_button_playerVar==false) { 
	$(".tableGame").remove();
	$(".gameArea").show();
	$(".gameArea").css('display','flex');/*bootsrap problem to center divs if you insert collums,dispaly:flex necessary and after that justify-conent:center to the parent*/
	};
});

// in the fisrt time dealer area will be disabled
disabledPlayerArea();
// ---------------------------------------DEALER PLAY------------------------------------------------------- //
var createResultDealer = 0;
var getOutcomeDealer = 0;
// ---start button
$("#buttonCardDealer").on("click",function(){
	cardDealerPlay();
});

// ---stop button
$("#buttonStopDealer").on("click",function(){
	stopButtonDealer();
});
//==========================================================================================
// --------------------------------------PLAYER PLAY-----------------------------------------
var createResultPlayer = 0;
var getOutcomePlayer = 0;
// ---start button
$("#buttonCardPlayer").on("click",function(){
	cardPlayerPlay();
});

// ---stop button
$("#buttonStopPlayer").on("click",function(){
	stopButtonPlayer();
});
//============================================================================================

$(".submit_settings").click(function(){
	$(".settingsUl").toggleClass("toggleUl");
})
// --- next round
	var scoreDealer = 0;
	var scorePlayer = 0;

$(".nextRoundButton").on("click",function(){
	$("#buttonCardDealer").prop('disabled',false);
	$("#buttonStopDealer").prop('disabled',false);
	$("#buttonCardPlayer").prop('disabled',false);
	$("#buttonStopPlayer").prop('disabled',false);
	$(".dealerArea").css('background-color','');
	$(".playerArea").css('background-color','');
	$("#describeCardDealer").html("");
	$("#describeCardPlayer").html("");
	$("#outcomeDealer").html("");
	$("#outcomePlayer").html("");
	$(".nextRoundButton").hide();
	$(".findTheWinner").html("");
	$("#imageCardPlayer").attr("src","images/closedCard.png");
	$("#imageCardDealer").attr("src","images/closedCard.png");
	score();
	$(".score").show();
	$(".score").html(holdNameDealer + "  " + scoreDealer +" - "+ scorePlayer + "  " + holdNamePlayer);
	createResultPlayer = 0;
	createResultDealer = 0;
	
	function score(){
		if ((createResultDealer == 21) || ((createResultDealer>createResultPlayer) && (createResultDealer < 22)) ){
			scoreDealer = scoreDealer + 1;
			winner = "Dealer";
		}else if ((createResultPlayer == 21) || ((createResultPlayer>createResultDealer) && (createResultPlayer < 22))){
			scorePlayer = scorePlayer + 1;
			winner = "Player";
		}else if (createResultDealer >= 22){
			scorePlayer = scorePlayer + 1;
			winner = "Player";
		}else if (createResultPlayer >= 22){
			scoreDealer = scoreDealer + 1;
			winner = "Dealer";
		}else if ((createResultDealer == createResultPlayer) && (winner == "Dealer")){
			scoreDealer = scoreDealer + 1;
			winner = "Dealer";
		}else if ((createResultDealer == createResultPlayer) && (winner == "Player")){
			scorePlayer = scorePlayer + 1;
			winner = "Player"
		}
		if(winner == "Player"){
			disabledDealerArea();
		}else if (winner == "Dealer"){
			disabledPlayerArea();
		}
		if(scoreDealer == 7){
			$(".gameArea").remove();
			$(".outcomeArea").remove();
			var dealerWins = "<h2>"+holdNameDealer+" wins the game</h2>";
			dealerWins += "<h3>"+ scoreDealer + " - " + scorePlayer +"</h3>";
			$(".winArea").css('display','block');
			$(".winArea").html(dealerWins);

		}else if(scorePlayer == 7){
			$(".gameArea").remove();
			$(".outcomeArea").remove();
			var playerWins = "<h2>"+holdNamePlayer+" wins the game</h2>";
			playerWins += "<h3>"+ scoreDealer + " - " + scorePlayer +"</h3>";
			$(".winArea").css('display','block');
			$(".winArea").html(playerWins);
		}
	}

});




});
	// -------------------------J QUERY ENDS-------------------------------------------



// 0: "Ace of Hearts"
// 1: "Two of Hearts"
// 2: "Three of Hearts"
// 3: "Four of Hearts"
// 4: "Five of Hearts"
// 5: "Six of Hearts"
// 6: "Seven of Hearts"
// 7: "Eight of Hearts"
// 8: "Nine of Hearts"
// 9: "Ten of Hearts"
// 10: "Jack of Hearts"
// 11: "Queen of Hearts"
// 12: "King of Hearts"
// 13: "Ace of Diamonds"
// 14: "Two of Diamonds"
// 15: "Three of Diamonds"
// 16: "Four of Diamonds"
// 17: "Five of Diamonds"
// 18: "Six of Diamonds"
// 19: "Seven of Diamonds"
// 20: "Eight of Diamonds"
// 21: "Nine of Diamonds"
// 22: "Ten of Diamonds"
// 23: "Jack of Diamonds"
// 24: "Queen of Diamonds"
// 25: "King of Diamonds"
// 26: "Ace of Spades"
// 27: "Two of Spades"
// 28: "Three of Spades"
// 29: "Four of Spades"
// 30: "Five of Spades"
// 31: "Six of Spades"
// 32: "Seven of Spades"
// 33: "Eight of Spades"
// 34: "Nine of Spades"
// 35: "Ten of Spades"
// 36: "Jack of Spades"
// 37: "Queen of Spades"
// 38: "King of Spades"
// 39: "Ace of Clubs"
// 40: "Two of Clubs"
// 41: "Three of Clubs"
// 42: "Four of Clubs"
// 43: "Five of Clubs"
// 44: "Six of Clubs"
// 45: "Seven of Clubs"
// 46: "Eight of Clubs"
// 47: "Nine of Clubs"
// 48: "Ten of Clubs"
// 49: "Jack of Clubs"
// 50: "Queen of Clubs"
// 51: "King of Clubs"


