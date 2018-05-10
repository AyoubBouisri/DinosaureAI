function Player(xInit, ySol){
	const heightInit = 65;
	this.height = heightInit;
	this.width = 45;
	const yInit = ySol - this.height ;
	const jumpPower = -12;
	this.vitY = 0;
	this.acc = 0;


	this.x = xInit;
	this.y = yInit;
	this.inAir = false;
	this.crouching = false;
	

	// Update the dinosaur according to the force of gravity.
	this.update = function(){
		if(this.inAir){
			this.acc += grav;
			this.vitY += this.acc;
			this.y += this.vitY;

			
			
				if(this.y >= yInit){
					this.vitY = 0;
					this.acc = 0;
					this.inAir = false;
					this.y = yInit;
				}
			
				
		}
	}
	// Draw a rectangle that represents the player.
	this.show = function(){
		noStroke();
		fill(255);
		rect(this.x,this.y,this.width,this.height);
	}
	// makes the player jump, can only jump if not in the air.
	this.jump = function(){
		if(!this.inAir){
			// apply a force on the player (acceleration)
			this.vitY = jumpPower;
			if(this.crouching){
				this.crouching = false;
				this.height = heightInit;
				this.y = yInit;
			}


			this.inAir = true;
		}
	}

	this.down = function(isPressed){
		if(!this.inAir){
			// fall down faster
			if(isPressed){
				this.crouching = true;
				this.height=heightInit/2;
				this.y = yInit + this.height;

			}else{
				this.crouching = false
				this.height = heightInit;
				this.y = yInit;
			}
			

		}
	}


	
	
}