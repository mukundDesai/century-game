'use strict';

//selescting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//initial conditions
let scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
score0El.textContent = score1El.textContent = 0;
current0EL.textContent = current1EL.textContent = 0;
diceEL.classList.add('hidden');

//dice rolling functionality
btnRoll.addEventListener('click', function () {
  if (
    Number(document.getElementById(`score--${activePlayer}`).textContent) < 100
  ) {
    //generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEL.src = `dice-${dice}.png`;
    diceEL.classList.remove('hidden');

    //check for rolled 1: if true switch to other player
    if (dice !== 1) {
      //add dice to currentScore
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      activePlayer = activePlayer === 0 ? 1 : 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  if (
    Number(document.getElementById(`score--${activePlayer}`).textContent) < 100
  ) {
    //update the score
    scores[activePlayer] += Number(
      document.getElementById(`current--${activePlayer}`).textContent
    );
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    //check if the score is >= 100: if yes the active player wins, if no switch player
    if (scores[activePlayer] >= 100) {
      //active player wins
      winner();
    } else {
      //switch player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      activePlayer = activePlayer === 0 ? 1 : 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    }
  } else {
    //active player wins
    winner();
  }
});

btnNew.addEventListener('click', function () {
  //all initial conditions
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  current0EL.textContent = current1EL.textContent = 0;
  score0El.textContent = score1El.textContent = 0;
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  diceEL.classList.add('hidden');
  document.getElementById('name--0').textContent = `Player 1`;
  document.getElementById('name--1').textContent = `Player 2`;
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  a;
});

const winner = function () {
  //hide the dice
  diceEL.classList.add('hidden');
  //add the player--winner element to the active player class and remove the player--active element
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  document.getElementById(`name--${activePlayer}`).textContent = `WINNER🥳`;
};
