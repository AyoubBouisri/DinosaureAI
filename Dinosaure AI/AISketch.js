var AISketch = function(sketch) {
    sketch.grav = gravNormal;

    sketch.vitObstacle = vitObstacleInit;

    sketch.score = 0;
    sketch.obstacles;
    sketch.dinoPop = 500;
    sketch.dinos = [];
    sketch.dinosSaved = [];
    sketch.oneObstacle = false;
    sketch.slider;
    sketch.gameOver = false;

    sketch.frame = 1;



    sketch.preload = function() {
        dinoIdle = sketch.loadImage("assets/dinoIdle.png");
        smallCactus = sketch.loadImage("assets/smallCactus.png");
        mediumCactus = sketch.loadImage("assets/mediumCactus.png");
        thiccCactus = sketch.loadImage("assets/thiccCactus.png");
        tallCactus = sketch.loadImage("assets/tallCactus.png");
        crouchedDino1 = sketch.loadImage("assets/crouchedDino1.png");
        crouchedDino2 = sketch.loadImage("assets/crouchedDino2.png");
        runningDino1 = sketch.loadImage("assets/runningDino1.png");
        runningDino2 = sketch.loadImage("assets/runningDino2.png");
        deadDino = sketch.loadImage("assets/deadDino.png");
        bird1 = sketch.loadImage("assets/bird1.png")
        bird2 = sketch.loadImage("assets/bird2.png")
    }

    sketch.setup = function() {
        sketch.createCanvas(WIDTH, HEIGHT);
        sketch.background(bg);
        sketch.slider = sketch.createSlider(1, 20, 1);
        // create the initial population
        for (let i = 0; i < sketch.dinoPop; i++) {
            sketch.dinos[i] = new Player(xPlayer, ySol, sketch, true);

        }

        sketch.obstacles = [new Obstacle(WIDTH, sketch), new Obstacle(WIDTH * 1.5, sketch)];
        sketch.obstacles[0].reset(WIDTH);
        sketch.obstacles[1].reset(WIDTH * 1.5);

        // load the images
    }

    sketch.draw = function() {


        //  update the population
        for (let i = 0; i < sketch.slider.value(); i++) {


            for (let dino of sketch.dinos) {
                //make the dino decide a move
                dino.think(sketch.obstacles);
                dino.update();

            }

            // update the obstacles
            for (let i = 0; i < sketch.obstacles.length; i++) {

                sketch.obstacles[i].update();


                // check if the dinos intersects this obstacle
                for (let j = sketch.dinos.length - 1; j >= 0; j--) {
                    if (sketch.obstacles[i].intersects(sketch.dinos[j])) {
                        // delete the dino from the population and add him to the saved one 
                        sketch.dinosSaved.push(sketch.dinos.splice(j, 1)[0]);


                    }
                }


            }

            // check if all the dinos are dead
            if (sketch.dinos.length == 0) {

                sketch.dinos = nextGen(sketch, sketch.dinosSaved);
                sketch.dinosSaved = [];
                sketch.score = 0;

                // reset the obstacles

                sketch.obstacles = [new Obstacle(WIDTH, sketch), new Obstacle(WIDTH * 1.5, sketch)];
                sketch.vitObstacle = vitObstacleInit;
                sketch.oneObstacle = false;

            }


            sketch.vitObstacle += acceleration;
            // If the speed of the game is at a certain point only spawn 1 obstacle 
            if (!sketch.oneObstacle) {
                if (sketch.score > 700 && sketch.obstacles[1].x >= WIDTH) {
                    sketch.obstacles.splice(1, 1);

                    sketch.oneObstacle = true;
                }
            }


            //update the animation frame

            if (sketch.score % animationSpeed == 0) {
                //change the frame
                if (sketch.frame == 1) {
                    sketch.frame = 2;
                } else {
                    sketch.frame = 1;
                }
            }
            sketch.score++;


        }
        // draw everything 

        sketch.background(bg);
        // draw the ground   
        sketch.stroke(black);
        sketch.line(0, ySol - offSetSol, WIDTH, ySol - offSetSol);

        for (let dino of sketch.dinos) {
            dino.show();
        }

        for (let obstacle of sketch.obstacles) {
            obstacle.show();
        }


        //print the score
        sketch.stroke(83);
        sketch.fill(83);
        sketch.textSize(14);
        sketch.text(sketch.score, 0, 20);

    }





}

var AIP5 = new p5(AISketch, 'AISketch');