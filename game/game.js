import Bird from './game-objects/bird';
import Foreground from './game-objects/foreground';
import GameOver from './game-objects/game-over';
import GetReady from './game-objects/get-ready';
import Background from './game-objects/background';
import Pipe from './game-objects/pipes';
import Score from './game-objects/score';
import Input from './game-objects/input';

// SELECT CVS
const cvs = document.getElementById("bird");
const ctx = cvs.getContext("2d");

// LOAD SPRITE IMAGE
const sprite = document.getElementById("img-object");

// LOAD SOUNDS
const SCORE_S = document.getElementById("audio-score");
const FLAP    = document.getElementById("audio-flap");
const HIT     = document.getElementById("audio-hit");
const SWOOSHING = document.getElementById("audio-swoosh");
const DIE     = document.getElementById("audio-die");

let frames = 0;

// GAME STATE
const state = {
    current : 0,
    getReady : 0,
    game : 1,
    over : 2
}

const bird       = new Bird(ctx, cvs, sprite, state);
const foreground = new Foreground(ctx, cvs, sprite, state);
const getReady   = new GetReady(ctx, cvs, sprite,state);
const background = new Background(ctx, cvs, sprite);
const gameOver   = new GameOver(ctx, cvs, sprite, state);
const score      = new Score(ctx, cvs, state);
const pipes      = new Pipe(ctx, cvs, sprite, state, bird, score);
const input      = new Input(cvs, ctx, pipes, bird, score, state);


function draw(){
	ctx.fillStyle = "#70c5ce";
	ctx.fillRect( 0, 0, cvs.width, cvs.height);

	background.draw();
	pipes.draw();
	bird.draw();
	foreground.draw();
	getReady.draw();
	gameOver.draw();
	score.draw();
}

function update(){
	bird.update();
	foreground.update();
	pipes.update();
}

function loop(){
	update();
	draw();
	frames++;
	requestAnimationFrame(loop);
}

loop();