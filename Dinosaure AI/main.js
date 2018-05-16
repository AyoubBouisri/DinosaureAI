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

// grav that will be applied on the player
let grav = gravNormal;

let vitObstacle = vitObstacleInit;
let acceleration = 0.005;
let score = 0;
var obstacles;
var dino;
var oneObstacle = false;

let gameOver = false;
// COLORS
const bg = 247;
const black = 83;
// IMAGES 
let dinoIdle;
let runningDino1;
let runningDino2;
let deadDino; // 07
let crouchedDino1;
let crouchedDino2;
let smallCactus;
let mediumCactus;
let thiccCactus;
let tallCactus;
let bird1;
let bird2;

let frame = 1;
let animationSpeed = 8;
let cmptr = 0;




function preload() {
    dinoIdle = loadImage("assets/dinoIdle.png");
    smallCactus = loadImage("assets/smallCactus.png");
    mediumCactus = loadImage("assets/mediumCactus.png");
    thiccCactus = loadImage("assets/thiccCactus.png");
    tallCactus = loadImage("assets/tallCactus.png");
    crouchedDino1 = loadImage("assets/crouchedDino1.png");
    crouchedDino2 = loadImage("assets/crouchedDino2.png");
    runningDino1 = loadImage("assets/runningDino1.png");
    runningDino2 = loadImage("assets/runningDino2.png");
    deadDino = loadImage("assets/deadDino.png");
    bird1 = loadImage("assets/bird1.png")
    bird2 = loadImage("assets/bird2.png")
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
    background(51);
    dino = new Player(xPlayer, ySol);
    obstacles = [new Obstacle(WIDTH), new Obstacle(WIDTH * 1.5)];

    // load the images




}

function draw() {
    background(bg);
    // draw the ground xd  
    stroke(black);
    line(0, ySol - offSetSol, WIDTH, ySol - offSetSol);


    if (!gameOver) {
        // events to controle the dino
        if (keyIsDown(UP_ARROW) || keyIsDown(32)) {
            dino.up(true);
        } else {
            dino.up(false);
            if (keyIsDown(DOWN_ARROW)) {
                dino.down(true);
            } else {
                dino.down(false);
            }
        }
    }




    // draw and update the dinosaur
    if (!gameOver) {
        dino.update();
        score++;
    }
    dino.show();
    // draw and update the obstacles
    for (let i = 0; i < obstacles.length; i++) {
        if (!gameOver) {
            obstacles[i].update();
        }
        obstacles[i].show();
        // check if the player intersects this obstacle
        if (obstacles[i].intersects(dino)) {
            gameOver = true;
        }
    }
    //afficher le score
    stroke(83);
    textSize(14);
    text('SCORE : ' + score, 0, 20);

    // monter le score

    vitObstacle += acceleration;
    // If the speed of the game is at a certain point only spawn 1 obstacle 
    if (!oneObstacle) {
        if (score > 1000 && obstacles[1].x >= WIDTH) {
            obstacles.splice(1, 1);

            oneObstacle = true;
        }
    }


    //update the animation frame

    if (score % animationSpeed == 0) {
        //change the frame
        if (frame == 1) {
            frame = 2;
        } else {
            frame = 1;
        }
    }

}




function keyPressed() {
    if (!gameOver) {
        // jump with space or up arrow
        if (key == ' ' || keyCode === UP_ARROW) {
            dino.jump();
        }
    }

}