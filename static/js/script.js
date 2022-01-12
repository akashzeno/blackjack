
/*
Generate a random number between 0 and the length of the cardsList array.

Parameters
----------
cardsList : list
    A list of strings representing the cards.

Returns
-------
int
    A random number between 0 and the length of the cardsList array.

Examples
--------
>>> randomNumber()
4
*/
/*
Here's what the selected code is doing:
1.The function randomNumber() is called.
2. The function randomNumber() generates a random number between 0 and the length of the cardsList array.
3. The function randomNumber() checks if the new random number is the same as the old random number.
4. If the new random number is the same as the old random number, the function randomNumber() is called again.
5. If the new random number is not the same as the old random number, newRandomNumber is returned.
*/
function randomNumber() {
    let newRandomNumber = Math.floor(Math.random() * cardsList.length);
	if (newRandomNumber === oldRandomNumber) {
		return randomNumber();
	} else {
		oldRandomNumber = newRandomNumber;
		return newRandomNumber;
	}
}

/*
Generates a random card from the cardsList and adds it to the player's hand.

Parameters
----------
player : str
    The player who is receiving the card.

Returns
-------
img : HTMLImageElement
    The card that was drawn.
*/
/*
Here's what the selected code is doing:
1.Generate a random number between 0 and 51.
2. Get the card image from the cardsList array.
3. Get the card number from the card image.
4. If the card number is 11 and the player's total + 11 is greater than 21, change the card number to 1.
5. Add the card number to the player's total.
6. Create an image element and set its src to the card image.
7. Append the image element to the player's cards element.
8. If the player is the dealer, add the card number to the dealer's total.

# **Step 7: Create the Dealer's Turn Function**
#
# The dealer's turn function is similar to the player's turn function. The only difference is that the dealer has to hit if their total is less than 17.
#
# Here's the code:
#
# ```javascript
# function dealerTurn() {
# if (dealer < 17) {
# let img = generateCards("dealer");
# dealerCards.appendChild(img);
# } else {
# dealerStand();
# }
# }
# ```
#
# Here's what the code is doing:
# 1. If the dealer
*/
function generateCards(player) {
	let randNum = randomNumber();
	let img = document.createElement("img");
	img.src = `${cardsList[randNum]}`;

	if (player == "you") {
		let cardNumber = Number(cardsList.at(randNum).match(/\d+/g)[0]);
		if (cardNumber === 11 && you + cardNumber > 21) {
			cardNumber = 1;
			you += cardNumber;
		} else {
			you += cardNumber;
		}
	} else if (player == "dealer") {
		let cardNumber = Number(cardsList.at(randNum).match(/\d+/g)[0]);
		if (cardNumber === 11 && dealer + cardNumber > 21) {
			cardNumber = 1;
			dealer += cardNumber;
		} else {
			dealer += cardNumber;
		}
	}
	return img;
}

/*
checkBust(player)

    Checks if the player busts.

    Parameters
    ----------
    player : str
        The player to check.

    Returns
    -------
    bool
        True if the player busts, False otherwise.

    Examples
    --------
    >>> checkBust("you")
    False
    >>> checkBust("dealer")
    False
    >>> checkBust("you")
    True
    >>> checkBust("dealer")
    True
*/
/*
Here's what the selected code is doing:
1.The function checkBust() takes in a player argument.
2. If the player is you, it checks if you have a score higher than 21.
3. If you do, it sets the resultText to "You Bust! Dealer Wins!" and disables the buttons.
4. It also increments the losses variable by 1 and calls the scoreTracker() function to update the losses score.
5. It also plays the awwSfx sound.
6. If the player is dealer, it checks if the dealer has a score higher than 21.
7. If the dealer does, it sets the resultText to "Dealer Bust! You Win!" and disables the buttons.
8. It also increments the win variable by 1 and calls the scoreTracker() function to update the win score.
9. It also plays the cashSfx sound.
10. If the player is neither you or the dealer, it returns false.

The next function is the disableButtons() function.
*/
function checkBust(player) {
	if (player == "you") {
		if (you > twentyOne) {
			document.querySelector(".resultText").innerHTML =
				"You Bust! Dealer Wins!";
			disableButtons();
			losses++;
			scoreTracker("losses", losses);
            awwSfx.play();
			return true;
		}
	} else if (player == "dealer") {
		if (dealer > twentyOne) {
			document.querySelector(".resultText").innerHTML = "Dealer Bust! You Win!";
			disableButtons();
			win++;
			scoreTracker("win", win);
            cashSfx.play();
			return true;
		}
	}
	return false;
}


