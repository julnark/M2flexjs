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
let images = {};

let lastRoll = -1;

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
};

function clearCanvas() {
    g.fillStyle = "lightslategray";
    g.fillRect(0, 0, canvas.width, canvas.height);
};

function draw() {
    clearCanvas();
    if (gameState == gamestate_start) {
        drawGameStart();
    }
    else if (gameState == gamesstate_ingame) {
        drawIngame();
        drawUI();
    }
};

function createBoardPositions() {
    let x = 0;
    let y = canvas.height - boardPositionSize;
    let path = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    for (let i = 0; i < path.length; i++) {
        if (path[i] == 1)//gaan naar rechts
        {
            x += boardPositionSize + 5;
        }
        else if (path[i] == 3)//gaan naar links
        {
            x -= boardPositionSize + 5;
        }
        else if (path[i] == 0)//gaan hier naar boven
        {
            y -= boardPositionSize + 5;
        }
        boardPositions.push(createRect(x, y, boardPositionSize, boardPositionSize));
    }
};

function drawGameStart() {
    for (let i = 0; i < playerAmountButtons.length; i++) {
        let pos = playerAmountButtons[i];
        g.fillStyle = "#004400";
        g.fillRect(pos.x, pos.y, pos.w, pos.h);
        g.fillStyle = "#FFFFFF";
        g.fillText((i + 1) + "", pos.x, pos.y + 20);
        g.drawImage(images["pawn" + i + ".png"], pos.x, pos.y, pos.w, pos.h)
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
    let snakesImage = images["snakes.png"];
    g.drawImage(snakesImage, 0, 55, 600, 600)

    for (let i = 0; i < pawnPositions.length; i++) {
        let pos = pawnPositions[i];
        let boardI = pos.boardI;

        let boardpos = boardPositions[boardI];
        let pawnSize = boardPositionSize / 2;

        if (i == 0) {
            g.drawImage(images["pawn" + i + ".png"], boardpos.x, boardpos.y, pawnSize, pawnSize)
        } else if (i == 1) {
            g.drawImage(images["pawn" + i + ".png"], boardpos.x + pawnSize, boardpos.y, pawnSize, pawnSize)
        } else if (i == 2) {
            g.drawImage(images["pawn" + i + ".png"], boardpos.x, boardpos.y + pawnSize, pawnSize, pawnSize)
        } else if (i == 3) {
            g.drawImage(images["pawn" + i + ".png"], boardpos.x + pawnSize, boardpos.y + pawnSize, pawnSize, pawnSize)
        }
    }
};

function initGame() {
    createBoardPositions();
    for (let index = 0; index < 4; index++) {
        let Button = createRect(uiWindow.x + 5 + (index * 50), uiWindow.y + 50, 50, 50);
        Button.playerAmount = index + 1;
        playerAmountButtons.push(Button);
    }
};

function loadImages() {
    let sources = [
        "img/dice1.png", "img/dice2.png", "img/dice3.png", "img/dice4.png", "img/dice5.png", "img/dice6.png",
        "img/pawn0.png", "img/pawn1.png", "img/pawn2.png", "img/pawn3.png",
        "img/snakes.png",
        "img/trophy.png",
        "img/window.png",
    ]
    let scope = this;
    let loaded = 0;
    for (let i = 0; i < sources.length; i++) {
        let img = new Image();
        img.onload = function () {
            loaded++;
            if (loaded == sources.length) {
                imagesLoaded();
            }
        };
        img.src = sources[i];
        images[sources[i].replace("img/", "")] = img;
    }
};

function imagesLoaded() {
    initGame();
    canvas.addEventListener("click", (e) => { canvasClicked(e) });
    draw();
};

function canvasClicked(mouseEvent) {
    if (gameState == gamestate_start) {
        let mX = mouseEvent.clientX;
        let mY = mouseEvent.clientY;
        for (let i = 0; i < playerAmountButtons.length; i++) {
            const button = playerAmountButtons[i];
            let hitButton = inRect(mX, mY, button);
            if (hitButton == true) {
                startGame(button.playerAmount);
                break;
            }
        }
    }
    else if (gameState == gamesstate_ingame) {
        if (ingameState == ingamestate_start) {
            startRoll();
        }
    }

};

function inRect(px, py, rect) {
    let result = (px >= rect.x && px <= rect.x2 && py >= rect.y && py <= rect.y2)
    return result;
};

function startGame(playerAmount) {
    gameState = gamesstate_ingame;
    ingameState = ingamestate_start;
    pawnPositions = [];
    playerTurn = 0;
    winner = -1;
    console.log("playerAmount " + playerAmount);
    for (let i = 0; i < playerAmount; i++) {
        let poppetje = createPawn(i)
        pawnPositions.push(poppetje)
    }
    draw();
};

function createPawn(playerI) {
    return { boardI: 0, playerI: playerI };
};

function startRoll() {
    ingameState = ingamestate_roll;
    lastRoll = -1
    draw();
    setTimeout(endRoll, 500);
};

function endRoll() {
    lastRoll = Math.floor(Math.random() * 6) + 1;
    draw();
    ingameState = ingamestate_end;

};

function drawUI() {
    if (ingameState == ingamestate_roll) {
        if (lastRoll == -1) {
            g.fillText("rollen....", 20, 20);
        } else {
            g.drawImage(images["dice" + lastRoll + ".png"], 5, 5, 50, 50)
        }
    }

    if (ingamestate_start == ingameState) {
        g.drawImage(images["pawn" + playerTurn + ".png"], 5,5,50,50)
     }
};

loadImages();
drawGameStart();