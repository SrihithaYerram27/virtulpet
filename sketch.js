//Create variables here
var dog,happyDog,database,foodS,foodstock;
var database;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog =loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,5,5);
  dog.addImage("dog",dogImg);
  dog.scale = 0.25;
  //dog.addImage()
  dog.addImage("happy dog",happyDog);
  foodstock =database.ref('food');
  foodstock.on("value",readStock)
}


function draw() {  
  background(46, 139, 87);
  fill("white");
  textSize(20);
  text("PRESS UP_ARROW TO FEED THE DOG",100,50);

  if(keyWentDown(UP_ARROW)){
    writestock(foodS);
    dog.changeImage("happy dog",happyDog);
  }

  dog.display();
  drawSprites();
  //add styles here
  
  text("FOODSTOCK: "+foodS,150,150);
}

function readStock(data){
  foodS = data.val();
}

function writestock(x){

  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }

  database.ref('/').update({
    food:x
  })
}



