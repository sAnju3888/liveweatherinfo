var carousel = document.querySelector('.carousel');
var cardContainer = carousel.querySelector('.card-container');
var cards = cardContainer.querySelectorAll('.card');
var cardWidth = cards[0].offsetWidth;
var cardMarginRight = parseInt(window.getComputedStyle(cards[0]).marginRight);
var visibleCardCount = 5;
var totalCardCount = cards.length;
var index = 0;

carousel.style.width = (cardWidth + cardMarginRight +5) * visibleCardCount+ 'px';
carousel.style.minWidth = cardWidth+ 10  + 'px';

function showNextCards() {
index = Math.min(index + 1, totalCardCount - visibleCardCount);
cardContainer.style.transform = 'translateX(-' + (cardWidth + cardMarginRight+5) * index + 'px)';
}

function showPreviousCards() {
index = Math.max(index - 1, 0);
cardContainer.style.transform = 'translateX(-' + (cardWidth + cardMarginRight+5) * index + 'px)';
}

function showLastCard() {
index = totalCardCount-5;
cardContainer.style.transform = 'translateX(-' + (cardWidth + cardMarginRight+5) * index + 'px)';
}
function showFirstCard() {
index = 0;
cardContainer.style.transform = 'translateX(-' + (cardWidth + cardMarginRight+5) * index + 'px)';
}

// Example usage for sliding functionality
var nextButton = document.querySelector('#nextButton');
var prevButton = document.querySelector('#prevButton');
var lastButton = document.querySelector('#lastButton');
var firstButton = document.querySelector('#firstButton');

nextButton.addEventListener('click', showNextCards);
prevButton.addEventListener('click', showPreviousCards);
lastButton.addEventListener('click', showLastCard);
firstButton.addEventListener('click', showFirstCard);