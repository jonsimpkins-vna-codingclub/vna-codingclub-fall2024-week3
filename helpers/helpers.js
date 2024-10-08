
let canvas = document.getElementById('my-canvas');

let ctx = canvas.getContext('2d');

// Size of total grid (in pixels)
let canvasSize = 500;

canvas.width = canvasSize;
canvas.height = canvasSize;

// Size of each grid space (in pixels)
let gridSqSize = 25;

// Number of grid squares in the grid (along each dimension)
let gridSize = Math.floor(canvasSize / gridSqSize);

function generateBlankBoard() {
    let board = new Array(gridSize).fill(0);
    for (let i = 0; i < gridSize; i++) {
        board[i] = new Array(gridSize).fill(0);
    }
    return board;
}

let currentBoard = generateBlankBoard();


// Value applied when you click in a square
let currentClickValue = 1;

function clampGridIndex(floatValue) {
    if (floatValue < 0) { return 0; }
    return Math.min(gridSize - 1, Math.floor(floatValue));
}

function getGridCoordinates(ev) {
    let x = ev.pageX - (canvas.offsetLeft + canvas.clientLeft);
    let y = ev.pageY - (canvas.offsetTop + canvas.clientTop);

    let xIndex = clampGridIndex(x / gridSqSize);
    let yIndex = clampGridIndex(y / gridSqSize);

    return {
        xIndex: xIndex,
        yIndex: yIndex,
    };
}

// Event handler that supports clicking on the board to change values
function canvasClickHandler(ev) {
    let coords = getGridCoordinates(ev);

    currentBoard[coords.xIndex][coords.yIndex] = currentClickValue;

    redraw();
}

function showTooltip(newValue) {
    let tooltipEl = document.getElementById('value-tooltip');

    if (newValue) {
        tooltipEl.style.display = 'block';
    } else {
        tooltipEl.style.display = 'none';
    }
}

canvas.addEventListener('mousemove', (ev) => {
    if (ev.buttons < 1) {
        let coords = getGridCoordinates(ev);
        let currentValue = Math.round(100 * currentBoard[coords.xIndex][coords.yIndex]) / 100;

        let tooltipEl = document.getElementById('value-tooltip');
        tooltipEl.innerText = currentValue;

        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = ev.pageX - 30;
        tooltipEl.style.top = ev.pageY - 50;
        showTooltip(true);

        return; // No buttons down
    }

    showTooltip(false);
    canvasClickHandler(ev);
});
canvas.addEventListener('mousedown', (ev) => {
    showTooltip(false);
    canvasClickHandler(ev)
});
canvas.addEventListener('mouseleave', () => {
    showTooltip(false);
});

// Helper method to get the color for a value between -1 and 1 (green to purple, with white as the 0-value)
function getColor(value) {
    if (value == 0) {
        // Easy
        return 'rbg(255, 255, 255)';
    }
    
    // Pin the value between -1 and 1
    value = Math.min(1.0, Math.max(-1.0, value));

    let r = 255;
    let g = 255;
    let b = 255;

    if (value > 0) {
        r = 127 * value + 255 * (1.0 - value);
        g = 0 * value + 255 * (1.0 - value);
        b = 255;
    } else {
        let absValue = -1 * value;
        r = 0 * absValue + 255 * (1.0 - absValue);
        g = 128 * absValue + 255 * (1.0 - absValue);
        b = 0 * absValue + 255 * (1.0 - absValue);
    }

    return `rgb(${r}, ${g}, ${b})`;
}


function drawBoard() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (currentBoard[i][j] == 0) {
                continue;
            }

            let color = getColor(currentBoard[i][j]);
            ctx.fillStyle = color;
            ctx.fillRect(i * gridSqSize, j * gridSqSize, gridSqSize, gridSqSize);

        }
    }
}

function drawGridLines() {
    ctx.lineWidth = 0.25;
    ctx.strokeStyle = 'rgb(100, 100, 100)';

    for (let x = gridSqSize; x < canvasSize; x += gridSqSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasSize);
        ctx.closePath();
        ctx.stroke();
    }

    for (let y = gridSqSize; y < canvasSize; y += gridSqSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasSize, y);
        ctx.closePath();
        ctx.stroke();
    }
}

// Method to redraw board
function redraw() {
    ctx.clearRect(0,0,canvasSize,canvasSize);

    drawBoard();

    drawGridLines();

    document.getElementById('round-lbl').innerText = currentIteration;
}

