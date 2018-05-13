
// width and height are int values width :={1,2,3} height:= {1,2}
function Obstacle(wIntInit,hIntInit,xInit){

	const w = 25;
	const h = 35;
	const chanceToBeBird = 4; // out of 10
	this.wInt = wIntInit;
	this.hInt = hIntInit;
	this.width = w * this.wInt;
	this.height = h * this.hInt;
	this.y = ySol - this.height;
	this.x = xInit;

	this.show = function(){

			fill(255);
			noStroke();
			
			rect(this.x, this.y,this.width,this.height);

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
		this.hInt = Math.floor(random(1,3));


		let isBird = false;
		if(this.wInt == 1){
			// give it a chance to be a brid 
			let chance = Math.floor(random(1,11));
			if(chance <= 5){
				// make it a bird
				isBird = true;
			}
		}


		// if its a bird give it the height it deserves
		if(isBird){
			this.height = h;
			this.y = ySol - this.height - h * this.hInt;
		}else{
			this.height = h * this.hInt;
			this.y = ySol - this.height;
		}

		this.width = w * this.wInt;
		

	}
	
	this.intersects = function(player){
		// Methode that checks if its intersecting with the player

		return !(
				    this.x + this.width <= player.x           		 ||
				    this.x           	>= player.x + player.width   ||
				    this.y + this.height  	<= player.y              ||
				    this.y           	>= player.y + player.height
		 													 			);

	}
}