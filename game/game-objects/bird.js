const SCORE_S = document.getElementById("audio-score");
const FLAP    = document.getElementById("audio-flap");
const HIT     = document.getElementById("audio-hit");
const SWOOSHING = document.getElementById("audio-swoosh");
const DIE     = document.getElementById("audio-die");
const DEGREE  = Math.PI/180;
let frames = 0;

export default class Bird {
	constructor(ctx, cvs, sprite, state){
		this.ctx = ctx;
		this.sprite = sprite;
		this.state = state;
		this.cvs = cvs;

		this.animation = [
	        {sX: 276, sY : 112},
	        {sX: 276, sY : 139},
	        {sX: 276, sY : 164},
	        {sX: 276, sY : 139}
	    ];

	    this.x = 50;
	    this.y = 150;
	    this.w = 34;
	    this.h = 26;
	    this.radius = 12;
	    this.frame = 0;
	    this.gravity = 0.25;
	    this.jump = 4.6;
	    this.speed = 0;
	    this.rotation = 0;
	    this.fgh = 112;
	}

	draw(){
		let bird = this.animation[this.frame];
		
		this.ctx.save();
		this.ctx.translate(this.x, this.y);
		this.ctx.rotate(this.rotation);
		this.ctx.drawImage(this.sprite, bird.sX, bird.sY, this.w, this.h,- this.w/2, - this.h/2, this.w, this.h);
		this.ctx.restore();
	}

	flap(){
		this.speed =- this.jump
	}
		    
	update(){
		// IF THE GAME STATE IS GET READY STATE, THE BIRD MUST FLAP SLOWLY
		this.period = this.state.current == this.state.getReady ? 10 : 5;
		// WE INCREMENT THE FRAME BY 1, EACH PERIOD
		this.frame += frames%this.period == 0 ? 1 : 0;
		// FRAME GOES FROM 0 To 4, THEN AGAIN TO 0
		this.frame = this.frame%this.animation.length;
		
		if (this.state.current == this.state.getReady) {
		    this.y = 150; // RESET POSITION OF THE BIRD AFTER GAME OVER
		    this.rotation = 0 * DEGREE;
		} else {
		    this.speed += this.gravity;
		    this.y += this.speed;
		    
		    if(this.y + this.h/2 >= this.cvs.height - this.fgh){
		        this.y = this.cvs.height - this.fgh - this.h/2;
		        if(this.state.current == this.state.game){
		            this.state.current = this.state.over;
		            DIE.play();
		        }
		    }
		    
		    // IF THE SPEED IS GREATER THAN THE JUMP MEANS THE BIRD IS FALLING DOWN
		    if(this.speed >= this.jump){
		        this.rotation = 45 * DEGREE;
		        this.frame = 1;
		    }else{
		        this.rotation = -25 * DEGREE;
		    }
		}

		frames++;
	}

	speedReset(){
		this.speed = 0;
	}   
}