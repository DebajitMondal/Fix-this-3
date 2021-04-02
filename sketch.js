



var form,player,playerImg,Ground,nonplayer,nonplayerImg,Ground2,Ground3,Ground4;
var GameState = 1;
var Button1Img,Button2Img;
var Sate = 1;
var Enemy,Enemy2;
var EnemyGroup;
var speedState = 1;
var jumpState = 1;
var Life1,Life2,Life3,Lifebox,Life1Img,Life2Img,Life3Img,LifeboxImg;
var Health = 3;
var Fly, FlyImg;
var Speed,SpeedImg
function preload() {
  //Button1Img = loadImage("Untitled12.png")
  //Button2Img = loadImage("Untitled34.png")
  Life1Img = loadImage("Untitled51.png")
  Life2Img = loadImage("Untitled51.png")
  Life3Img = loadImage("Untitled51.png")
  LifeboxImg = loadImage("Untitled61.png")
  FlyImg = loadImage("Untitled59.png")
  SpeedImg = loadImage("Untitled69.png")
  nonplayerImg = loadAnimation("policeman_PNG89033.png","policeman_PNG89.png","policeman.png")
  playerImg = loadImage('unnamed.png')
}



function setup() {
  createCanvas(1200,400);
  
  form = new Form()
   
 player = createSprite(-50,105,30,30)
 player.addImage("RUNNING",playerImg)
 player.scale = 0.25
 player.visible = false;

 player.debug = true
 player.setCollider("rectangle",0,0,player.width,player.height)
 nonplayer = createSprite(-200,105,30,30)
 nonplayer.addAnimation("runing",nonplayerImg)
 nonplayer.debug = true
 nonplayer.scale = 0.2
 nonplayer.setCollider("rectangle",0,0,nonplayer.width,nonplayer.height)
 nonplayer.visible = false;

 Lifebox = createSprite(1100,30,20,20)
 Lifebox.addImage("Box",LifeboxImg)
 Lifebox.scale = 0.2
 Lifebox.visible = false;
 Ground = createSprite(width/2,390,20000,20)
  Ground.visible = false

 Ground2 = createSprite(-50,130,500,10);
 Ground2.visible = false;
 Ground3 = createSprite(200,110,10,50)
 Ground3.visible = false;

 if(Health === 3){
 Life1 = createSprite(1065,30,20,20)
 Life1.addImage("health",Life1Img)
 Life1.scale = 0.15
 Life1.visible = false

 Life2 = createSprite(1100,30,30,20)
 Life2.addImage("healt",Life2Img)
 Life2.scale = 0.15
 Life2.visible = false

 Life3 = createSprite(1135,30,30,20)
 Life3.addImage("heal",Life3Img)
 Life3.scale = 0.15
 Life3.visible = false
 }
 Restart = createButton('Restart');
 Restart.position(displayWidth/2 -10,displayHeight/2 - 100);
 Restart.hide();

 Back = createButton('Back');
 Back.position(displayWidth/2 +300,displayHeight/2 - 370);
 Back.hide();

 EnemyGroup = new Group();
 speedGroup = new Group();
 jumpGroup = new Group();
 fullGroup = new Group();
 GroundGroup = new Group()
}


