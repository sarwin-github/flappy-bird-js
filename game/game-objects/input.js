const SCORE_S = document.getElementById("audio-score");
const FLAP    = document.getElementById("audio-flap");
const HIT     = document.getElementById("audio-hit");
const SWOOSHING = document.getElementById("audio-swoosh");
const DIE     = document.getElementById("audio-die");

export default class Input{
	constructor(cvs, ctx, pipes, bird, score, state){
		// START BUTTON COORD
		const startBtn = {
		    x : 120,
		    y : 263,
		    w : 83,
		    h : 29
		}

		// CONTROL THE GAME
		cvs.addEventListener("click", function(evt){
		    switch(state.current){
		        case state.getReady:
		            state.current = state.game;
		            SWOOSHING.play();
		            break;
		        case state.game:
		            if(bird.y - bird.radius <= 0) return;
		            bird.flap();
		            FLAP.play();
		            break;
		        case state.over:
		            let rect = cvs.getBoundingClientRect();
		            let clickX = evt.clientX - rect.left;
		            let clickY = evt.clientY - rect.top;
		            
		            // CHECK IF WE CLICK ON THE START BUTTON
		            if(clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h){
		                pipes.reset();
		                bird.speedReset();
		                score.reset();
		                state.current = state.getReady;
		            }
		            break;
		    }
		});
	}
}