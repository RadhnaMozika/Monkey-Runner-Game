var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground, groundImage;
var score = 0;
var survivalTime = 0;


function preload() {
  //loading the images and animation for the game
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}


function setup() {
  createCanvas(400, 400);

  //creating the sprite for monkey and adding animation
  monkey = createSprite(80, 315, 20, 30);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  //creating ground
  ground = createSprite(200, 350, 800, 10);
  ground.x = ground.width / 2;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background("white");

  //resetting the ground when it crosses halfway 
  ground.velocityX = -4;
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  monkey.collide(ground);
  //adding gravity
  monkey.velocityY = monkey.velocityY + 0.8;

  //making the monkey jump when space key is pressed
  if (keyDown("space") && monkey.y >= 225) {
    monkey.velocityY = -12;
  }

  //console.log(frameCount);

  //printing score and survival time
  score = 0;
  fill("white");
  stroke("white");
  textSize(15);
  text("Score - " + score, 180, 20);

  fill("black");
  stroke("black");
  textSize(15);
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time - " + survivalTime, 140, 40);

  //calling the functions for spawning food and rocks
  spawnFood();
  spawnObstacles();
  drawSprites();
}


function spawnFood() {
  //spawning bananas every 80 frames
  if (frameCount % 80 == 0) {
    //creating sprite, adding velocity and image
    banana = createSprite(400, 200, 10, 30);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;

    //setting lifetime
    banana.lifetime = 110;

    //adding rocks to a group
    FoodGroup.add(banana);
  }
}


function spawnObstacles() {
  //spawning rocks every 300 frames
  if (frameCount % 300 == 0) {
    //creating sprite, adding velocity and image
    obstacles = createSprite(400, 310, 50, 50);
    obstacles.velocityX = -4;
    obstacles.addImage(obstaceImage);
    obstacles.scale = 0.2;

    //setting lifetime
    obstacles.lifetime = 110;

    //adding rocks to a group
    obstacleGroup.add(obstacles);
  }
}
