export default class GetReady{
	constructor(ctx, cvs, sprite, state){
		this.ctx = ctx;
		this.state = state;
		this.sprite = sprite;

		this.sX = 0;
		this.sY = 228;
		this.w = 173;
		this.h = 152;
		this.x = cvs.width/2 - 173/2;
		this.y = 80;
	}

	draw(){
	    if(this.state.current == this.state.getReady){
	        this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
	    }
	}
}