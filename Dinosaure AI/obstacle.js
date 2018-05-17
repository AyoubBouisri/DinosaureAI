// width and height are int values width :={1,2,3} height:= {1,2}
function Obstacle(xInit, sketch) {

    this.sketch = sketch;
    this.wInt;
    this.hInt;
    this.height = smallCactus.height;
    this.width = smallCactus.width;
    this.y = ySol - this.height;
    this.x = xInit;
    this.isBird = false;
    let img = smallCactus;
    this.show = function() {
        // hit box
        //this.sketch.stroke(244, 66, 56);
        //this.sketch.noFill();
        //this.sketch.rect(this.x, this.y, this.width, this.height);

        if (this.isBird) {
            if (this.sketch.frame == 1) {
                img = bird1;


            } else {
                img = bird2;

            }

        }
        this.sketch.image(img, this.x, this.y);



    }

    this.update = function() {
            this.x -= this.sketch.vitObstacle;

            if (this.x + this.width <= 0) {
                this.reset(WIDTH);
            }

        }
        // Reset la position et la forme du cactus
    this.reset = function(x) {
        this.x = x;
        this.wInt = Math.floor(this.sketch.random(2, 4));
        this.hInt = Math.floor(this.sketch.random(1, 3));



        this.isBird = false;
        if (this.hInt == 1) {
            if (this.wInt == 1) {
                // small cactus

                img = smallCactus;


            } else if (this.wInt == 2) {
                //medium cactus

                img = mediumCactus;


            } else if (this.wInt == 3) {

                img = thiccCactus;
            }

        } else if (this.hInt == 2) {
            if (this.wInt == 1) {
                // tall cactus
                img = tallCactus;
            } else {
                // set the image of a bir
                this.isBird = true;

                img = bird1;
                this.height = img.height - 10;
                this.width = img.width - 5;

                if (this.wInt == 2) {
                    // low bird 
                    // set y
                    this.y = ySol - dinoIdle.height * 1.5;

                } else if (this.wInt == 3) {
                    // highBird
                    //set y
                    this.y = ySol - dinoIdle.height * 2.5;

                }


            }
        }




        if (!this.isBird) {
            this.height = img.height;
            this.y = ySol - this.height;
            this.width = img.width;
        }


    }





    this.intersects = function(player) {
        // Methode that checks if its intersecting with the player

        return !(
            this.x + this.width <= player.x ||
            this.x >= player.x + player.width ||
            this.y + this.height <= player.y ||
            this.y >= player.y + player.height
        );

    }
}