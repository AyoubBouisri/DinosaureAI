function Player(xInit, ySol) {

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



    // Update the dinosaur according to the force of gravity.
    this.update = function() {
            if (this.inAir) {
                this.acc += grav;
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
        noFill();
        stroke(244, 66, 56);
        // hit box
        //rect(this.x, this.y, this.width, this.height);
        if (gameOver) {
            this.img = deadDino;
            this.height = deadDino.height;
            this.width = deadDino.width;
            if (this.crouching) {
                this.y = yInit;
            }

        }

        image(this.img, this.xSprite, this.y);




    }

    // makes the player jump, can only jump if not in the air.
    this.jump = function() {

        if (!this.inAir) {
            // apply a force on the player (acceleration)
            this.vitY = jumpPower;
            if (this.crouching) {
                this.crouching = false;
                this.height = dinoIdle.height;
                this.width = dinoWidth - 15;
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
                if (frame == 1) {
                    this.img = crouchedDino1;
                } else {
                    this.img = crouchedDino2;
                }


            } else {
                if (frame == 1) {
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
                grav = gravFast;
            } else {
                grav = gravNormal;
            }

        }
    }

    this.up = function(isPressed) {
        if (this.inAir) {
            // the player is in the air so make him fall slower
            if (isPressed) {
                grav = gravSlow;
            } else {
                grav = gravNormal;
            }
        }
    }




}