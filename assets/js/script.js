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
    // check end-lost, if not continue 
    do {
        randomNumber = Math.floor(Math.random() * (width * width))
        square = gameField.childNodes[randomNumber];
    } while (square === 0);
    square.innerHTML = 2;
    squares[randomNumber] = 2;
    styleNumber(square, 2);

}

//style number
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
    }
    if (style === 0) {
    square.style.color = '#bbbbbb';
    }
    else
    square.style.color = '#000000';
}
