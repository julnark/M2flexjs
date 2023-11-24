let canvas = document.getElementById("canvas");
let g = canvas.getContext("2d");

const gamesstate_start =0;
const gamesstate_ingame=1;
const gamesstate_gameover=2;

const ingamestate_start=0;
const ingamestate_roll=1;
const ingamestate_end=0;

let boardPositionSize= 50;
let pawnPositions= [];
let boardPosition= [];
let playerAmountButtons= [];
