/*
 * Create a list that holds all of your cards
 */
//card names taken from starter code
let cards = ['fa-diamond', 'fa-diamond',
            'fa-paper-plane-o', 'fa-paper-plane-o',
            'fa-anchor', 'fa-anchor',
            'fa-bolt', 'fa-bolt',
            'fa-cube', 'fa-cube',
            'fa-leaf', 'fa-leaf',
            'fa-bicycle', 'fa-bicycle',
            'fa-bomb', 'fa-bomb'];

function generateCard(card){
  return  `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

 /*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let moves = 0;
let moveCounter = document.querySelector('.moves');
moveCounter.innerText = 0;

function startGame(){
  let deck = document.querySelector('.deck');
  let cardHTML = shuffle(cards).map(function(card){
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join('');
  //moves = 0;
}

startGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const restart = document.querySelector('.restart');
      restart.addEventListener('click', function(){
      location.reload();
});


let allCards = document.querySelectorAll('.card');
let openCards = [];
let allStars = document.querySelectorAll('.fa-star')

allCards.forEach(function(card){
      card.addEventListener('click', function(e){
      if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') && openCards.length<2){
      openCards.push(card);
      card.classList.add('open', 'show');

      if(openCards.length == 2){
        //CHECK IF THEY MATCH
        if(openCards[0].dataset.card == openCards[1].dataset.card){
          openCards[0].classList.add('match');
          openCards[0].classList.add('open');
          openCards[0].classList.add('show');
          openCards[1].classList.add('match');
          openCards[1].classList.add('open');
          openCards[1].classList.add('show');
          openCards = [];
        }
        //WHEN CARDS DON'T MATCH THEY GO AWAY HERE
        else{setTimeout(function(){openCards.forEach(function(card){
          card.classList.remove('open', 'show');
          });
        openCards = [];
        },800);}

      }
      //COUNT MOVES
      moves += 1;
      moveCounter.innerText = moves;
      //RATINGS
      if (moves>15) {
        allStars[2].classList.add('fa-star-o');
        allStars[2].classList.remove('fa-star');
        // allStars.forEach(function(star){
        //   star.classList.add('fa-star-o');
        //   star.classList.remove('fa-star');
        // })
      }
      if (moves>30) {
        allStars[1].classList.add('fa-star-o');
        allStars[1].classList.remove('fa-star');
      }
      if (moves>45) {
        allStars[0].classList.add('fa-star-o');
        allStars[0].classList.remove('fa-star');
      }
    }
    });
});
