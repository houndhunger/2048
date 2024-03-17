// set document variables

const gameField = document.getElementById('game-filed');
let squares = [];
const width = 4;


// set the game filed
function drawGameBoard() {
    for (let i = 0; i < width * width; i++) {
        square = document.createElement('div');
        square.innerHTML = '0';
        gameField.appendChild(square);
        styleNumber(square, '0');
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
    } while (squares[randomNumber].innerHTML != 0);
    squares[randomNumber].innerHTML = '2';
    styleNumber(squares[randomNumber], '2');
}

// number style
function styleNumber(square, style) {
    const colorMap = {
        '2': '#fff',
        '4': '#ffc',
        '8': '#ff9',
        '16': '#ff6',
        '32': '#ff3',
        '64': '#ff0',
        '128': '#fc0',
        '256': '#f90',
        '512': '#f60',
        '1024': '#f30',
        '2048': '#f00',
    };
    square.style.backgroundColor = colorMap[style] || '';
    if (style === '0') {
        square.style.color = '#555'; //'#bbb'
    }
    else
        square.style.color = '#000';
}

// game controls - read arrow keys
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            slideUp();
            mergeUp();
            slideUp();
            genNewNumber();
            break;
        case 'ArrowDown':
            slideDown();
            mergeDown();
            slideDown();
            genNewNumber();
            break;
        case 'ArrowLeft':
            slideLeft();
            mergeLeft();
            slideLeft();
            genNewNumber();
            break;
        case 'ArrowRight':
            slideRight();
            mergeRight();
            slideRight();
            genNewNumber();
            break;
        default:
            break;
    }
});

function slideLeft() {
    for (let i = 0; i < width; i++) {
        let shift = 0;
        for (let j = 0; j < width; j++) {
            let ind = i * width + j;
            squares[ind - shift].innerHTML = squares[ind].innerHTML;
            styleNumber(squares[ind - shift], squares[ind - shift].innerHTML);
            if (squares[ind].innerHTML === '0') shift++;
            else if (shift > 0 && squares[ind].innerHTML != 0) {
                squares[ind].innerHTML = '0';
                styleNumber(squares[ind], squares[ind].innerHTML);
            }
        }
    }
}

function slideRight() {
    for (let i = width - 1; i >= 0; i--) {
        let shift = 0;
        for (let j = width - 1; j >= 0; j--) {
            let ind = i * width + j;
            squares[ind + shift].innerHTML = squares[ind].innerHTML;
            styleNumber(squares[ind + shift], squares[ind + shift].innerHTML);
            if (squares[ind].innerHTML === '0') shift++;
            else if (shift > 0 && squares[ind].innerHTML != 0) {
                squares[ind].innerHTML = '0';
                styleNumber(squares[ind], squares[ind].innerHTML);
            }
        }
    }
}

function slideUp() {
    for (let i = 0; i < width; i++) {
        let shift = 0;
        for (let j = 0; j < width; j++) {
            let ind = j * width + i;
            squares[ind - shift].innerHTML = squares[ind].innerHTML; 
            styleNumber(squares[ind - shift], squares[ind - shift].innerHTML);
            if (squares[ind].innerHTML === '0') shift = shift + width;
            else if (shift > 0 && squares[ind].innerHTML != 0) {
                squares[ind].innerHTML = '0';
                styleNumber(squares[ind], squares[ind].innerHTML);
            }
        }
    }
}

function slideDown() {
    for (let i = width - 1; i >= 0; i--) {
        let shift = 0;
        for (let j = width - 1; j >= 0; j--) {
            let ind = j * width + i;
            squares[ind + shift].innerHTML = squares[ind].innerHTML; 
            styleNumber(squares[ind + shift], squares[ind + shift].innerHTML);
            if (squares[ind].innerHTML === '0') shift = shift + width;
            else if (shift > 0 && squares[ind].innerHTML != 0) {
                squares[ind].innerHTML = '0';
                styleNumber(squares[ind], squares[ind].innerHTML);
            }
        }
    }
}

function mergeLeft() {
    for (let i = 0; i <= width - 1; i++) {
        let shift = 0;
        for (let j = 0; j <= width - 2; j++) {
            let ind = i * width + j;
            
            if (squares[ind].innerHTML === squares[ind + 1].innerHTML) {
                squares[ind].innerHTML *= 2;
                styleNumber(squares[ind], squares[ind].innerHTML);
                squares[ind + 1].innerHTML = '0';
                styleNumber(squares[ind + 1], squares[ind + 1].innerHTML);
                j++;
            }
        }
    }
}

function mergeRight() {
    for (let i = width - 1; i >= 0; i--) {
        let shift = 0;
        for (let j = width - 1; j >= 1; j--) {
            let ind = i * width + j;
            if (squares[ind].innerHTML === squares[ind - 1].innerHTML) {
                squares[ind].innerHTML *= 2;
                styleNumber(squares[ind], squares[ind].innerHTML);
                squares[ind - 1].innerHTML = '0';
                styleNumber(squares[ind - 1], squares[ind - 1].innerHTML);
                j--;
            }
        }
    }
}

function mergeUp() {
    for (let i = 0; i <= width - 1; i++) {
        let shift = 0;
        for (let j = 0; j <= width - 2; j++) {
            let ind = j * width + i;
            if (squares[ind].innerHTML === squares[ind + width].innerHTML) {
                squares[ind].innerHTML *= 2;
                styleNumber(squares[ind], squares[ind].innerHTML);
                squares[ind + width].innerHTML = '0';
                styleNumber(squares[ind + width], squares[ind + width].innerHTML);
                j++;
            }
        }
    }
}

function mergeDown() {
    for (let i = width - 1; i >= 0; i--) {
        let shift = 0;
        for (let j = width - 1; j >= 1; j--) {
            let ind = j * width + i;
            if (squares[ind].innerHTML === squares[ind - width].innerHTML) {
                squares[ind].innerHTML *= 2;
                styleNumber(squares[ind], squares[ind].innerHTML);
                squares[ind - width].innerHTML = '0';
                styleNumber(squares[ind - width], squares[ind - width].innerHTML);
                j--;
            }
        }
    }
}