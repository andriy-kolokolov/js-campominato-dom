const eleGrid = document.querySelector('.grid');
const selectDifficulty = document.getElementById('select-difficulty');
const btnPlay = document.getElementById('btn-play');

let arrBombs = [];

const mapDifficulty = new Map([
    ["Easy", 49],
    ["Medium", 81],
    ["Hard", 100]
]);

btnPlay.addEventListener('click', function () {
    generateBombs(16, arrBombs, selectDifficulty.value);
    generateGrid(selectDifficulty.value);
});

function generateGrid(difficulty) {
    switch (difficulty) {
        case "Easy":
            generateCells(mapDifficulty.get("Easy"));
            break;
        case "Medium":
            generateCells(mapDifficulty.get("Medium"));
            break;
        case "Hard":
            generateCells(mapDifficulty.get("Hard"));
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

function generateBombs(nBombs, arrayBombs, strDifficulty) {
    while (arrayBombs.length !== nBombs) {
        let numBomb = getRandInt(1, mapDifficulty.get(strDifficulty));
        if (!arrBombs.includes(numBomb)) {
            arrayBombs.push(numBomb);
        }
    }
}

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}