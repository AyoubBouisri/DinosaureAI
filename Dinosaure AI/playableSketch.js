const WIDTH = 600;
const HEIGHT = 250;
//The x position of the player
const xPlayer = 80;
//The coordinates of the line that represents the ground and its offSet with where the player is.
const ySol = HEIGHT - 30;
const offSetSol = 10;
// The 3 grav acceleration to simulate a long/small/normal jump
const gravNormal = 0.1;
const gravFast = 0.3;
const gravSlow = 0.04;
// Initial speed of the obstacles
const vitObstacleInit = 5;
const acceleration = 0.001;
// COLORS
const bg = 247;
const black = 83;

const animationSpeed = 8;
// grav that will be applied on the player
var playableSketch = function(sketch) {
    sketch.grav = gravNormal;

    sketch.vitObstacle = vitObstacleInit;

    sketch.score = 0;
    sketch.obstacles;
    sketch.dino;
    sketch.oneObstacle = false;

    sketch.gameOver = false;

    sketch.frame = 1;

    sketch.pause = true;



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
        sketch.dino = new Player(xPlayer, ySol, sketch, false);
        sketch.obstacles = [new Obstacle(WIDTH, sketch), new Obstacle(WIDTH * 1.5, sketch)];

        // load the images
    }

    sketch.draw = function() {
        if (!sketch.pause) {

            sketch.background(bg);
            // draw the ground xd  
            sketch.stroke(black);
            sketch.line(0, ySol - offSetSol, WIDTH, ySol - offSetSol);



            // events to controle the dino
            if (sketch.keyIsDown(sketch.UP_ARROW) || sketch.keyIsDown(32)) {
                if (sketch.gameOver) {
                    // restart
                    sketch.restart();
                } else {
                    if (!sketch.dino.inAir) {
                        sketch.dino.jump();
                    }
                    sketch.dino.up(true);
                }

            } else {
                if (!sketch.gameOver) {
                    sketch.dino.up(false);
                    if (sketch.keyIsDown(sketch.DOWN_ARROW)) {
                        sketch.dino.down(true);
                    } else {
                        sketch.dino.down(false);
                    }
                }
            }




            // draw and update the dinosaur

            if (!sketch.gameOver) {

                sketch.dino.update();
                sketch.score++;
            }
            sketch.dino.show();
            // draw and update the obstacles
            for (let i = 0; i < sketch.obstacles.length; i++) {
                if (!sketch.gameOver) {
                    sketch.obstacles[i].update();
                }
                sketch.obstacles[i].show();
                // check if the player intersects this obstacle

                if (sketch.obstacles[i].intersects(sketch.dino)) {
                    sketch.gameOver = true;
                }

            }
            //afficher le score
            sketch.stroke(83);
            sketch.fill(83);
            sketch.textSize(14);
            sketch.text(sketch.score, 0, 20);

            // monter le score

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
        }

    }

    sketch.restart = function() {
        sketch.dino = new Player(xPlayer, ySol, sketch, false);
        sketch.obstacles = [new Obstacle(WIDTH, sketch), new Obstacle(WIDTH * 1.5, sketch)];
        this.score = 0;
        this.vitObstacle = vitObstacleInit;

        this.gameOver = false;
    }





}


var playableP5 = new p5(playableSketch, 'playableSketch');