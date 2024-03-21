/* global document, localStorage */
/**
 * @fileoverview Implements a game app for 2048.
 * This app allows users to play the classic game of 2048, where they slide numbered tiles on a grid to merge them and reach the 2048 tile.
 * The game provides features such as sliding tiles in different directions, merging adjacent tiles, and keeping track of the score.
 * Users can play the game on various platforms, including desktop and mobile devices.
 * This file contains the main functionality and logic for the 2048 game app.
 * @version 1.0
 * @author Daniel Pribula
 *
 * Table of Content:
 * 1. Script variables & Game initialization
 * 2. Event listeners
 * 3. Game core logic functions (i.e. slide, merge)
 * 4. Game primary functions (i.e reset game)
 * 5. Game secondary functions (i.e check score)
 * 6. Support functions (i.e. pop-up, styleing) 
 * 
 * Future improvements:
 * - Handling event listeners might be pretier
 * - Slide functions as Merge functions
 * - Slide Operations and Merge Operations sholud have one function to write the values UpdateCells(CellRef1, CellRef2, CellValue1, CellValue2);
 */

/**
 * Set script variables.
 */
const GAME_FIELD = document.getElementById('game-board');
const GAME_SCORE = document.getElementById('score-value');
const BEST_SCORE = document.getElementById('best-score-value');
const FIELD_WIDTH = 4;
let squares = [];
let startX, startY, endX, endY;

/** 
 * Handle document listener to initalize the game script.
 */
document.addEventListener("DOMContentLoaded", initializeGame);

/** 
 * Initalize Game script function.
 */
function initializeGame() {
    setNewGame();

    // handle document listener click on NEW GAME button
    document.getElementById('new-game').addEventListener('click', resetGame); 
}

/** 
 * Add Event Listeners.
 */
function addEventListeners() {
    // handle document listener start position of the touch
    document.addEventListener('touchstart', touchStart); 
    // handle document listener end position of the touch
    document.addEventListener('touchmove', touchMove); 
    // handle document listener keyboard input
    document.addEventListener('keydown', handleKeyDown); 
    // handle document listener end of touch and does 
    document.addEventListener('touchend', handleTouchEnd); 
}

function touchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}

function touchMove(event) {
    endX = event.touches[0].clientX;
    endY = event.touches[0].clientY;
}

/** 
 * Remove Event Listeners.
 */
function removeEventListeners() {
    document.removeEventListener('touchstart', touchStart);
    document.removeEventListener('touchmove', touchMove);
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('touchend', handleTouchEnd);
}

/**
 * Handles touch end - swipe and determine the direction of the swipe.
 * 10 is a threshold for accidental touches.
 */
