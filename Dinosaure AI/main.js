const WIDTH = 1000;
const HEIGHT = 400;
//The x position of the player
const xPlayer = 80;
//The coordinates of the line that represents the ground and its offSet with where the player is.
const ySol = HEIGHT - 50;
const offSetSol = 20;
// The 3 grav acceleration to simulate a long/small/normal jump
const gravNormal = 0.08;
const gravFast = 0.3;
const gravSlow = 0.04;
// Initial speed of the obstacles
const vitObstacleInit = 5;

// grav that will be applied on the player
let grav = gravNormal;

let vitObstacle = vitObstacleInit;
let score = 0;
var obstacles;
var dino;
var oneObstacle = false;

let gameOver = false;

function setup(){
	createCanvas(WIDTH,HEIGHT);
	background(51);
	dino = new Player(xPlayer,ySol);
	obstacles =  [new Cactus(1,1,WIDTH),new Cactus(2,1,WIDTH * 1.5)];

}

function draw(){
	background(51);
	// draw the ground 
	stroke(255);
	line(0,ySol - offSetSol,WIDTH,ySol - offSetSol);
	
	
	if(!gameOver){
		// events to controle the dino
		if(keyIsDown(UP_ARROW)){
			dino.up(true);
		}else{
			dino.up(false);
			if(keyIsDown(DOWN_ARROW)){
				dino.down(true);
			}else{
				dino.down(false);
			}
		}
	}
	


	
	// draw and update the dinosaur
	if(!gameOver){
		dino.update();
		score++;
	}
	dino.show();
	// draw and update the obstacles
	for(let i =0;i<obstacles.length;i++){
		if(!gameOver){
			obstacles[i].update();
		}
		obstacles[i].show();
		// check if the player intersects this obstacle
		if(obstacles[i].intersects(dino)){
			gameOver = true;
		}
	}
	//afficher le score
	fill(255);
	textSize(25);
	text('Score : ' + score , 0,40);

	// monter le score
	if(score>500){
		let faster = Math.floor(score / 500);
		vitObstacle = vitObstacleInit + faster;
		// If the speed of the game is at a certain point only spawn 1 obstacle 
		if(!oneObstacle){
			if(score>2000 && obstacles[1].x >= WIDTH){
				obstacles.splice(1,1);
				oneObstacle = true;
			}
		}
	}
	
}




function keyPressed(){
	if(!gameOver){
		// jump with space or up arrow
		if(key == ' ' || keyCode === UP_ARROW){
			dino.jump();
		}
	}
	
}

