const eleGrid = document.querySelector('.grid');
const selectDifficulty = document.getElementById('select-difficulty');
const btnPlay = document.getElementById('btn-play');

let arrBombs = [];
let gameOver = false;
let score = 0;
let difficulty = "";

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
    gameOver = false;
    score = 0;
    arrBombs = [];
    difficulty = selectDifficulty.value;
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
            if (playerWins(score)) {
                alert(`You win! Your score is: ${score}. Select difficulty and press "Play" to restart`)
            } else if (!arrBombs.includes(parseInt(this.innerHTML)) && !gameOver) {
                if (!this.classList.contains('clicked')) {
                    this.classList.add('clicked');
                    score++;
                    console.log(`CELL # ${this.innerHTML}`);
                    console.log(score);
                }
            } else if (this.classList.contains('bomb') || gameOver) {
                gameOver = true;
                console.log("GAME OVER");
                showBombs();
                alert(`You lost... Your score is: ${score}. Select difficulty and press "Play" to restart`);
            }
        });
    }
}

function playerWins(numScore) {
    const bombs = mapBombsDifficulty.get(selectDifficulty.value);
    const cells = mapCellsDifficulty.get(selectDifficulty.value);
    return (cells - bombs) === numScore;
}

function removeCells(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
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