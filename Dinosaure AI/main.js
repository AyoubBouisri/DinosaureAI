const WIDTH = 1000;
const HEIGHT = 400;
const xPlayer = 80;
const ySol = HEIGHT - 50;
const offSetSol = 20;
const gravNormal = 0.04
const gravFast = 0.06;
const gravSlow = 0.03;

let grav = gravNormal;


const vitObstacleInit = 5;
let vitObstacle = vitObstacleInit;
let score = 0;
var obstacles;
var dino;

var oneObstacle = false;


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
	
	// events to controle the dino

	if(keyIsDown(DOWN_ARROW)){
		dino.down(true);
	}else{
		dino.down(false);
	}
	// draw and update the obstacles
	for(let i =0;i<obstacles.length;i++){
		obstacles[i].update();
		obstacles[i].show();

	}

	
	// draw and update the dinosaur
	dino.update();
	dino.show();
	//afficher le score
	fill(255);
	textSize(32);
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
	score++;
}




function keyPressed(){
	// jump with space or up arrow
	if(key == ' ' || keyCode === UP_ARROW){
		dino.jump();
	}
}

