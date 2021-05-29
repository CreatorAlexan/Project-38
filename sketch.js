var gameState = 0;
var playButton;
var jpManImg, missileImg,zapperImg,startScreenImg;
var man;
var ground;
var zapperGroup;



function preload(){

    jpManImg = loadImage("images/jetpackMan1.png")
    missileImg = loadImage("images/missile.png")
    zapperImg = loadImage("images/zapper.png")
    startScreenImg = loadImage("images/startScreen.png")

}

function setup(){
    createCanvas(displayWidth,displayHeight);

    zapperGroup = new Group();
    
}

function draw(){
    background(240,240,240);

    if(gameState == 0){
        waitState();
    }

    if(gameState == 1){
        playState();
    }

    if(gameState == 2){
        endState();
    }

    
    drawSprites();
}

function waitState(){

    background(startScreenImg)

    playButton = createButton("PLAY")
    playButton.position(displayWidth/2,displayHeight/2-300)

    playButton.mousePressed(()=>{
        hideButton();
        gameState = 1;
    })

}

function playState(){

    ground = createSprite(displayWidth/2,665,displayWidth,40)
    ground.shapeColor = "black"

    man = createSprite(displayWidth/2-500,displayHeight/2)
    man.addImage(jpManImg)
    man.scale = 0.2
    man.debug = true;
    man.setCollider("rectangle",+50,0,300,1000)
    man.velocityY = man.velocityY + 0.8

    if(man.isTouching(ground)){
        man.collide(ground)
    }

    if(keyCode == UP_ARROW){
        man.velocityY = man.velocityY - 10
    }

    if(man.collide(zapperGroup)){
        gameState = 2;
        man.velocityY = 0;
        man.velocityX = 0;
        zapperGroup.setVelocityXEach(0);
        zapperGroup.setLifetimeEach(-1);
    }

    spawnZappers();


}

function endState(){

}

function spawnZappers(){

    if(frameCount % 200 == 0){
        var zapper = createSprite(displayWidth/2+500,displayHeight/2+90)
        zapper.addImage(zapperImg);
        zapper.scale = 0.5
        zapper.setCollider("rectangle",0,0,325,300);
        zapper.debug = true;
        zapper.velocityX = -4
        zapper.lifetime = 1000
        zapperGroup.add(zapper);
    }
    if(frameCount % 150 == 0){
        var zapper2 = createSprite(displayWidth/2+500,displayHeight/2-400)
        zapper2.addImage(zapperImg);
        zapper2.scale = 0.5
        zapper2.setCollider("rectangle",0,0,325,300);
        zapper2.debug = true;
        zapper2.velocityX = -4
        zapper2.lifetime = 1000
        zapperGroup.add(zapper2);
    }
}

function hideButton(){
    playButton.hide()
}