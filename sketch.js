//Pixel engine made with p5.js for the
//Nokia 3310 game jam
//Feel free to use this! Please do hack, modify and improve this 
//at your will

//Array representing the pixels
var screen = [];

//Number of pixels vertically and horizontally
var px = 84;
var py = 48;

//The size of each pixel in world space
var pSize = 8;

//Colours representing the colours of the real Nokia 3310.
//These are set in the setup() function and can be changed to any value
var white;
var black;

//sprites should be formatted like this:
//in string form, with the chararacter _ representing an empty pixel(white)
//and the character # representing a filled(black) pixel
//these sprites can then be drawn with the function drawSprite()
//i might make a sprite editor later on

//make sure all lines of the string are the same length
var testSprite = [
  "#__#",
  "#__#",
  "_##_",
  "####",
];

function setup() {
  white = color(199, 240, 216);
  black = color(67, 82, 61);

  createCanvas(px * pSize, py * pSize);

  clearScreen(0);

  
  //Edit this out
  for (var i = 0; i < px; i++) {
    for (var j = 0; j < py; j++) {
      if (random(5) > 3) setScreen(i, j, 1);
    }
  }
  
  //debug
  
  console.log("width of testSprite: " + getWidth(testSprite));
  console.log("height of testSprite: " + getHeight(testSprite));
  //
}

function draw() {
  background(white);
  
  //if you do this as 1, framerate goes ouch
  //when you need a black background, then just use
  //background(black);
  clearScreen(0);
  
  //Draw stuff here
  
  //test
  drawSprite(frameCount%px, frameCount%py, testSprite);
  
  //
  
  //You can edit this out too
  if (frameCount % 60 == 0) {
    console.log(floor(frameRate()));
  }
  //
  
  //Always put this function at the very end of the draw() loop
  drawScreen();
}

function drawScreen(){
  noStroke();

  for (var i = 0; i < px; i++) {
    for (var j = 0; j < py; j++) {
      if (screen[i][j] == 1) {
        fill(black);
        rect(i * pSize, j * pSize, pSize, pSize);
      }
    }
  }
}

//x = x position, y = y position, c = set value
function setScreen(x, y, c) {
  if (x >= 0 && x < px && y >= 0 && y < py) {
    screen[x][y] = c;
  }
}

//x = x position, y = y position, s = sprite, o = draw over other sprites?
//Sorry, no built-in animated sprites yet :(
function drawSprite(x, y, s, o) {
  //Sprites are drawn from the TOP-LEFT corner
  //This is to match the default in p5js
  
  var w = getWidth(s);
  var h = getHeight(s);
  
  for(var i = 0; i < w; i++) {
    for(var j = 0; j < h; j++) {
      var val = s[i][j];
      var rx = x+j;
      var ry = y+i;
      
      switch(val) {
        case '_':
          if(o) {
            setScreen(rx, ry, 0);
          }
          break;
        case '#':
          setScreen(rx, ry, 1)
          break;
      }
    }
  }
}

//wb = white(0) or black(1) so the colour which the new grid is to be filled with
function clearScreen(wb) {
  screen = [];

  for (var i = 0; i < px; i++) {
    screen.push(new Array(py));
  }
  
  if(wb == 1) {
     for(var i = 0; i < px; i++) {
       for(var j = 0; j < py; j++) {
         screen[i][j] = wb;
       }
     }
  }
}

//sp = sprite
function getWidth(sp) {
  //This will only work if all lines of your sprite's String array/grid thingy
  //Are all the same length
  //Otherwise errors might happen
  return sp[0].length;
}

//sp = sprite
function getHeight(sp) {
  return sp.length;
}