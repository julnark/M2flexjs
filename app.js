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
    }
};

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
};


function initGame() {
    createBoardPositions();
    for (let index = 0; index < 4; index++) {
        let button = createRect(uiWindow.x + 5 + (index * 50), uiWindow.y + 50, 50, 50);
        button.playerAmount = index + 1;
        playerAmountButtons.push(button);
    }

};

function loadImages() {
    let sources = [
        "img/dice1.png", "img/dice2.png", "img/dice3.png", "img/dice4.png", "img/dice5.png", "img/dice6.png",
        "img/pawn0.png", "img/pawn1.png", "img/pawn2.png", "img/pawn3.png",
        "img/snakes.png",
        "img/trophy.png",
        "img/window.png",
    ];

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
    draw();
    canvas.addEventListener("click", (e) => { canvasClicked(e) });
};

function canvasClicked(mouseEvent) {
    let mX = mouseEvent.clientX;
    let mY = mouseEvent.client;
    let hitButton = inRect(mX, mY, button);
    if (gameState == gamestate_start) {
        for (let i = 0; i < playerAmountButtons.length; i++) {
            let button = playerAmountButtons[i];
            if (hitButton == true) {
                startGame(button.playerAmount)
                break;
            }
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
    pawnPositions = [];//maak een nieuwe pionnen lijst
    playerTurn = 0;
    winner = -1;
    console.log("playerAmount" + playerAmount);
    for (let i = 0; i < playerAmount; i++) {
    }
    draw();
};

function createPawn(playerI) {
    return { boardI: 0, playerI: playerI };
};

loadImages();
drawGameStart();
