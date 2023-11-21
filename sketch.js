var bg,bgImg;
var player, shooterImg, shooter_shooting,shooter1,zoombe,bulletimg,shooting,zombieGroup,bulletGroup
var heart,heartimg, heart2,heart2img,heart_3,reset,spawndraculaGroup,flash,flameSound
var gameState=0
var score=0

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
shooter1= loadImage("assets/shooter_1.png")
  bgImg = loadImage("assets/bg.jpeg")
  zoombe = loadImage("assets/zombie.png")
bulletimg= loadImage("assets/bullet.png.png")
shooting=loadSound("assets/explosion.mp3")
flameSound= loadSound("assets/lose.mp3")
reset = loadImage("assets/reset.png")
draculaimg= loadImage("assets/dracula.png")
flash=loadImage("assets/blueFlash.png")
}

function setup() {
  
  
  
  createCanvas(windowWidth,windowHeight);

  //adding the background image

  bg = createSprite(displayWidth/2-20,displayHeight/2-40,1000,1000)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite



restart = createSprite(1165,80,50,50);
restart.addImage(reset);
restart.scale = 0.2;
restart.visible = false;

player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
 
  player.debug = true
   
  /player.setCollider("rectangle",0,0,300,300)
  zombieGroup= new Group()
  spawndraculaGroup= new Group()
bulletGroup= new Group()
flashGroup= new Group()
score=0
}

function draw() {
  background(0); 
  
 if (gameState===0){
  score = score + Math.round(getFrameRate()/60);
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }
  if(keyWentDown("space")){
 
    player.addImage(shooter_shooting)
   
  }
  else if(keyDown("space")){
 
    player.addImage(shooter1)
   }
   if (bulletGroup.isTouching(zombieGroup)){
     zombieGroup.destroyEach()
     
  
   }
   if (zombieGroup.isTouching(player)||(spawndraculaGroup.isTouching(player))){
    gameState=1
   }
   
   if (flashGroup.isTouching(spawndraculaGroup)){
    spawndraculaGroup.destroyEach()
   }
   if (keyDown("space")){
     spawnbullet()
   }
   if (keyDown("enter")){
    spawnFlash()
   }
   zombie()
   
   
if (score>500){
  spawndracula()
}
if (score>=300){
  zombieGroup.setVelocityXEach(-10)
  spawndraculaGroup.setVelocityXEach(-10)
}
}

 else if(gameState===1){
  restart.visible = true;
  player.velocityX=0
  zombieGroup.setVelocityXEach(0)
  spawndraculaGroup.setVelocityXEach(0)
  
  if(mousePressedOver(restart)) {
    Reset();
  }
 }

drawSprites();
fill("red")
textSize(25)
  text("Score: "+ score, 1090,50);
}
function zombie(){
  if (frameCount%55===0){
    var zombie = createSprite(1000,600,60,60)
    zombie.y = Math.round(random(75,875))
  zombie.scale=0.2
  zombie. addImage("fly",zoombe)
  zombie.velocityX=-4
  zombieGroup.add(zombie)
  }
}

function spawnbullet(){
  
    bullet = createSprite(player.x,player.y,20,20)
    bullet.addImage("kill",bulletimg)
    bullet.velocityX=4 
    bullet.scale = 0.1
   shooting.play()
  
  bulletGroup.add(bullet)
}
 function Reset(){
  gameState = 0
  restart.visible = false;
  zombieGroup.destroyEach();
  spawndraculaGroup.destroyEach();
score=0
 }
 function spawndracula(){
  if( frameCount%200===0){
  var dracula= createSprite(1000,600,60,60)
  dracula.y= Math.round(random(75,875))
  dracula.scale=0.5
  dracula.addImage("blood",draculaimg)
  dracula.velocityX=-7
  spawndraculaGroup.add(dracula);
  }
 }


 function spawnFlash(){
  var flame= createSprite(player.x,player.y,20,20)
  flame.addImage("blue",flash)
  flame.velocityX=4
flashGroup.add(flame)
flameSound.play()
 }