/*
checkWin()

    Checks if the player or dealer has won the game.

    Parameters
    ----------
    dealer : int
        The dealer's current score.
    you : int
        The player's current score.

    Returns
    -------
    bool
        True if the player or dealer has won, False otherwise.
*/
/*
Here's what the selected code is doing:
1.The function checkWin() is called when the player clicks the "Deal" button.
2. The function checks if the player's total is greater than the dealer's total.
3. If the player's total is greater than the dealer's total, the player wins.
4. If the player's total is less than the dealer's total, the dealer wins.
5. If the player's total is equal to the dealer's total, it's a tie.
6. If the player wins, the dealer's cards are hidden and the player's cards are revealed.
7. If the dealer wins, the player's cards are hidden and the dealer's cards are revealed.
8. If it's a tie, the cards are hidden and a message is displayed.
9. The function returns true if the player or dealer wins.
10. The function returns false if the game is still in progress.

# Step 7: Create the Game
#
# Now that we have the logic for the game, let
*/
function checkWin() {
	if (dealer > you && dealer <= twentyOne) {
		document.querySelector(".resultText").innerHTML = "Dealer Wins!";
		disableButtons();
		losses++;
		scoreTracker("losses", losses);
        awwSfx.play();
		return true;
	} else if (you <= twentyOne && you === dealer && dealer <= twentyOne) {
		document.querySelector(".resultText").innerHTML = "It's a Tie!";
		disableButtons();
		draw++;
		scoreTracker("draw", draw);
        awwSfx.play();
		return true;
	}
	return false;
}

/*
Disables the buttons for the player to hit or stand.

    Parameters
    ----------
    None

    Returns
    -------
    None

    Examples
    --------
    >>> disableButtons()
*/
/*
Here's what the selected code is doing:
1.The function disableButtons() is called when the player's turn is over.
2. The function disables the hit and stand buttons.
*/
function disableButtons() {
	document.querySelector(".hitBtn").disabled = true;
	document.querySelector(".standBtn").disabled = true;
}

/*
dealerLogic()

    This function is called when the dealer's turn begins.

    It adds a card to the dealer's hand and updates the dealer's total.

    It then checks if the dealer has won or bust.

    If the dealer has not won or bust, it calls itself again.

    Args:
        None

    Returns:
        None
*/
/*
Here's what the selected code is doing:
1.The dealerLogic function is called after the playerLogic function.
*/
function dealerLogic() {
    setTimeout(() => {

	let dealerCardsContainer = document.querySelector(".dealerCardsContainer");
	dealerCardsContainer.appendChild(generateCards("dealer"));
    swishSfx.play();
	document.querySelector(".dealerCurrentTotal").innerHTML = `Dealer: ${dealer}`;
	if (checkWin()) {
		return;
	}
	if (checkBust("dealer")) {
		return;
	}
	dealerLogic();

    }, 500);
}

/*
scoreTracker(scoreName, scoreValue)

Update the score display on the page.

Parameters
----------
scoreName : str
    The name of the score to update.
scoreValue : int
    The new value to display.

Returns
-------
None
*/
/*
Here's what the selected code is doing:
1.The function scoreTracker() takes two arguments: scoreName and scoreValue.
2. The function first checks if the scoreName is "you" or "dealer".
3. If the scoreName is "you" or "dealer", the function updates their corresponding scoreValue to the scoreValue argument.
*/
function scoreTracker(scoreName, scoreValue) {
	document.querySelector(`.${scoreName}`).innerHTML = `${scoreValue}`;
}

