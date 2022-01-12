
function randomNumber() {
    let newRandomNumber = Math.floor(Math.random() * cardsList.length);
	if (newRandomNumber === oldRandomNumber) {
		return randomNumber();
	} else {
		oldRandomNumber = newRandomNumber;
		return newRandomNumber;
	}
}

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

function disableButtons() {
	document.querySelector(".hitBtn").disabled = true;
	document.querySelector(".standBtn").disabled = true;
}

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
