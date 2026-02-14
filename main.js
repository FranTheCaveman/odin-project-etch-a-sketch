const canvas = document.querySelector('#canvas');
const changeCanvasButton = document.querySelector('#b-change-grid-size');

let canvasSize = 860;
let gridSize = 32;
let squareSize = 10;

/***
 * Calculates the size of each square in a grid to fit within the canvas size
 */
function calculateSquareSize(gridSize, canvasSize) {
    squareSize = canvasSize / gridSize;
    return squareSize;
}

/***
 *  Helper function to randomly generate RGB values for a square
 */ 
function randRGB() {
    return Math.random() * 255;
}

/***
 * This function draws the canvas given the size of the grid
 */
function drawCanvas(gridSize) {
    canvas.style.setProperty('--cols', gridSize);
    canvas.style.setProperty('--rows', gridSize);
    canvas.style.setProperty('--canvasSize', canvasSize + 'px');
    canvas.style.setProperty('--squareSize', calculateSquareSize(gridSize, canvasSize) + 'px');

    // Draw each square in grid
    for (let i=0; i<(gridSize**2); i++) {
        const square = document.createElement("div");
        square.classList.add("square");

        square.addEventListener('mouseenter', (event) => {
            const isRainbow = document.querySelector('input').checked;
            square.style.backgroundColor = (isRainbow ? `rgb(${randRGB()},${randRGB()},${randRGB()})` : "#22202E");
            let currentOpacity = parseFloat(square.style.opacity) || 0;
            currentOpacity += 0.1;
            square.style.opacity = currentOpacity; 
        })

        canvas.appendChild(square);
    }
}

/*
 *  Input to change canvas size
 */
changeCanvasButton.addEventListener('click', (event) => {
    let isValid = false;
    let errorMsg = "";

    while (!isValid) {
        gridSize = prompt(`${errorMsg}Enter a grid size between 1 and 100: `);
        
        // input cancelled
        if (gridSize === null) {
            return null;
        }

        // Check if input is an integer and between 1 and 100
        if (Number.isInteger(parseInt(gridSize, 10)) && gridSize >= 1 && gridSize <= 100) {
            canvas.replaceChildren(); // clear canvas
            drawCanvas(gridSize);
            isValid = true;
            return gridSize;
        }

        else {
            errorMsg = "Invalid input. ";
        }
    }
})

// Draw initial canvas
drawCanvas(gridSize);

// c key toggles color change
document.addEventListener("keydown", event => {
    if (event.key === "c") {
        document.querySelector('input').checked = (document.querySelector('input').checked ? false : true);
    }
})