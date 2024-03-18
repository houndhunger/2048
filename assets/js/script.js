
    // set document variables
    const gameField = document.getElementById('game-filed');
    const score = document.getElementById('score-value');
    const bestScore = document.getElementById('best-score-value');
    let squares = [];
    const width = 4;
    var startX, startY, endX, endY;

function newGame() {
    //location.reload();
    
    // re-set document variables
    squares = [];

    eraseGameBoard();
    drawGameBoard();
    
    newBestScore();

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchend', handleTouchEnd);

    document.getElementById("popup-container").style.display = "none";
}

newGame();

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

function eraseGameBoard() {
        gameField.innerHTML = '';
        score.innerHTML = '0';
    }

// genareate new number
function genNewNumber() {
    //check gsme over, if not continue
    do {
        randomNumber = Math.floor(Math.random() * (width * width))
    } while (squares[randomNumber].innerHTML != 0);
    squares[randomNumber].innerHTML = '2';
    styleNumber(squares[randomNumber], '2');
}

function addScore(add) {
    score.innerHTML = parseInt(score.innerHTML) + parseInt(add);
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
            (checkWin() || checkLost()) ? removeEventListeners() : genNewNumber();
            break;
        case 'ArrowDown':
            slideDown();
            mergeDown();
            slideDown();
            (checkWin() || checkLost()) ? removeEventListeners() : genNewNumber();
            break;
        case 'ArrowLeft':
            slideLeft();
            mergeLeft();
            slideLeft();
            (checkWin() || checkLost()) ? removeEventListeners() : genNewNumber();
            break;
        case 'ArrowRight':
            slideRight();
            mergeRight();
            slideRight();
            (checkWin() || checkLost()) ? removeEventListeners() : genNewNumber();
            break;
        default:
            break;
    }
}

function removeEventListeners() {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('touchend', handleTouchEnd);
}

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
                addScore(squares[ind].innerHTML);
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
                addScore(squares[ind].innerHTML);
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
                addScore(squares[ind].innerHTML);
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
                addScore(squares[ind].innerHTML);
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
        let potentialBest = newBestScore();
        document.getElementById('popup-message').innerHTML = 'Congratualtions, you\'ve done it. You Won! :)' + potentialBest;
        document.getElementById("popup-container").style.display = "flex";
        document.getElementById("start-again-btn").addEventListener("click", function() {
            newGame();
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
        let potentialBest = newBestScore();     
        document.getElementById('popup-message').innerHTML = 'You Lost :(' + potentialBest;
        document.getElementById("popup-container").style.display = "flex";
        document.getElementById("start-again-btn").addEventListener("click", function() {
            newGame();
          });
          document.getElementById("cancel-btn").addEventListener("click", function() {
            document.getElementById("popup-container").style.display = "none";
          });
        return true;
    } else {
        return false;
    }
}

function newBestScore() {
    let bestScr = localStorage.getItem('localBestScore');
    if (score.innerHTML > bestScr) {
        localStorage.setItem('localBestScore', score.innerHTML);
        bestScore.innerHTML = score.innerHTML;
        return 'Your new Best score is ' + bestScore.innerHTML + '.';
    } else {
        bestScore.innerHTML = bestScr === null ? '0' : bestScr;
        return '';
    }    
}

document.addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});

document.addEventListener('touchmove', function(event) {
    endX = event.touches[0].clientX;
    endY = event.touches[0].clientY;
});

// Define the touchend event handler function
function handleTouchEnd(event) {
    var diffX = endX - startX;
    var diffY = endY - startY;

    // Determine the direction of the swipe
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
            handleKeyDown({ key: 'ArrowRight'});
        } else {
            handleKeyDown({ key: 'ArrowLeft'});
        }
    } else {
        if (diffY > 0) {
            handleKeyDown({ key: 'ArrowDown' });
        } else {
            handleKeyDown({ key: 'ArrowUp' });
        }
    }
}
