export default class Background{
	constructor(ctx, cvs, sprite){
		this.ctx = ctx;
		this.sprite = sprite;

		this.sX = 0;
		this.sY = 0;
		this.w = 275;
		this.h = 226;
		this.x = 0;
		this.y = cvs.height - 226;
	}


	draw(){
	    this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
	    this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
	}
}