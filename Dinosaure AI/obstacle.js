// width and height are int values width :={1,2,3} height:= {1,2}
function Obstacle(xInit) {

    this.wInt;
    this.hInt;
    this.height = smallCactus.height;
    this.width = smallCactus.width;
    this.y = ySol - this.height;
    this.x = xInit;
    this.isBird = false;
    let img = smallCactus;
    this.show = function() {

        stroke(244, 66, 56);
        noFill();
        // hit box
        //rect(this.x, this.y, this.width, this.height);

        if (this.isBird) {
            if (frame == 1) {
                img = bird1;


            } else {
                img = bird2;

            }

        }
        image(img, this.x, this.y);



    }

    this.update = function() {
            this.x -= vitObstacle;

            if (this.x + this.width <= 0) {
                this.reset();
            }

        }
        // Reset la position et la forme du cactus
    this.reset = function() {
        this.x = WIDTH;
        this.wInt = Math.floor(random(1, 4));
        this.hInt = Math.floor(random(1, 3));


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