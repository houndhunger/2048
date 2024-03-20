/**
 * @fileoverview Implements a game app for 2048.
 * This app allows users to play the classic game of 2048, where they slide numbered tiles on a grid to merge them and reach the 2048 tile.
 * The game provides features such as sliding tiles in different directions, merging adjacent tiles, and keeping track of the score.
 * Users can play the game on various platforms, including desktop and mobile devices.
 * This file contains the main functionality and logic for the 2048 game app.
 * @version 1.0
 *
 * Table of Content:
 * 1. 
 * 
 * 3. Game core logic functions (i.e. slide, merge)
 * 4. Game secondary functions (i.e new game, check score)
 * 
 * 
 * 
 * 8. Support functions (i.e. styleing)
 * 
 * 
 * 
 * */

/** Set document variables */
const GAME_FIELD = document.getElementById('game-board');
const GAME_SCORE = document.getElementById('score-value');
const BEST_SCORE = document.getElementById('best-score-value');
const FIELD_WIDTH = 4;
let squares = [];
var startX, startY, endX, endY;

document.addEventListener("DOMContentLoaded", initializeGame);

function initializeGame() {
    setNewGame();

    // Add Event Listeners
    document.addEventListener('touchstart', touchStart);
    document.addEventListener('touchmove', touchmove);
}

function touchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}

function touchmove(event) {
    endX = event.touches[0].clientX;
    endY = event.touches[0].clientY;
}

 
/** 
 * Game Seconday functions 
 * */

function resetGame() {
    popupMessage("Do you want to start new game?") ? setNewGame() : undefined;
}



/** Set new game */
function setNewGame() {
    // re-set document variables
    squares = [];

    eraseGameBoard();
    drawGameBoard();
    checkBestScore();

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchend', handleTouchEnd);
    document.getElementById("popup-container").style.display = "none";
}


/** Set the game board  */ 
function drawGameBoard() {
    for (let i = 0; i < FIELD_WIDTH * FIELD_WIDTH; i++) {
        let square = document.createElement('div');
        square.innerHTML = '';
        GAME_FIELD.appendChild(square);
        styleNumber(square, '');
        squares.push(square);
    }
    genNewNumber();
    genNewNumber();
}

function eraseGameBoard() {
        GAME_FIELD.innerHTML = '';
        GAME_SCORE.innerHTML = '';
    }

function genNewNumber() {
    let randomPosition;
    do {
        randomPosition = Math.floor(Math.random() * (FIELD_WIDTH * FIELD_WIDTH));
    } while (squares[randomPosition].innerHTML != 0);
    const randomNumber = Math.random() < 0.9 ? 2 : 4;
    squares[randomPosition].innerHTML = randomNumber;
    styleNumber(squares[randomPosition], randomNumber);
}

/** Write score to div  */
function addScore(add) {
    GAME_SCORE.innerHTML = parseInt(GAME_SCORE.innerHTML) + parseInt(add);
}

// game controls - read arrow keys
// Define the event listener function
function handleKeyDown(event) {
    
    let mergeCheck = false;
    let slideCheck1 = false;
    let slideCheck2 = false;

    // Prevent the default scrolling behavior
    event.key.startsWith("Arrow") ? event.preventDefault() : undefined;
    
    /*
    // Scroll all the way down
    window.scrollBy({
        top: window.innerHeight,
        left: 0,
        behavior: 'smooth'
    });*/

    // Hide instructions
    document.getElementById("instructions-toggle").checked = false; 
/*
    squares.forEach(square => {
        square.innerHTML === '' ? square.innerHTML = '0' : undefined;
    });*/

    switch (event.key) {
        case 'ArrowUp':
            slideCheck1 = slideUp();
            mergeCheck = merge("mergeUp");
            slideCheck2 = slideUp();
            break;
        case 'ArrowDown':
            slideCheck1 = slideDown();
            mergeCheck = merge("mergeDown");
            slideCheck2 = slideDown();
            break;
        case 'ArrowLeft':
            slideCheck1 = slideLeft();
            mergeCheck = merge("mergeLeft");
            slideCheck2 = slideLeft();
            break;
        case 'ArrowRight':
            slideCheck1 = slideRight();
            mergeCheck = merge("mergeRight");
            slideCheck2 = slideRight();
            break;
        default:
            break;
    }
    (checkWin() || checkLost()) ? removeEventListeners() : (mergeCheck || slideCheck1 || slideCheck2 ? genNewNumber() : undefined);
    //square.innerHTML === '0' ? square.innerHTML = '' : undefined;
}

