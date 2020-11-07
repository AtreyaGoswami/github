var monkey_running,bananaImage,obstacleImage,obstacleGroup,sceneImage;
var scene,score,monkey,ground;
var bananaGroup,obstacleGroup;

function preload(){
  bananaImage=loadImage("banana.png");
 monkey_running=loadImage("CaringHelpfulAntbear-size_restricted.gif"
);
  
  obstacleImage=loadImage("stone.png");
  sceneImage=loadImage("jungle2.jpg");
}



function setup() {
  createCanvas(800, 400);
  
monkey=createSprite(100,340,20,20);
monkey.addAnimation("monkey",monkey_running);
monkey.scale=0.1;


scene=createSprite(0,0,800,400);
scene.addImage(sceneImage);
scene.scale=1.5;
scene.velocityX=-3; 
scene.x=scene.width/2;
  
ground=createSprite(400,350,800,10); 
ground.velocityX=-4; /*if we dont move the ground then monkey will be always at the leftmost corner. We want the monkey to move forward*/
ground.x=ground.width/2;
ground.visible=false; 
  
score=0;
  
obstacleGroup= new Group();
bananaGroup= new Group();
}

function draw() {
  background(220);
  
  
  //Resetting ground to support monkey. Since ground is moving backward, if we dont reset it, there will be no more ground to support the monkey and monkey will fall
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(scene.x<0){
    scene.x=scene.width/2;
  }
  
  if(keyDown("space") ) {
      monkey.velocityY = -12;
  }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
    spawnbananaGroup();
    spawnObstacle();
  
  if(bananaGroup.isTouching(monkey)){
    score=score+2;
    bananaGroup.destroyEach();
  }
  
  switch(score){
    case 10 : monkey.scale=0.14;
              break;              
    case 20:  monkey.scale=0.16;
              break;
    case 30:  monkey.scale=0.18;
              break;
    case 40:  monkey.scale=0.2;
              break;
    default:  break;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.1;
  }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,500,50);
}

function spawnObstacle(){
  if(frameCount % 300 === 0){
    var obstacle=createSprite(800,380,10,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-6;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }
}

function spawnbananaGroup(){
  if(frameCount % 100 === 0){
    var banana=createSprite(600,380,40,10);
    banana.y = random(120,200); 
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.velocityX=-5;
    banana.lifetime=300;
    monkey.depth = banana.depth + 1;
    
    bananaGroup.add(banana);
  }
}