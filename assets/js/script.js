// set document variables

const gameField = document.getElementById('game-filed');
let squares = [];
const width = 4;


// set the game filed
function drawGameBoard() {
    for (let i = 0; i < width * width; i++) {
        square = document.createElement('div');
        square.innerHTML = 0;
        gameField.appendChild(square);
        styleNumber(square, 0);
        squares.push(square);
    }
    genNewNumber();
    genNewNumber();
}

drawGameBoard();

// genareate new number
function genNewNumber() {
    //check gsme over, if not continue
    do {
        randomNumber = Math.floor(Math.random() * (width * width))
    } while (squares[randomNumber].innerHTML !=0);
    squares[randomNumber].innerHTML = 2;
    styleNumber(squares[randomNumber], 2);
    console.log("R", randomNumber);
}

// number style
function styleNumber(square, style) {
    let colour = '';
    switch (style) {
        case 1: colour = '#ffffff';
            break;
        case 2: colour = '#ffffdd';
            break;
        case 3: colour = '#ffffaa';
            break;
        case 4: colour = '#ffff88';
            break;
        case 5: colour = '#ffff66';
            break;
        case 6: colour = '#ffff44';
            break;
        case 7: colour = '#ffff22';
            break;
        case 8: colour = '#ffff00';
            break;
        case 9: colour = '#ffdd00';
            break;
        case 10: colour = '#ffaa00';
            break;
        case 11: colour = '#ff8800';
            break;
        case 12: colour = '#ff6600';
            break;
        case 13: colour = '#ff4400';
            break;
        case 14: colour = '#ff2200';
            break;
        case 15: colour = '#ff0000';
            break;
        default: colour = '';
    }/*
    if (style === 0) {
        square.style.color = '#bbbbbb';
    }
    else
        square.style.color = '#000000';*/
}

// game controls - read arrow keys
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            // Action for the up arrow key
            console.log('Up arrow key pressed');
            slideUp();
            break;
        case 'ArrowDown':
            // Action for the down arrow key
            console.log('Down arrow key pressed');
            slideDown();
            break;
        case 'ArrowLeft':
            // Action for the left arrow key
            console.log('Left arrow key pressed');
            slideLeft();
            break;
        case 'ArrowRight':
            // Action for the right arrow key
            console.log('Right arrow key pressed');
            slideRight();
            break;
        default:
            // Action for other keys (if needed)
            break;
    }
});

// slide left
function slideLeft() {
    for (let i = 0; i < width; i++) {
        let shift = 0;
        for (let j = 0; j < width; j++) {
            let ind = i * width + j;
            //if (shift > 0) {
                squares[ind - shift].innerHTML = squares[ind].innerHTML;
               // gameField.childNodes[ind - shift].innerHTML = squares[ind - shift].innerHTML;
            //}   
            if (squares[ind].innerHTML == 0) shift++; 
            else if (shift > 0 && squares[ind].innerHTML != 0) {
                squares[ind].innerHTML = 0;
                //gameField.childNodes[ind].innerHTML = 0;  
            }    
        }
    }
    genNewNumber();
}

// slide up
function slideUp() {
    for (let i = 0; i < width; i++) {
        let shift = 0;
        for (let j = 0; j < width; j++) {
            let ind = j * width + i;
            //if (shift > 0) {
                squares[ind - shift].innerHTML = squares[ind].innerHTML;
               // gameField.childNodes[ind - shift].innerHTML = squares[ind - shift].innerHTML;
            //}   
            if (squares[ind].innerHTML == 0) shift = shift + width; 
            else if (shift > 0 && squares[ind].innerHTML != 0) {
                squares[ind].innerHTML = 0;
                //gameField.childNodes[ind].innerHTML = 0;  
            }    
        }
    }
    genNewNumber();
}