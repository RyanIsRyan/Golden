var player;
var gameState;
var START=0;
var PLAY=1;
var DRIVE=2;
var GHOST=3;
var DRIVE2=4;
var PLAY2=5;
var choose=6;
var lose=7;
var win=8;
var sbutton;
var arcadefont,s;
var car, c,g;
var random;
var ggroup;
var ghost;
var csound;
var cimage,coin;
var screen;
var vent,venti;
var body, bodyi;
var stack, stacki;
var pieces;
var piece;
var slot;
var cash;
var yesno, yesi;
var yes;
var no;
var trexmachine,timage;
var insert;
var coined=0;
var whole,wholei;
function preload(){
 arcadefont=loadFont("ARCADE.TTF");
  loadFont("ARCADE.TTF");
  s=loadImage("startg.png");
  insert=loadImage("insert.png");
  c=loadImage("c.png");
  cimage=loadImage("Coin.png");
  timage=loadImage("trexmachine.png");
  g=loadImage("ghost.png");
  csound=loadSound("coinsound.wav");
  piece=loadSound("piece.wav");
  cash=loadSound("kaching.mp3");
  stacki=loadImage("stick.png");
  venti=loadImage("vent.png");
  bodyi=loadImage("body.png");
  yesi=loadImage("No.png");
  wholei=loadImage("whole.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  gameState=START;
  player=createSprite(30,displayHeight/2,50,50);

  sbutton=createSprite(displayWidth/2,displayHeight/2+100,200,100);
  sbutton.shapeColor="white";
  sbutton.addImage(s);
  sbutton.scale=0.7;

  ghost=createSprite(displayWidth/2,displayHeight/2,10,10);
  ghost.scale=0.25;
  ghost.addImage(g);
  ggroup= new Group;

  car=createSprite(displayWidth/2,displayHeight/2,20,20);
  car.addImage(c);
  car.scale=0.5;

  
  coin=createSprite(displayWidth-displayWidth/4,displayHeight/2-100,10,10);
  coin.addImage(cimage);

  screen=createSprite(displayWidth/2,displayHeight/2,600,200)
  screen.addImage(insert);
  
  
  trexmachine = createSprite(displayWidth/2+400,displayHeight/2-400,20,50);
  trexmachine.addImage(timage);
  trexmachine.visible=false;
  trexmachine.scale=0.25;
  
  vent=createSprite(200,displayHeight/2-400,50,50);
  vent.addImage(venti);
  vent.scale=0.4;
  
  yesno= createSprite(displayWidth/2,displayHeight/2+300,30,30);
  yesno.addImage(yesi);
  yesno.scale=0.8;
  stack=createSprite(trexmachine.x-600,trexmachine.y,50,50);
  stack.addImage(stacki);
  stack.visible=false;
  stack.scale=0.2;
  body=createSprite(displayWidth/2,displayHeight/2-300,50,50);
  body.addImage(bodyi);
  body.visible=false;
  whole=createSprite(displayWidth/2,displayHeight/2,50,50);
  whole.addImage(wholei);
  whole.visible=false;
  body.scale=0.2;
}

function draw() {
  console.log("x= "+ mouseX);
  console.log("y= "+ mouseY);
  console.log(pieces);
  //random=rand(-30,30);
  console.log(gameState);
  background(225,225,225);
 
  //console.log(mouseX);
 // console.log(mouseY);
    if(gameState===START){
      background(46, 176, 80);
      text("coined"+ coined,400,500);
      textFont(arcadefont);
      player.visible=false;
      ghost.visible=false;
      car.visible=false;
      coin.visible=false;
      vent.visible=false;
      //sbutton.visible=false;
      screen.visible=false;
      yesno.visible=false;
      textSize(50);
      fill('black');
      text("The Quest to  Beat G loba l Warming",displayWidth/2-400,displayHeight/2-200);
      if(mousePressedOver(sbutton)){
        gameState++;
        

      }
    }
    if(gameState===PLAY){
      sbutton.visible=false;
      screen.visible=false;
      
      text("coined"+ coined,400,500);
      //sbutton.visible=false;
      player.visible=true;
      car.visible=true;
      vent.visible=true;
      background(255,255,255);
      if(keyDown(UP_ARROW)){
        player.y=player.y-10
      }
      if(keyDown(DOWN_ARROW)){
        player.y=player.y+10
      }
      if(keyDown(LEFT_ARROW)){
        player.x=player.x-10
      }
      if(keyDown(RIGHT_ARROW)){
        player.x=player.x+10
      }
      if(player.isTouching(vent)){
        vent.destroy();
        pieces++;
        piece.play();
      }
      if(player.isTouching(car)){
        player.x=car.x+80;
        player.y=car.y-50;
        gameState=DRIVE;
      }
    }
    if(gameState===GHOST){
      background(255,255,255);
      ghost.visible=true;
      ghost.velocityY=-15;
      if(ghost.y<0){
        gameState=DRIVE2;
        car.x=0;
        
        ggroup.destroyEach();
      }
      
    }
    if (gameState===DRIVE2) {
      background(220,220,220);
      if(frameCount/10===0){
        gl=createSprite(car.x-150,car.y+Math.round(random(-30,30)),30,30);
        ggroup.add(gl);
        ggroup.lifeTime=100;
        
      }
      text("coined"+ coined,400,500);
      player.x=car.x+80;
        player.y=car.y-50;
      if (car.x===displayWidth/2) {
        car.velocityX=0;
        gameState=choose;
      }
    }
    if(gameState===DRIVE && car.x < displayWidth+100){
      car.velocityX=10;
      player.x=car.x+80;
        player.y=car.y-50;
        vent.visible=false;
      background(255,255,255);
      frameCount=0;
      if(frameCount/10===0){
        gl=createSprite(car.x-150,car.y+Math.round(random(-30,30)),30,30);
        ggroup.add(gl);
        }
      
    }
    if(car.x>displayWidth+100){
      gameState=GHOST;
    }
    if(gameState===choose){
      yesno.visible=true;
      yes=createSprite(yesno.x-200,yesno.y,200,200);
      yes.visible=false;
     no=createSprite(yesno.x+500,yesno.y,200,200);
     no.visible=false;
     if(mousePressedOver(yes)){
       gameState=lose;
       yesno.destroy();
       yes.destroy();
       no.destroy();
     }
     if(mousePressedOver(no)){
      gameState=PLAY2;
      yesno.destroy();
      yes.destroy();
      no.destroy();
    }
    }
    if(gameState===lose){
      car.velocityX=10;
        player.x=car.x+80;
          player.y=car.y-50;
          background(107,107,107);
      if(car.x>displayWidth){
        background(0,0,0);
        ghost.velocityY=0;
      ghost.y=displayHeight/2;
      car.destroy();
      player.destroy();
      
      
      fill("red");
      textSize=200;
      text("You Lose, the world has become too polluted.",displayWidth/2-100,displayHeight/2+100);
      
      }
      
    }
   

    if(gameState===PLAY2){
      console.log(coined);
      coin.visible=true;
      text("coined"+ coined,400,500);
      trexmachine.visible=true;
      screen.depth = coin.depth;
      coin.depth = coin.depth + 1;
      trexmachine.depth = player.depth;
      player.depth = player.depth + 1;
      background(200,200,200);
      if(pieces===3){
        whole.visible=true;
        background(253,253,253)
        if(keyDown(UP_ARROW)){
          player.y=player.y-10
        }
        if(keyDown(DOWN_ARROW)){
          player.y=player.y+10
        }
        if(keyDown(LEFT_ARROW)){
          player.x=player.x-10
        }
        if(keyDown(RIGHT_ARROW)){
          player.x=player.x+10
        }
        if(player.isTouching(body)){
          body.destroy();
          pieces++;
          piece.play();
        }
      }
      if(coined===2){
        if(keyDown(UP_ARROW)){
          player.y=player.y-10
        }
        if(keyDown(DOWN_ARROW)){
          player.y=player.y+10
        }
        if(keyDown(LEFT_ARROW)){
          player.x=player.x-10
        }
        if(keyDown(RIGHT_ARROW)){
          player.x=player.x+10
        }
        if(player.isTouching(body)){
          body.destroy();
          pieces++;
          piece.play();
      }
      console.log(gameState);
      if(player.isTouching(car) && coined===1){
        background(150,150,150);
        car.velocityX=10;
        player.x=car.x+80;
          player.y=car.y-50;
          
         
          }
          if(car.x>displayWidth){
            trexmachine.destroy();
            background(150,150,150);
            body.visible=true;
            
          }
          coined=coined+1;
        frameCount=0;
        if(frameCount/10===0){
          gl=createSprite(car.x-150,car.y+Math.round(random(-30,30)),30,30);
          ggroup.add(gl);
          }
      }
      if(screen.visible===true){
        slot=createSprite(1300,549,0.001,200);
        if(coin.isTouching(slot)){
          coin.destroy();
          cash.play();
          screen.destroy();
          slot.destroy();
          coined=coined+1;
        }
      }
      if(coined===1){
      stack.visible=true;
      }
      if(player.isTouching(stack)){
        stack.destroy();
        pieces++;
        piece.play();
      }
      if(keyDown(UP_ARROW)){
        player.y=player.y-10;
      }
      if(keyDown(DOWN_ARROW)){
        player.y=player.y+10;
      }
      if(keyDown(LEFT_ARROW)){
        player.x=player.x-10;
      }
      if(keyDown(RIGHT_ARROW)){
        player.x=player.x+10;
      }
      if (player.isTouching(coin) && coin.x===displayWidth-displayWidth/4) {
        csound.play();
        coin.x=displayWidth-displayWidth+100;
      }
      if(mousePressedOver(coin) ){
        coin.x= mouseX;
        coin.y= mouseY;
      }
      if (player.isTouching(trexmachine) ) {
       screen.visible=true;
      }
    }
  drawSprites();
}

