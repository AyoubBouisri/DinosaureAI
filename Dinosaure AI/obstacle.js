// width and height are int values width :={1,2,3} height:= {1,2}
function Obstacle(xInit) {

    const w = 25;
    const h = 35;
    const chanceToBeBird = 4; // out of 10

    this.wInt;
    this.hInt;
    this.height = smallCactus.height;
    this.width = smallCactus.width;
    this.y = ySol - this.height;
    this.x = xInit;
    this.isBird = false;
    let img = smallCactus;
    this.show = function() {

        stroke(black);
        fill(bg);
        // rect(this.x, this.y, this.width, this.height);

        if (img != null) {
            image(img, this.x, this.y);
        }


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


        let isBirdTemp = false;
        if (this.wInt == 1) {
            // give it a chance to be a brid 
            let chance = Math.floor(random(1, 11));
            if (chance <= 5) {
                // make it a bird
                //isBirdTemp = true;
            }
        }

        this.isBird = isBirdTemp;


        // if its a bird give it the height it deserves
        if (this.isBird) {
            this.height = h;
            this.y = ySol - this.height - h * this.hInt;
            img = null;
        } else {
            if (this.hInt == 1) {
                if (this.wInt == 1) {
                    // small cactus
                    this.height = smallCactus.height;
                    this.width = smallCactus.width;
                    img = smallCactus;


                } else if (this.wInt == 2) {
                    //medium cactus
                    this.height = mediumCactus.height;
                    this.width = mediumCactus.width;
                    img = mediumCactus;


                } else if (this.wInt == 3) {
                    this.height = thiccCactus.height;
                    this.width = thiccCactus.width;
                    img = thiccCactus;
                }

            } else if (this.hInt == 2) {
                this.height = tallCactus.height;
                this.width = tallCactus.width;
                img = tallCactus;
            }


            this.y = ySol - this.height;

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