export default class Foreground{
	constructor(ctx, cvs, sprite, state){
		this.ctx = ctx;
		this.state = state;
		this.sprite = sprite;

		this.sX = 276;
		this.sY = 0;
		this.w = 224;
		this.h = 112;
		this.x = 0;
		this.y = cvs.height - 112;
		this.dx  = 2;
	}

	draw(){
	    this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
	    this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
	}
	
	update(){
	    if(this.state.current == this.state.game){
	        this.x = (this.x - this.dx)%(this.w/6);
	    }
	}
	
}