let cashSfx = new Audio("./static/media/sounds/cash.mp3");
let awwSfx = new Audio("./static/media/sounds/aww.mp3");
let swishSfx = new Audio("./static/media/sounds/swish.m4a");
let twentyOne = 21;
let you = 0;
let dealer = 0;
let win = 0;
let draw = 0;
let losses = 0;
let oldRandomNumber = 0;
let cardsList = [
	"static/media/images/cards/2_of_clubs.svg",
	"static/media/images/cards/2_of_diamonds.svg",
	"static/media/images/cards/2_of_hearts.svg",
	"static/media/images/cards/2_of_spades.svg",
	"static/media/images/cards/3_of_clubs.svg",
	"static/media/images/cards/3_of_diamonds.svg",
	"static/media/images/cards/3_of_hearts.svg",
	"static/media/images/cards/3_of_spades.svg",
	"static/media/images/cards/4_of_clubs.svg",
	"static/media/images/cards/4_of_diamonds.svg",
	"static/media/images/cards/4_of_hearts.svg",
	"static/media/images/cards/4_of_spades.svg",
	"static/media/images/cards/5_of_clubs.svg",
	"static/media/images/cards/5_of_diamonds.svg",
	"static/media/images/cards/5_of_hearts.svg",
	"static/media/images/cards/5_of_spades.svg",
	"static/media/images/cards/6_of_clubs.svg",
	"static/media/images/cards/6_of_diamonds.svg",
	"static/media/images/cards/6_of_hearts.svg",
	"static/media/images/cards/6_of_spades.svg",
	"static/media/images/cards/7_of_clubs.svg",
	"static/media/images/cards/7_of_diamonds.svg",
	"static/media/images/cards/7_of_hearts.svg",
	"static/media/images/cards/7_of_spades.svg",
	"static/media/images/cards/8_of_clubs.svg",
	"static/media/images/cards/8_of_diamonds.svg",
	"static/media/images/cards/8_of_hearts.svg",
	"static/media/images/cards/8_of_spades.svg",
	"static/media/images/cards/9_of_clubs.svg",
	"static/media/images/cards/9_of_diamonds.svg",
	"static/media/images/cards/9_of_hearts.svg",
	"static/media/images/cards/9_of_spades.svg",
	"static/media/images/cards/10_of_clubs.svg",
	"static/media/images/cards/10_of_diamonds.svg",
	"static/media/images/cards/10_of_hearts.svg",
	"static/media/images/cards/10_of_spades.svg",
	"static/media/images/cards/10_jack_of_clubs.svg",
	"static/media/images/cards/10_jack_of_diamonds.svg",
	"static/media/images/cards/10_jack_of_hearts.svg",
	"static/media/images/cards/10_jack_of_spades.svg",
	"static/media/images/cards/10_queen_of_clubs.svg",
	"static/media/images/cards/10_queen_of_diamonds.svg",
	"static/media/images/cards/10_queen_of_hearts.svg",
	"static/media/images/cards/10_queen_of_spades.svg",
	"static/media/images/cards/10_king_of_clubs.svg",
	"static/media/images/cards/10_king_of_diamonds.svg",
	"static/media/images/cards/10_king_of_hearts.svg",
	"static/media/images/cards/10_king_of_spades.svg",
	"static/media/images/cards/11_ace_of_clubs.svg",
	"static/media/images/cards/11_ace_of_diamonds.svg",
	"static/media/images/cards/11_ace_of_hearts.svg",
	"static/media/images/cards/11_ace_of_spades.svg",
];

document.querySelector(".hitBtn").addEventListener("click", () => {
	let yourCardsContainer = document.querySelector(".yourCardsContainer");
	yourCardsContainer.appendChild(generateCards("you"));
    swishSfx.play();
	document.querySelector(".yourCurrentTotal").innerHTML = `You: ${you}`;
	if (checkBust("you") === true) {
		disableButtons();
	}
});

document.querySelector(".standBtn").addEventListener("click", () => {
	dealerLogic();
});

document.querySelector(".hitBtn").addEventListener(
	"click",
	() => {
		document.querySelector(".resultText").innerHTML = "";
	},
	{ once: true }
);

document.querySelector(".dealBtn").addEventListener("click", () => {
	document.querySelector(
		".mainTable"
	).innerHTML = `<div class="resultText">Let's Play</div>
    <div class="yourCurrentTotal">You: 0</div>
    <div class="dealerCurrentTotal">Dealer: 0</div>
    <div class="yourCardsContainer"></div>
    <div class="dealerCardsContainer"></div>`;
	document.querySelector(".hitBtn").addEventListener(
		"click",
		() => {
			document.querySelector(".resultText").innerHTML = "";
		},
		{ once: true }
	);
	document.querySelector(".hitBtn").disabled = false;
	document.querySelector(".standBtn").disabled = false;
	you = 0;
	dealer = 0;
	oldRandomNumber = 0;
});
