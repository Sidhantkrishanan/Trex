var trex,trex_running;
var trex_collide;
var ground;
var groundImg;
var PLAY=1;
var END=0;
var gameState=PLAY;
var cloudImg;
var o1,o2,o3,o4,o5,o6;
var cloudsGrp;
var obsGrp;
var gameOver;
var restart;
var gameOverImg;
var restartImg;
var jump;
var die;
var checkpoint;
function preload()
{
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collide=loadAnimation("trex_collided.png");
  groundImg=loadImage("ground2.png");
  cloudImg=loadImage("cloud.png");
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
  o3=loadImage("obstacle3.png");
  o4=loadImage("obstacle4.png");
  o5=loadImage("obstacle5.png");
  o6=loadImage("obstacle6.png");
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png"); 
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkpoint=loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 400);
  trex=createSprite(30,350);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collide)
  trex.scale=0.5;
  ground=createSprite(200,350);
  ground.addImage(groundImg);
  cloudsGrp=new Group();
  obsGrp=new Group();
  gameOver=createSprite(300,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.7;
  gameOver.visible=false;
  restart=createSprite(300,190);
  restart.addImage(restartImg);
  restart.scale=0.5;
  restart.visible=false;
}

function draw() {
  background(180);
  if(gameState===PLAY){
    
  if(keyDown("space")&&trex.y>320)
  {
   trex.velocityY=-15;
   jump.play();
  }
    
  trex.velocityY=trex.velocityY+0.8;
  
  ground.velocityX=-6;  
  
  if (ground.x < 0){
  ground.x = ground.width/2;
  }
    spawnClouds();
    spawnObstacles();
    if(obsGrp.isTouching(trex))
    {
      gameState=END;    
      die.play();  
    }
     gameOver.visible=false;
     restart.visible=false;
  } 
  
  else if(gameState===END)
    {
      ground.velocityX=0;
      trex.velocityY=0;
      cloudsGrp.setVelocityXEach(0);
      obsGrp.setVelocityXEach(0);
      trex.changeAnimation("collided",trex_collide);
      obsGrp.setLifetimeEach(-1);
      cloudsGrp.setLifetimeEach(-1);
      gameOver.visible=true;
      restart.visible=true;
      if(mousePressedOver(restart))
      {
       gameState=PLAY;   
       obsGrp.destroyEach();
       cloudsGrp.destroyEach(); 
       trex.changeAnimation("running",trex_running);
      }
    }
  trex.collide(ground );
  
  drawSprites();
 
}
function spawnClouds()
{
 if(frameCount%70===0)
 {
  var clouds=createSprite(600,200)
  clouds.addImage(cloudImg);
  clouds.velocityX=-4;
  clouds.lifetime=134;
  clouds.y=Math.round(random(200,100));
  cloudsGrp.add(clouds); 
 }

}
function spawnObstacles()
{
if(frameCount%90===0){
  var obstacles=createSprite(600,320);
obstacles.velocityX=ground.velocityX
obs=Math.round(random(1,6));
switch(obs)
{
  case 1:obstacles.addImage(o1);
    break;
  case 2:obstacles.addImage(o2);
    break;
  case 3:obstacles.addImage(o3);
    break; 
  case 4:obstacles.addImage(o4);
    break;
  case 5:obstacles.addImage(o5);
    break;
  case 6:obstacles.addImage(o6);
    break;
  default: break;
}
  obstacles.scale=0.7;
  obstacles.lifetime=140;
  obsGrp.add(obstacles);
}
}  
  