function draw() {
  background("white");

  
  
  if(GameState === 1){
    form.display()
  }
  if(GameState === 2 ){
   
   console.log(frameCount)
    player.visible = true;
    player.velocityX = 6;
    Ground.visible = true;
    Ground2.visible = true;
    Ground3.visible = true;
    nonplayer.visible = true;
    Lifebox.visible = true;
    nonplayer.velocityX = 5;
    Life1.visible = true;
    Life2.visible = true;
    Life3.visible = true;
    
    //Ground.velocityX = 6
    //if (Ground.x > 800){ 
   ///  Ground.x = Ground.width/2; 
    //}

    if(nonplayer.isTouching(Ground3)){
      nonplayer.velocityY = -10;
      
    }
    nonplayer.velocityY = nonplayer.velocityY + 0.9

    if(player.isTouching(Ground3)){
      player.velocityY = -10;
    }
     player.velocityY = player.velocityY + 0.9


     if(player.isTouching(Ground)){
      Sate = 2
   }
   if(Sate === 2){
     camera.position.x = player.x+220;
     player.setCollider("rectangle",0,0,300,400)
     console.log("player",player.y)
     Lifebox.x = camera.x+500
     Life1.x = camera.x+465
     Life2.x = camera.x+500
     Life3.x = camera.x+535

     if(keyDown("space")  && player.y >= 300){
      player.velocityY = -13;
      player.velocityY = player.velocityY + 0.9
     
     }
     
     //console.log(speedState)
    // console.log("healthstate"+Health)
     //console.log(jumpState)
     //console.log(Sate)

     if(EnemyGroup.isTouching(player) && Health === 3){
     
     player.velocityX = 0
      Health = 2
      Life3.destroy();

     EnemyGroup.destroyEach()
     speedState = 1
     jumpState = 1
     }else if(EnemyGroup.isTouching(player) && Health === 2){
      player.velocityX = 0
      Health = 1
      Life2.destroy();
      EnemyGroup.destroyEach()
      speedState = 1
      jumpState = 1
     }else if(EnemyGroup.isTouching(player) && Health === 1){
      player.velocityX = 0
      Health = 0
      Life1.destroy();
      EnemyGroup.destroyEach()
      GameState = 3
      speedState = 1
      jumpState = 1
     }



     
 
     if(nonplayer.isTouching(EnemyGroup)){
       nonplayer.velocityY = -12;
       
     }
 
     if(nonplayer.isTouching(player)){
      GameState = 3;
     }
 
   if(speedGroup.isTouching(player)){
    speedState = 2;
    speedGroup.destroyEach();
   }
   if(speedState === 2){
     player.velocityX = 10;

 
    }
 
    if(jumpGroup.isTouching(player)){
     jumpState = 2;
     jumpGroup.destroyEach();
     }
   if(jumpState === 2){
      if(keyDown("space") && player.y >= 357){
       player.velocityY = -16;
       player.velocityY = player.velocityY + 0.9
      }
 

      
    }
 


   }

    

   spwanObstacle();
   speedPower();
   Powerjump()
   spwanGround();

   
  


  }

  if(GameState === 3){
    //console.log("you lose")
    spwanObstacle();
    speedPower();
    Powerjump()
    spwanGround();
   

    EnemyGroup.setVelocityXEach(0);
    player.velocityX = 0
    Restart.show();
    nonplayer.velocityX = 0
    Back.show();
    Restart.mousePressed(()=>{
      

       Restart.hide();
       GameState = 2
       Health = 3
       Sate = 1
       jumpState = 1
       speedState = 1
       EnemyGroup.destroyEach();
       jumpGroup.destroyEach();
       speedGroup.destroyEach();

   //    player.x = -200;
    //   player.y = 105;
       Ground.x = width/2;

     //  nonplayer.x = -200;
     //  nonplayer.y = 105;
       
       Life1 = createSprite(1065,30,20,20)
       Life1.addImage("health",Life1Img)
       Life1.scale = 0.15
       
      
       Life2 = createSprite(1100,30,30,20)
       Life2.addImage("healt",Life2Img)
       Life2.scale = 0.15
       
      
       Life3 = createSprite(1135,30,30,20)
       Life3.addImage("heal",Life3Img)
       Life3.scale = 0.15

     });

     Back.mousePressed(()=>{
      GameState = 1
      form.display()
  
     });
  }


  player.collide(Ground);
  nonplayer.collide(Ground);
  player.collide(Ground2);
  nonplayer.collide(Ground2);
  player.collide(GroundGroup);
  nonplayer.collide(GroundGroup);
 // console.log("gamestate",GameState)
  drawSprites();
}

function spwanObstacle(){
  push()
  if(frameCount % 270 === 0){
    Enemy = createSprite(camera.x+800,370,20,20)
   // Enemy.velocityX = -1
    var rand = Math.round(random(1,2))
    switch(rand){
     case 1: Enemy.shapeColor = "red"
             break;
     case 2: Enemy.shapeColor = "blue" 
     default: break;   

  }

  EnemyGroup.add(Enemy)
  
  pop()

  }





}




function speedPower(){
  if(frameCount % 800 === 0){
    Speed = createSprite(camera.x+800,367,20,20);
    Speed.addImage("speed",SpeedImg)
    Speed.scale = 0.16
    speedGroup.add(Speed);
  }
  

}




function Powerjump(){
if(frameCount % 1300 === 0){  
  Fly = createSprite(camera.x+800,367,20,20)
  Fly.addImage("fly",FlyImg)
  Fly.scale = 0.16
  jumpGroup.add(Fly)
}


}


function spwanGround(){
if(frameCount%1000 === 0){
 Ground4 = createSprite(camera.x,390,20000,20)  
 Ground4.shapeColor = "yellow"
 

 GroundGroup.add(Ground4)
}

}