// Helper method to generate a new version of the board, given the old version
function updateBoard() {

    let newBoard = generateBlankBoard();

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let newValue = 0;
            if (isEasyMode()) {
                newValue = isCellAliveNext(i,j) == true;
            } else {
                newValue = Math.min(1.0, Math.max(-1, getCellValueNextIteration(i,j,currentIteration)));
            }

            newBoard[i][j] = newValue || 0;
        }
    }

    currentBoard = newBoard;
    currentIteration += 1;
    redraw();
}

let isAnimating = false;
let currentIteration = 0;

setInterval(() => {
    if (!isAnimating) {
        return;
    }

    updateBoard();
}, animationDelayMs);

redraw();

document.getElementById('animation-step').onclick = () => {
    updateBoard();
}

document.getElementById('animation-toggle').onclick = () => {
    isAnimating = !isAnimating;

    // This is a ternary operator, it's a short way of assigning
    // a value based on an if / else statement
    let newLabel = isAnimating ? 'Stop' : 'Start';
    document.getElementById('animation-toggle').innerText = newLabel;
};

document.getElementById('clear-btn').onclick = () => {
    currentBoard = generateBlankBoard(gridSize);
    currentIteration = 0;
    redraw();
}

// Lets us know if the user is on Step 3 yet or not
function isEasyMode() { return authorName == 'Conway'; }

// Depending on what step you're at, generates a random
// value (either 0 / 1 initially, or -1 to 1 eventually)
function getRandomValueInRange() {
    if (isEasyMode()) {
        return Math.round(Math.random());
    }
    return (2 * Math.random()) - 1;
}

document.getElementById('random-btn').onclick = () => {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            currentBoard[i][j] = getRandomValueInRange();
        }
    }
    currentIteration= 0;
    redraw();
}

document.getElementById('sub-header').innerText = `${authorName}'s Game of Life`;

if (isEasyMode()) {
    let clickSlider = document.getElementById('click-value');

    clickSlider.min = 0;
    clickSlider.max = 1;
    clickSlider.step = 1;
}


document.getElementById('click-value').addEventListener("input", (event) => {
    currentClickValue = event.target.value;
    document.getElementById('click-value-lbl').innerText = `Click Value: ${event.target.value}`;
});



/** Helpers called by the student code */

function isCellAliveNow(x, y) {
    return currentBoard[x][y] == 1;
}

function getNormalizedCoordinate(value) {
    if (value < 0) {
        return getNormalizedCoordinate(value + gridSize);
    }
    if (value >= gridSize) {
        return getNormalizedCoordinate(value - gridSize);
    }
    return value;
}

function getNumAliveNeighbors(x,y) {
    let numAliveNeighbors = 0;
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        let normalizedX = getNormalizedCoordinate(x + xOffset);
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            let normalizedY = getNormalizedCoordinate(y + yOffset);
            if (xOffset == 0 && yOffset == 0) {
                continue;
            }

            if (currentBoard[normalizedX][normalizedY] == 1) {
                numAliveNeighbors++;
            }
        }
    }
    return numAliveNeighbors;
}



/** Step 3 helpers */

function getCurrentCellValue(x,y) {
    return currentBoard[getNormalizedCoordinate(x)][getNormalizedCoordinate(y)];
}


function getFriendlyStrength(x,y) {
    let currentValue = getCurrentCellValue(x,y);

    return _getStrength(x,y, currentValue >= 0);
}

function getEnemyStrength(x,y) {
    let currentValue = getCurrentCellValue(x,y);

    if (currentValue == 0) {
        return 0;
    }
    
    return _getStrength(x,y, currentValue < 0);
}

function _getStrength(x, y, desirePositive) {
    let totalStrength = 0;
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        let normalizedX = getNormalizedCoordinate(x + xOffset);
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            let normalizedY = getNormalizedCoordinate(y + yOffset);
            if (xOffset == 0 && yOffset == 0) {
                continue;
            }

            if (desirePositive == (currentBoard[normalizedX][normalizedY] >= 0)) {
                totalStrength += currentBoard[normalizedX][normalizedY];
            }
        }
    }

    return totalStrength;
}

function getRandomValue() {
    return 2 * Math.random() - 1;
}

function getSinusoidalValue(iteration, period) {
    return Math.sin(2 * Math.PI * (iteration % period) / period);
}
