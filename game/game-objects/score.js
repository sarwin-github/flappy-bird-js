export default class Score{
	constructor(ctx, cvs, state){
		this.ctx = ctx;
		this.cvs = cvs;
		this.state = state;

		this.best = parseInt(localStorage.getItem("best")) || 0;
    	this.value = 0;
	}

	draw(){
	    this.ctx.fillStyle = "#FFF";
	    this.ctx.strokeStyle = "#000";
	    
	    if(this.state.current == this.state.game){
	        this.ctx.lineWidth = 2;
	        this.ctx.font = "35px Teko";
	        this.ctx.fillText(this.value, this.cvs.width/2, 50);
	        this.ctx.strokeText(this.value, this.cvs.width/2, 50);
	        
	    }else if(this.state.current == this.state.over){
	        // SCORE VALUE
	        this.ctx.font = "25px Teko";
	        this.ctx.fillText(this.value, 225, 186);
	        this.ctx.strokeText(this.value, 225, 186);
	        // BEST SCORE
	        this.ctx.fillText(this.best, 225, 228);
	        this.ctx.strokeText(this.best, 225, 228);
	    }
	}
	
	reset(){
	    this.value = 0;
	}
}