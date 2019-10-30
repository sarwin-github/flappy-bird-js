const SCORE_S = document.getElementById("audio-score");
const FLAP    = document.getElementById("audio-flap");
const HIT     = document.getElementById("audio-hit");
const SWOOSHING = document.getElementById("audio-swoosh");
const DIE     = document.getElementById("audio-die");
let frames    = 0;

export default class Pipes{
	constructor(ctx, cvs, sprite, state, bird, score){
		this.ctx = ctx;
		this.sprite = sprite;
		this.state = state;
		this.bird = bird;
		this.score = score;
		this.cvs = cvs;

		this.position = [];
		this.top = {
		    sX :553,
		    sY :0
		};

		this.bottom={
		    sX : 502,
		    sY : 0
		};

		this.w = 53;
		this.h = 400;
		this.gap = 95;
		this.maxYPos = -150;
		this.dx = 2;
	}

	draw(){
        for(let i  = 0; i < this.position.length; i++){
            let p = this.position[i];
            
            let topYPos = p.y;
            let bottomYPos = p.y + this.h + this.gap;
            
            // top pipe
            this.ctx.drawImage(this.sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);  
            
            // bottom pipe
            this.ctx.drawImage(this.sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);  
        }
    }
    
    update(){
    	let bird = this.bird;
    	let score = this.score;
    	
        if(this.state.current !== this.state.game) return;
        
        if(frames%100 == 0){
            this.position.push({
                x : this.cvs.width,
                y : this.maxYPos * ( Math.random() + 1)
            });
        }
        for(let i = 0; i < this.position.length; i++){
            let p = this.position[i];
            
            let bottomPipeYPos = p.y + this.h + this.gap;
            
            // COLLISION DETECTION
            // TOP PIPE
            if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h){
                this.state.current = this.state.over;
                HIT.play();
            }
            // BOTTOM PIPE
            if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h){
                this.state.current = this.state.over;
                HIT.play();
            }
            
            // MOVE THE PIPES TO THE LEFT
            p.x -= this.dx;
            
            // if the pipes go beyond canvas, we delete them from the array
            if(p.x + this.w <= 0){
                this.position.shift();
                score.value += 1;
                SCORE_S.play();
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }
        }

        frames++;
    }
    
    reset(){
        this.position = [];
    }
}