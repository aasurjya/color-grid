
// Available Colors
const availableColors = [
    '#ff0000', // Red
    '#00ff00', // Green
    '#0000ff', // Blue
    '#ffff00', // Yellow
    '#ff00ff', // Magenta
    '#00ffff', // Cyan
    '#ff8000', // Orange
    '#800080', // Purple
    '#008000', // Dark Green
    '#000080'  // Dark Blue
];

// Helper function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Function to play a sound while click

function playClickSound(){
    const clickSound = document.getElementById('fillColorSound');
    clickSound.currentTime = 0; // Rewind the audio to the beginning
    clickSound.play();
}
function playSelectedSound(){
    const clickSound = document.getElementById('clickSound');
    clickSound.currentTime = 0; // Rewind the audio to the beginning
    clickSound.play();
}
// Generate HTML for Available Colors
const colorPalette = document.getElementById('color-palette');
    for (let i = 0; i < availableColors.length; i++) {
        const color = availableColors[i];
        const colorDiv = document.createElement('div');
        colorDiv.className = 'available-color';
        colorDiv.style.backgroundColor = color;
        colorDiv.onclick = function () {
            selectedColor = color;
            playSelectedSound();
        };
        colorPalette.appendChild(colorDiv);
    }
    
// Helper function to get the selected color from the palette
function getSelectedColor() {
    return selectedColor;
}

// ColorGrid Data (10x10 grid)
const colorGridData = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => getRandomColor()));

// Initialize ColorGrid
const colorGrid = document.getElementById('color-grid');
colorGrid.innerHTML = generateColorGridHTML(colorGridData);

// Generate HTML for ColorGrid
function generateColorGridHTML(data) {
    let html = '';
    for (let i = 0; i < data.length; i++) {
        html += '<tr>';
        for (let j = 0; j < data[i].length; j++) {
            html += `<td style="background-color: ${data[i][j]};" onclick="fillColor(${i}, ${j})"></td>`;
        }
        html += '</tr>';
    }
    return html;
}



// Flood Fill algorithm
function fillColor(row, col) {
    const targetColor = colorGridData[row][col];
    const selectedColor = getSelectedColor();
    if (targetColor === selectedColor) {
        return; // If the selected color is the same as the target color, no need to fill
        
    }
    floodFill(row, col, targetColor, selectedColor);
    colorGrid.innerHTML = generateColorGridHTML(colorGridData);
     playClickSound();
}

function floodFill(row, col, targetColor, replacementColor) {
    if (row < 0 || row >= colorGridData.length || col < 0 || col >= colorGridData[0].length) {
        return; // Out of bounds
    }

    if (colorGridData[row][col] !== targetColor) {
        return; // Not the target color
    }

    colorGridData[row][col] = replacementColor;

    floodFill(row - 1, col, targetColor, replacementColor); // Up
    floodFill(row + 1, col, targetColor, replacementColor); // Down
    floodFill(row, col - 1, targetColor, replacementColor); // Left
    floodFill(row, col + 1, targetColor, replacementColor); // Right
}


