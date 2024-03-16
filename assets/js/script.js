// set document variables

const gameField = document.getElementById('game-filed');
let squares = [];
const width = 4;


// set the game filed
function drawGameBoard() {
    for ( let i=0; i < width * width; i++) {
        square = document.createElement('div');
        square.innerHTML = 0;
        gameField.appendChild(square);  
        /*squares.push(square);*/  
    }
    genNewNumber();
    genNewNumber();
}

drawGameBoard();

// genareate new number
function genNewNumber() {
    // check end-lost, if not continue 
    do {
        let randomNumber = Math.floor(Math.random() * (width*width))
        square = gameField.childNodes[randomNumber];     
    } while (square === 0);
    square.innerHTML = 2;
}
