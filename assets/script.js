const eleGrid = document.querySelector('.grid');
const selectDifficulty = document.getElementById('select-difficulty');
const btnPlay = document.getElementById('btn-play');

btnPlay.addEventListener('click', function () {
    generateGrid(selectDifficulty.value);
});

function generateGrid(difficulty) {
    switch (difficulty) {
        case "Easy":
            generateCells(49);
            break;
        case "Medium":
            generateCells(81);
            break;
        case "Hard":
            generateCells(100);
            break;
    }
}

function generateCells(nCells) {
    removeCells(eleGrid);
    eleGrid.setAttribute("style", `grid-template-columns: repeat(${Math.sqrt(nCells)}, 1fr);`)

    for (let i = 0; i < nCells; i++) {
        const eleCell = document.createElement('div');
        eleCell.innerHTML = i + 1;
        eleCell.classList.add('cell');
        eleGrid.append(eleCell);
        eleCell.addEventListener('click', function () {
            this.classList.toggle('clicked');
            console.log(this.innerHTML);
        });
    }
}

function removeCells(eleGrid) {
    while (eleGrid.firstChild) {
        eleGrid.removeChild(eleGrid.lastChild);
    }
}