function handleTouchEnd(event) {

    let diffX = endX - startX;
    let diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 10) {
            handleKeyDown({ key: 'ArrowRight' });
        } else if (diffX < -10) {
            handleKeyDown({ key: 'ArrowLeft' });
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
 * Set new game.
 */
function setNewGame() {
    // re-set document variables
    squares = [];

    clearGameBoard();
    drawGameBoard();

    addEventListeners();

    // hide modal - pop-up
    document.getElementById("popup-container").style.display = "none";
}

/** 
 * Set the game board.
 */
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

/** 
 * Clear the game board.
 */
function clearGameBoard() {
    GAME_FIELD.innerHTML = '';
    GAME_SCORE.innerHTML = '0';
}

/**
 * Game reset - shows modal message and set new game.
 */
function resetGame() {
    if (popupMessage("Do you want to start new game?")) 
    { 
        // checkBestScore(); // - feature bug - When somone doen't want to update Best score can resetGame without writing in Best score.
        setNewGame(); 
    }
}

/**
 * Game round - move cicle - receives arrow key - event.key and responds with tiles move and merge or game end.
 */
function handleKeyDown(event) {

    let mergeCheck = false;
    let slideCheck1 = false;
    let slideCheck2 = false;

    // Prevent the default scrolling behavior
    if (event.key.startsWith("Arrow")) { event.preventDefault(); }

    // Hide instructions, it might be displayed
    document.getElementById("instructions-toggle").checked = false;

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

    
    if ((checkWin() || checkLost())) // end the game
    {
        removeEventListeners(); 
    } else if (mergeCheck || slideCheck1 || slideCheck2) // generate number
    {
        genNewNumber();
    }
}

/**
 * Generate new number - 90% no. 2 or 10% no. 4.
 */
function genNewNumber() {
    let randomPosition;
    do {
        randomPosition = Math.floor(Math.random() * (FIELD_WIDTH * FIELD_WIDTH));
    } while (squares[randomPosition].innerHTML != 0);
    const randomNumber = Math.random() < 0.9 ? 2 : 4;
    squares[randomPosition].innerHTML = randomNumber;
    styleNumber(squares[randomPosition], "NEW" + randomNumber);
}

/**
 * Slide the numbers to the Left side.
 */
function slideLeft() {
    let didSlide = false;
    for (let i = 0; i < FIELD_WIDTH; i++) {
        let shift = 0;
        for (let j = 0; j < FIELD_WIDTH; j++) {
            let ind = i * FIELD_WIDTH + j;
            let result = slideOp(ind, shift, 1, didSlide, "slideLeft");
            didSlide = didSlide || result.didSlide;
            shift = result.shift;
        }
    }
    return didSlide;
}

/**
 * Slide the numbers to the Right side.
 */
function slideRight() {
    let didSlide = false;
    for (let i = FIELD_WIDTH - 1; i >= 0; i--) {
        let shift = 0;
        for (let j = FIELD_WIDTH - 1; j >= 0; j--) {
            let ind = i * FIELD_WIDTH + j;
            let result = slideOp(ind, shift, 1, didSlide, "slideRight");
            didSlide = didSlide || result.didSlide;
            shift = result.shift;
        }
    }
    return didSlide;
}

/**
 * Slide the numbers to the Up side.
 */
function slideUp() {
    let didSlide = false;
    for (let i = 0; i < FIELD_WIDTH; i++) {
        let shift = 0;
        for (let j = 0; j < FIELD_WIDTH; j++) {
            let ind = j * FIELD_WIDTH + i;
            let result = slideOp(ind, shift, FIELD_WIDTH, didSlide, "slideUp");
            didSlide = didSlide || result.didSlide;
            shift = result.shift;
        }
    }
    return didSlide;
}

/**
 * Slide the numbers to the Down side.
 */
function slideDown() {
    let didSlide = false;
    for (let i = FIELD_WIDTH - 1; i >= 0; i--) {
        let shift = 0;
        for (let j = FIELD_WIDTH - 1; j >= 0; j--) {
            let ind = j * FIELD_WIDTH + i;
            let result = slideOp(ind, shift, FIELD_WIDTH, didSlide, "slideDown");
            didSlide = didSlide || result.didSlide;
            shift = result.shift;
        }
    }
    return didSlide;
}

/**
 * Slide opeations - write moved numbers to corresponding divs, update style...
 */
function slideOp(ind, shift, shiftConst, didSlide, direction) {
    if (squares[ind].innerHTML > 0 && shift > 0) { didSlide = true; }
    if ((direction === "slideDown" || direction === "slideRight") && shift > 0) {
        squares[ind + shift].innerHTML = squares[ind].innerHTML;
        styleNumber(squares[ind + shift], squares[ind + shift].innerHTML);
    }
    else if ((direction === "slideUp" || direction === "slideLeft") && shift > 0) {
        squares[ind - shift].innerHTML = squares[ind].innerHTML;
        styleNumber(squares[ind - shift], squares[ind - shift].innerHTML);
    }
    if (squares[ind].innerHTML === '') shift = shift + shiftConst;
    else if (shift > 0 && squares[ind].innerHTML != 0) {
        squares[ind].innerHTML = '';
        styleNumber(squares[ind], squares[ind].innerHTML);
    }
    let result = { "didSlide": didSlide, "shift": shift };
    return result;
}

/**
 * Merge numbers if equal.
 */ 
function merge(way) {
    let mergeCheck = 0;
    if (way == "mergeRight" || way == "mergeDown") {
        let indShift = way == "mergeRight" ? -1 : -FIELD_WIDTH;
        for (let i = FIELD_WIDTH - 1; i >= 0; i--) {
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

/**
 * Merge operations - calculate new value, write it to div, update style, update score...
 */ 
function mergeOps(ind, indShift) {
    squares[ind].innerHTML *= 2;
    addScore(squares[ind].innerHTML);
    styleNumber(squares[ind], squares[ind].innerHTML);
    squares[ind + indShift].innerHTML = '';
    styleNumber(squares[ind + indShift], squares[ind + indShift].innerHTML);
}

/** 
 * Check if end of the game is won and send result to pop-up - modal message.
 */
function checkWin() {
    if (squares.some(square => square.innerHTML === '2048')) {
        let message = 'Congratualtions, You Won! :)' + checkBestScore();
        popupMessage(message);
        return true;
    }
    return false;
}

/** 
 * Check if end of the game is lost and send result to pop-up - modal message.
 */
function checkLost() {
    if (!squares.some(square => square.innerHTML === '')) {
        let message = 'You Lost :(' + checkBestScore();
        popupMessage(message);
        return true;
    } else {
        return false;
    }
}

/** 
 * Chcecks if Game Score is Best Score and return message with the best score.
 */
function checkBestScore() {
    let bestScr = localStorage.getItem('localBestScore');
    if (parseInt(GAME_SCORE.innerHTML) > parseInt(bestScr)) {
        localStorage.setItem('localBestScore', GAME_SCORE.innerHTML);
        BEST_SCORE.innerHTML = GAME_SCORE.innerHTML;
        return '<br>Your new Best score is ' + BEST_SCORE.innerHTML + '.';
    } else {
        BEST_SCORE.innerHTML = bestScr === null ? '0' : bestScr;
        return '';
    }
}

/** 
 * Write score to score board div.
 */
function addScore(add) {
    if (add === '') { add = '0'; }
    GAME_SCORE.innerHTML = parseInt(GAME_SCORE.innerHTML) + parseInt(add);
}

/** 
 * Pop-up - modal function shows message window. 
 */
function popupMessage(message) {
    document.getElementById('popup-message').innerHTML = message;
    document.getElementById("popup-container").style.display = "flex";
    document.getElementById("start-again-btn").addEventListener("click", function () {
        setNewGame();
        return true;
    });
    document.getElementById("cancel-btn").addEventListener("click", function () {
        document.getElementById("popup-container").style.display = "none";
        return false;
    });
}

/**
 * Style background colour for number in div.
 */
function styleNumber(square, style) {
    const colorMap = {
        '': '#bbb',
        '2': '#afa',
        '4': '#6f6',
        'NEW2': '#eee',
        'NEW4': '#ddd',
        '8': '#1f1',
        '16': '#3f0',
        '32': '#8f0',
        '64': '#cf0',
        '128': '#fd0',
        '256': '#f90',
        '512': '#f40',
        '1024': '#f00',
        '2048': '#f00',
    };
    square.style.backgroundColor = colorMap[style] || '';
}