/**
 * Game core logic functions
 */

/** Slide functions */
function slideLeft() {
    let slideCheck = false;
    for (let i = 0; i < FIELD_WIDTH; i++) {
        let shift = 0;
        for (let j = 0; j < FIELD_WIDTH; j++) {
            let ind = i * FIELD_WIDTH + j;
            squares[ind].innerHTML > 0 && shift > 0 ? slideCheck = true : undefined;
            squares[ind - shift].innerHTML = squares[ind].innerHTML;
            styleNumber(squares[ind - shift], squares[ind - shift].innerHTML);
            if (squares[ind].innerHTML === '') shift++;
            else if (shift > 0 && squares[ind].innerHTML != 0) {
                squares[ind].innerHTML = '';
                styleNumber(squares[ind], squares[ind].innerHTML);
            }
        }
    }
    return slideCheck;
}

function slideRight() {
    let slideCheck = false;
    for (let i = FIELD_WIDTH - 1; i >= 0; i--) {
        let shift = 0;
        for (let j = FIELD_WIDTH - 1; j >= 0; j--) {
            let ind = i * FIELD_WIDTH + j;
            squares[ind].innerHTML > 0 && shift > 0 ? slideCheck = true : undefined;
            squares[ind + shift].innerHTML = squares[ind].innerHTML;
            styleNumber(squares[ind + shift], squares[ind + shift].innerHTML);
            if (squares[ind].innerHTML === '') shift++;
            else if (shift > 0 && squares[ind].innerHTML != 0) {
                squares[ind].innerHTML = '';
                styleNumber(squares[ind], squares[ind].innerHTML);
            }
        }
    }
    return slideCheck;
}

function slideUp() {
    let slideCheck = false;
    for (let i = 0; i < FIELD_WIDTH; i++) {
        let shift = 0;
        for (let j = 0; j < FIELD_WIDTH; j++) {
            let ind = j * FIELD_WIDTH + i;
            squares[ind].innerHTML > 0 && shift > 0 ? slideCheck = true : undefined;
            squares[ind - shift].innerHTML = squares[ind].innerHTML; 
            styleNumber(squares[ind - shift], squares[ind - shift].innerHTML);
            if (squares[ind].innerHTML === '') shift = shift + FIELD_WIDTH;
            else if (shift > 0 && squares[ind].innerHTML != 0) {
                squares[ind].innerHTML = '';
                styleNumber(squares[ind], squares[ind].innerHTML);
                slideCheck++;
            }
        }
    }
    return slideCheck;
}

function slideDown() {
    let slideCheck = false;
    for (let i = FIELD_WIDTH - 1; i >= 0; i--) {
        let shift = 0;
        for (let j = FIELD_WIDTH - 1; j >= 0; j--) {
            let ind = j * FIELD_WIDTH + i;
            squares[ind].innerHTML > 0 && shift > 0 ? slideCheck = true : undefined;
            squares[ind + shift].innerHTML = squares[ind].innerHTML; 
            styleNumber(squares[ind + shift], squares[ind + shift].innerHTML);
            if (squares[ind].innerHTML === '') shift = shift + FIELD_WIDTH;
            else if (shift > 0 && squares[ind].innerHTML != 0) {
                squares[ind].innerHTML = '';
                styleNumber(squares[ind], squares[ind].innerHTML);
                slideCheck++;
            }
        }
    }
    return slideCheck;
}

