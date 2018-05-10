
// width and height are int values width :={1,2,3} height:= {1,2}
function Cactus(wIntInit,hIntInit,xInit){

	const w = 25;
	const h = 35;

	this.wInt = wIntInit;
	this.hInt = hIntInit;
	this.width = w * this.wInt;
	this.height = h * this.hInt;

	this.x = xInit;

	this.show = function(){

			fill(255);
			noStroke();
			rect(this.x, ySol - this.height,this.width,this.height);

	}

	this.update = function(){
		this.x -= vitObstacle;

		if(this.x + this.width<= 0){
			this.reset();
		}

	}
	// Reset la position et la forme du cactus
	this.reset = function(){
		this.x = WIDTH;
		this.wInt = Math.floor(random(1,4));
		console.log(this.wInt);
		this.hInt = Math.floor(random(1,3));

		this.width = w * this.wInt;
		this.height = h * this.hInt;

	}
	

}