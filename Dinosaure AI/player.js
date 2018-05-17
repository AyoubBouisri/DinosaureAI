function Player(xInit, ySol, sketch, hasBrain, brain) {

    this.sketch = sketch;
    this.height = dinoIdle.height;
    this.width = dinoIdle.width - 15;
    const yInit = ySol - this.height;
    const jumpPower = -8;
    this.vitY = 0;
    this.acc = 0;


    this.x = xInit;
    this.xSprite = xInit - 7;
    this.y = yInit;
    this.inAir = false;
    this.crouching = false;

    this.img = dinoIdle;


    if (hasBrain) {
        if (brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
            this.brain.mutate(mutation);

        } else {
            // 4 inputs -> dinos y , dinos ySpeed , closest obstacle x, closest obstacle y
            // 3 outputs -> up,down,nothing
            this.brain = new NeuralNetwork(5, 5, 3);
        }
        this.score = 0;
        this.fitness = 0;

    }
    // Update the dinosaur according to the force of gravity.
    this.update = function() {
            this.score++;
            if (this.inAir) {
                this.acc += this.sketch.grav;
                this.vitY += this.acc;
                this.y += this.vitY;



                if (this.y >= yInit) {
                    this.vitY = 0;
                    this.acc = 0;
                    this.inAir = false;
                    this.y = yInit;
                }


            }
        }
        // Draw a rectangle that represents the player.
    this.show = function() {
        // hit box
        //this.sketch.noFill();
        //this.sketch.stroke(244, 66, 56);
        //rect(this.x, this.y, this.width, this.height);

        if (sketch.gameOver) {
            this.img = deadDino;
            this.height = deadDino.height;
            this.width = deadDino.width;
            if (this.crouching) {
                this.y = yInit;
            }

        }

        this.sketch.image(this.img, this.xSprite, this.y);

    }
    this.findClosest = function(obstacles) {
        let closestDist = Infinity;
        let closestObst = null;
        for (let obstacle of obstacles) {
            //if behind dont calculate
            if (obstacle.x + obstacle.width > this.x) {
                if (obstacle.x - this.x < closestDist) {
                    closestDist = obstacle.x - this.x;
                    closestObst = obstacle;
                }
            }
        }

        return closestObst;
    }
    this.copy = function() {
        return new Player(xInit, ySol, this.sketch, true, this.brain);
    }
    this.think = function(obstacles) {
            // create the inputs 

            let inputs = [];
            let closest = this.findClosest(obstacles);
            inputs[0] = this.y / HEIGHT; // y input
            inputs[1] = this.vitY / jumpPower; // y Speed
            if (closest) {
                inputs[2] = (closest.x - this.x) / WIDTH; // distance from the closest
                inputs[3] = (closest.y - this.y) / (HEIGHT / 1.5); // distance y from the closest
            } else {
                inputs[2] = 0.0;
                inputs[3] = 0.0;
            }

            inputs[4] = sketch.vitObstacle / 50;




            let outputs = this.brain.predict(inputs);

            // find the highest output 
            let highest = 0;
            let index = 0;
            for (let i = 0; i < outputs.length; i++) {
                if (outputs[i] > highest) {
                    highest = outputs[i];
                    index = i;
                }
            }

            // according to the highest output, make a move
            /*
				1 = up
				2 = down
				3 = nothing
           	*/

            if (index == 1) {
                if (!this.inAir) {
                    this.jump();
                }
                this.up(true);
            } else {
                this.up(false);
                if (index == 2) {
                    this.down(true);
                } else {
                    this.down(false);
                }
            }
        }
        // makes the player jump, can only jump if not in the air.
    this.jump = function() {

        if (!this.inAir) {
            // apply a force on the player (acceleration)
            this.vitY = jumpPower;
            if (this.crouching) {
                this.crouching = false;
                this.height = dinoIdle.height;
                this.width = dinoIdle.width - 15;
                this.y = yInit;
                this.img = dinoIdle;
            }


            this.inAir = true;
        }
    }

    this.down = function(isPressed) {
        if (!this.inAir) {
            // fall down faster
            if (isPressed) {
                this.crouching = true;
                this.height = crouchedDino1.height;
                this.width = crouchedDino1.width - 15;
                this.y = yInit + this.height;
                if (this.sketch.frame == 1) {
                    this.img = crouchedDino1;
                } else {
                    this.img = crouchedDino2;
                }


            } else {
                if (this.sketch.frame == 1) {
                    this.img = runningDino1;
                } else {
                    this.img = runningDino2;
                }

                this.crouching = false
                this.width = dinoIdle.width - 15;
                this.height = dinoIdle.height;
                this.y = yInit;
            }


        } else {
            // The player is in the air so make him fall faster 
            if (isPressed) {
                this.sketch.grav = gravFast;
            } else {
                this.sketch.grav = gravNormal;
            }

        }
    }

    this.up = function(isPressed) {
        if (this.inAir) {
            // the player is in the air so make him fall slower
            if (isPressed) {
                this.sketch.grav = gravSlow;
            } else {
                this.sketch.grav = gravNormal;
            }
        }
    }




}