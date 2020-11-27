//PRO-C18: MONKEY GO HAPPY 2 by Mayank
//declaring vars
//Declare variables for game objects and behaviour indicators(FLAGS)
var monkey;
var ground;
var bananaGroup;
var obstacleGroup;
var survivalTime;
var bananaImg, obstacleImg, monkeyImg, backImg;
var back;
var gameState = 1;
var PLAY = 1;
var END = 0;
//Create Media library and load to use it during the course of the software //executed only once at the start of the program function preload() { }

function preload() {
  bananaImg = loadImage("banana.png")

  obstacleImg = loadImage("stone.png")

  monkeyImg = loadImage("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  backImg = loadImage("jungle.jpg");

}

//define the intial environment of the software(before it is used) //by defining the declared variables with default values //executed only once at the start of the program 
function setup() {


  ground = createSprite(80, 335, 800, 10);
  ground.scale = 2;
  ground.invisibilty = true;
  ground.velocityX = -2;

  back = createSprite(200, 200, 400, 400);
  back.addAnimation("backImg", backImg);
  back.scale = 0.5


  monkey = createSprite(80, 200, 10, 10);
  monkey.addAnimation("monkeyImg", monkeyImg);
  monkey.depth = monkey.depth + 5;
  monkey.scale = 0.10;
  console.log(monkey.y);








  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  survivalTime = 0;
}





function draw() {

  createCanvas(400, 400);

  //the survival Time
  stroke("white");
  textSize(20);
  fill("white");
  survivalTime = Math.ceil(World.frameCount / World.frameRate);
  text("Survival Time: " + survivalTime, 500, 50);

  if (gameState == PLAY) {

    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
    }

    // making ground infinite)
    if (ground.x < 0) {
      ground.x = ground.width / 2;

    }
    //gravity
    monkey.velocityY = monkey.velocityY + 0.5;
    monkey.collide(ground);


    //calling functions
    spawnBanana();
    spawnObstacles();


    //ability to jump
    if (keyDown("space") && monkey.y >= 200) {
      monkey.velocityY = -12;


    }

    switch (survivalTime) {
      case 10:
        monkey.scale = 0.12;
        break;
      case 20:
        monkey.scale = 0.14;
        break;
      case 30:
        monkey.scale = 0.16;
        break;
      case 40:
        monkey.scale = 0.12;
        break;
      default:
        break;  
    }

    if(monkey.isTouching(obstacleGroup)){
      ground.velocityX = 0;
      gameState = 0;
    }
    
  }

  if(gameState == END){
    stroke("white");
    textSize(50);
    text("GAMEOVER",200,200);
    bananaGroup.setLifeTimeEach = -1;
    obstacleGroup.setLifeTimeEach =  -1
    bananaGroup.setVelocityXEach = 0;
    obstacleGroup.setVelocityXEach = 0;
      
  }


  drawSprites();



}

//banna and obstacles
function spawnBanana() {
  if (World.frameCount % 80 == 0) {
    var banana = createSprite(410, 120, 20, 20);

    //random y position
    banana.y = random(120, 200);
    banana.velocityX = -5;

    //animations
    banana.addAnimation("bananaImg", bananaImg);
    banana.scale = 0.05;

    banana.lifetime = 100;

    //adding/destroying to group
    bananaGroup.add(banana);




  }
}

function spawnObstacles() {
  if (World.frameCount % 300 == 0) {
    var obstacle = createSprite(410, 295, 20, 20);
    obstacle.velocityX = -5;

    //animations
    obstacle.addAnimation("obstacleImg", obstacleImg);
    obstacle.scale = 0.25;

    obstacle.lifetime = 100;

    //adding/destroying to group
    obstacleGroup.add(obstacle);
  }
}