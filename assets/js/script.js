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
    };
        
    square.style.backgroundColor = colorMap[style] || '';
    if (style === '0') {
        square.style.color = '#bbb';
    }
    else
        square.style.color = '#333';
}

// game controls - read arrow keys
// Define the event listener function
function handleKeyDown(event) {
    switch (event.key) {
        case 'ArrowUp':
            slideUp();
            mergeUp();
            slideUp();
            (checkWin() || checkLost()) ? document.removeEventListener('keydown', handleKeyDown) : genNewNumber();
            break;
        case 'ArrowDown':
            slideDown();
            mergeDown();
            slideDown();
            (checkWin() || checkLost()) ? document.removeEventListener('keydown', handleKeyDown) : genNewNumber();
            break;
        case 'ArrowLeft':
            slideLeft();
            mergeLeft();
            slideLeft();
            (checkWin() || checkLost()) ? document.removeEventListener('keydown', handleKeyDown) : genNewNumber();
            break;
        case 'ArrowRight':
            slideRight();
            mergeRight();
            slideRight();
            (checkWin() || checkLost()) ? document.removeEventListener('keydown', handleKeyDown) : genNewNumber();
            break;
        default:
            break;
    }
}

// Add the event listener
document.addEventListener('keydown', handleKeyDown);

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

function checkWin() {
    if (squares.some(square => square.innerHTML === '2048')) {
        document.getElementById('popup-message').innerHTML = 'You Won! :)';
        document.getElementById("popup-container").style.display = "flex";
        document.getElementById("start-again-btn").addEventListener("click", function() {
            location.reload();
            });
            document.getElementById("cancel-btn").addEventListener("click", function() {
            document.getElementById("popup-container").style.display = "none";
            });
        return true;
    } 
    return false;
}


function checkLost() {
    if (!squares.some(square => square.innerHTML === '0')) {     
        document.getElementById('popup-message').innerHTML = 'You Lost :(';
        document.getElementById("popup-container").style.display = "flex";
        document.getElementById("start-again-btn").addEventListener("click", function() {
            location.reload();
          });
          document.getElementById("cancel-btn").addEventListener("click", function() {
            document.getElementById("popup-container").style.display = "none";
          });
        return true;
    } else {
        return false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Get the element you want to add touch gestures to
    var element = document.getElementById('game-filed');

    var startX, startY, endX, endY;

    // Touch start event
    element.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    });

    // Touch move event
    element.addEventListener('touchmove', function(event) {
        endX = event.touches[0].clientX;
        endY = event.touches[0].clientY;
    });

    // Touch end event
    element.addEventListener('touchend', function(event) {
        var diffX = endX - startX;
        var diffY = endY - startY;

        // Determine the direction of the swipe
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            if (diffX > 0) {
                // Swipe right
                // Your code here for swipe right
                document.getElementById('descritption').innerHTML = 'Swipe right';
            } else {
                // Swipe left
                // Your code here for swipe left
                document.getElementById('descritption').innerHTML = 'Swipe left';
            }
        } else {
            // Vertical swipe
            if (diffY > 0) {
                // Swipe down
                // Your code here for swipe down
                document.getElementById('descritption').innerHTML = 'Swipe down';
            } else {
                // Swipe up
                // Your code here for swipe up
                document.getElementById('descritption').innerHTML = 'Swipe up';
            }
        }
    });
});