const eleGrid = document.querySelector('.grid');
const selectDifficulty = document.getElementById('select-difficulty');
const btnPlay = document.getElementById('btn-play');

let arrBombs = [];

const mapCellsDifficulty = new Map([
    ["Easy", 49],
    ["Medium", 81],
    ["Hard", 100]
]);

const mapBombsDifficulty = new Map([
    ["Easy", 8],
    ["Medium", 12],
    ["Hard", 16]
]);

btnPlay.addEventListener('click', runGame);

function runGame() {
    let difficulty = selectDifficulty.value;
    arrBombs = [];
    generateBombs(mapBombsDifficulty.get(difficulty), arrBombs, difficulty);
    generateGrid(difficulty);
}

function generateGrid(difficulty) {
    switch (difficulty) {
        case "Easy":
            generateCells(mapCellsDifficulty.get("Easy"));
            break;
        case "Medium":
            generateCells(mapCellsDifficulty.get("Medium"));
            break;
        case "Hard":
            generateCells(mapCellsDifficulty.get("Hard"));
            break;
    }
}

function generateCells(nCells) {
    removeCells(eleGrid);
    eleGrid.setAttribute("style", `grid-template-columns: repeat(${Math.sqrt(nCells)}, 1fr);`)

    for (let i = 0; i < nCells; i++) {
        const eleCell = document.createElement('div');
        eleCell.innerHTML = i + 1;
        if (arrBombs.includes(i + 1)) {
            eleCell.classList.add('bomb');
        }
        eleCell.classList.add('cell');
        eleGrid.append(eleCell);
        eleCell.addEventListener('click', function () {
            if (!arrBombs.includes(parseInt(this.innerHTML))) {
                this.classList.toggle('clicked');
                console.log(this.innerHTML);
            } else {
                console.log("BOMB")
                showBombs(nCells, arrBombs);
                // gameOver();
            }
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
        let numBomb = getRandInt(1, mapCellsDifficulty.get(strDifficulty));
        if (!arrBombs.includes(numBomb)) {
            arrayBombs.push(numBomb);
        }
    }
}

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function showBombs() {
    const eleBombs = document.querySelectorAll('.bomb');
    for (let i = 0; i < eleBombs.length; i++) {
        eleBombs[i].style.backgroundColor = 'red';
    }
}