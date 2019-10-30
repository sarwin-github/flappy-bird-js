export default class GameOver{
	constructor(ctx, cvs, sprite, state){
		this.ctx = ctx;
		this.sprite = sprite;
		this.state = state;

		this.sX = 175;
    	this.sY = 228;
    	this.w = 225;
    	this.h = 202;
    	this.x = cvs.width/2 - 225/2;
    	this.y = 90;
	}

	draw(){
	    if(this.state.current == this.state.over){
	        this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);   
	    }
	}
}