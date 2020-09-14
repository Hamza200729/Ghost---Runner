var tower,towerImage,door,doorImage,climber,climberImage;
var ghost,ghostImage,inviblock,inviblockImage;
var gameState = "play";



function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);  

  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 2;

  ghost = createSprite(300,200);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;
  
  doorGroup = createGroup();
  climberGroup = createGroup();
  inviblockGroup = createGroup();
}

function draw(){
 
  background(220);
  
  if (gameState === "play"){
    if (tower.y>600){
    tower.y = 300; 
  }
  
  if (keyDown("left_arrow")){
    ghost.x = ghost.x-4; 
  }
  
  if (keyDown("right_arrow")){
    ghost.x = ghost.x+4; 
  }
  
  if (keyDown("space")){
    ghost.velocityY = -4; 
  }
  
  ghost.velocityY = ghost.velocityY+0.8;
  
  if (climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if (inviblockGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState = "end";
  }
  spawndoors();
  
  drawSprites() 
  }
 
 if (gameState === "end"){
   stroke("yellow");
   textSize(30);
   fill("red");
   text("GameOver",260,300)
   
   
 }

}

function spawndoors(){
  if (frameCount % 180 === 0){
    door = createSprite(250,0); 
    door.addImage(doorImage);
    door.velocityY = 2;
    door.x = Math.round(random(100,555));
    doorGroup.add(door);
    climber = createSprite(250,50);
    climber.addImage(climberImage);
    climber.velocityY = 2;
    door.x = climber.x;
    climberGroup.add(climber);
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
    
    inviblock = createSprite(250,55);
    inviblock.width = climber.width;
    inviblock.height = 2;
    inviblock.visible = false;
    inviblock.velocityY = 2;
    inviblock.x = door.x;
    inviblockGroup.add(inviblock);
  }
}