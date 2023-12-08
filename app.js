let canvas = document.getElementById("canvas");
let g = canvas.getContext("2d");


const gamestate_start = 0;
const gamesstate_ingame = 1;
const gamesstate_gameover = 2;

const ingamestate_start = 0;
const ingamestate_roll = 1;
const ingamestate_end = 0;

let gameState = gamestate_start;
let ingameState = ingamestate_start;
let boardPositionSize = 50;
let pawnPositions = [];
let boardPositions = [];
let playerAmountButtons = [];
let uiWindow = createRect(600, 200, 300, 300);

function createRect(x, y, w, h) {
    let rectangle = {
        x: x,
        y: y,
        x2: x + w,
        y2: y + h,
        w: w,
        h: h,
    };
    return rectangle;
}

function clearCanvas() {
    g.fillStyle = "lightslategray";
    g.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clearCanvas();
    if (gameState == gamestate_start) {
        drawGameStart();
    }
    else if (gameState == gamesstate_ingame) {
        drawIngame();
    }
}

function createBoardPositions() {
    let x = 0;
    let y = canvas.height - boardPositionSize;
    let path = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    for (let i = 0; i < path.length; i++) {

        if (path[i] == 1)//gaan naar rechts
        {
            x += boardPositionSize;
        }
        else if (path[i] == 3)//gaan naar links
        {
            x -= boardPositionSize;
        }
        else if (path[i] == 0)//gaan hier naar boven
        {
            y -= boardPositionSize;
        }
        boardPositions.push(createRect(x, y, boardPositionSize, boardPositionSize));
    }
}

function drawGameStart() {
    for (let i = 0; i < playerAmountButtons.length; i++) {
        let pos = playerAmountButtons[i];

        g.fillStyle = "#004400";
        g.fillRect(pos.x, pos.y, pos.w, pos.h);
        g.fillStyle = "#FFFFFF";
        g.fillText((i + 1) + "", pos.x, pos.y + 20);
        
    }
    g.fillText("Click the amount of players to start", uiWindow.x, uiWindow.y);
};

function drawIngame() {
    for (let i = 0; i < boardPositions.length; i++) {
        let pos = boardPositions[i];

        g.fillStyle = "#004400";
        g.fillRect(pos.x, pos.y, pos.w, pos.h);
        g.fillStyle = "#FFFFFF";
        g.fillText((i + 1) + "", pos.x, pos.y + 20);
    }
};


function initGame() {
    createBoardPositions();
    for (let index = 0; index < 4; index++) {
        let button = createRect(uiWindow.x + 5 + (index * 50), uiWindow.y + 50, 50, 50);
        button.playerAmount = index + 1;
        playerAmountButtons.push(button);
    }

}

initGame();
draw();
drawGameStart();