/* Merge function to merge adjacent numbers if equal */
function merge(way) {
    let mergeCheck = 0;
    if (way == "mergeRight" || way == "mergeDown") {
        let indShift = way == "mergeRight" ? -1 : -FIELD_WIDTH;
        for (let i = FIELD_WIDTH - 1; i >= 0; i--) {
            //let shift = 0;
            for (let j = FIELD_WIDTH - 1; j >= 1; j--) {
                let ind = way == "mergeRight" ? i * FIELD_WIDTH + j : j * FIELD_WIDTH + i;
                if (squares[ind].innerHTML === squares[ind + indShift].innerHTML && squares[ind].innerHTML !== '') {
                    mergeOps(ind, indShift);
                    j--;
                    mergeCheck++;
                }
            }
        }
    } else if (way == "mergeLeft" || way == "mergeUp") {
        let indShift = way == "mergeLeft" ? 1 : FIELD_WIDTH;
        for (let i = 0; i <= FIELD_WIDTH - 1; i++) {
            //let shift = 0;
            for (let j = 0; j <= FIELD_WIDTH - 2; j++) {
                let ind = way == "mergeLeft" ? i * FIELD_WIDTH + j : j * FIELD_WIDTH + i;
                if (squares[ind].innerHTML === squares[ind + indShift].innerHTML && squares[ind].innerHTML !== '') {
                    mergeOps(ind, indShift);
                    j++;
                    mergeCheck++;
                }
            }
        }
    }
        return mergeCheck;
}

function mergeOps(ind, indShift) {
    squares[ind].innerHTML *= 2;
    addScore(squares[ind].innerHTML);
    styleNumber(squares[ind], squares[ind].innerHTML);
    squares[ind + indShift].innerHTML = '';
    styleNumber(squares[ind + indShift], squares[ind + indShift].innerHTML);
}


/**
 * Game secondary functions
 */

/** Check Win & Lost functions including end game popup message */
function checkWin() {
    let message = 'Congratualtions, you\'ve done it. You Won! :)' + checkBestScore();    
    if (squares.some(square => square.innerHTML === '2048')) {
        popupMessage(message);
        return true;
    } 
    return false;
}
function checkLost() {
    let message = 'You Lost :(' + checkBestScore();
    if (!squares.some(square => square.innerHTML === '')) {
        popupMessage(message);
        return true;
    } else {
        return false;
    }
}

function popupMessage(message) {
    //let potentialBest = checkBestScore();     
    document.getElementById('popup-message').innerHTML = message;
    document.getElementById("popup-container").style.display = "flex";
    document.getElementById("start-again-btn").addEventListener("click", function() {
        setNewGame();
        return true;
      });
      document.getElementById("cancel-btn").addEventListener("click", function() {
        document.getElementById("popup-container").style.display = "none";
        return false;       
      });
}

/** Chcecks Game Score is Best Score */
function checkBestScore() {
    let bestScr = localStorage.getItem('localBestScore');
    if (GAME_SCORE.innerHTML > bestScr) {
        localStorage.setItem('localBestScore', GAME_SCORE.innerHTML);
        BEST_SCORE.innerHTML = GAME_SCORE.innerHTML;
        return 'Your new Best score is ' + BEST_SCORE.innerHTML + '.';
    } else {
        BEST_SCORE.innerHTML = bestScr === null ? '0' : bestScr;
        return '';
    }    
}


// Define the touchend event handler function
function handleTouchEnd(event) {

    var diffX = endX - startX;
    var diffY = endY - startY;

    // Determine the direction of the swipe
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 10) {
            handleKeyDown({ key: 'ArrowRight'});
        } else if (diffX < -10) {
            handleKeyDown({ key: 'ArrowLeft'});
        }
    } else {
        if (diffY > 10) {
            handleKeyDown({ key: 'ArrowDown' });
        } else if (diffY < -10) {
            handleKeyDown({ key: 'ArrowUp' });
        }
    }
}

/** 
 * Support functions
 */

/** Style function for numer div - font and background colour  */
function styleNumber(square, style) {
    const colorMap = {
        '': '#bbb',
        '2': '#afa',
        '4': '#6f6',
        '8': '#1f1',
        '16': '#3f0',
        '32': '#8f0',
        '64': '#cf0',
        '128': '#fd0',
        '256': '#f90',
        '512': '#f40',
        '1024': '#f00',
        '2048': '#f00',
    }
        
    square.style.backgroundColor = colorMap[style] || '';
    //square.style.color = style === '' ? '#bbb' : '#333';
}

/** Remove Event Listeners */
function removeEventListeners() {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('touchend', handleTouchEnd);
}