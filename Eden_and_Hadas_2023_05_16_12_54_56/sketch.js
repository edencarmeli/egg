let timer = 20;
let durationAnimation = timer * 60;
let bubbles = [];
let yolkColorStart, yolkColorEnd, currentColor;
let opacityStart, opacityEnd, currentOpacity;
let isCountdownOver = false;

function setup() {
  createCanvas(400, 500);
  textSize(32);
  textAlign(CENTER, CENTER);
  yolkColorStart = color(235, 141, 0);
  yolkColorEnd = color(255, 239, 156);
  currentColor = yolkColorStart;
  opacityStart = 75;
  opacityEnd = 255;
  currentOpacity = opacityStart;

}

function draw() {
  background(140, 179, 182);
  
  // Draw the egg
  stroke(255);
  fill(255, currentOpacity);
  ellipse(200, 250, 150, 200);
  noStroke();
  fill(currentColor);
  ellipse(200, 280, 100, 100);
  let remainingTime = timer - floor(frameCount / 60);
  if(remainingTime > 0) {
      // Draw the countdown timer
      fill(255);
      let centiseconds = remainingTime % 60;
      text(floor(remainingTime/60) + ":" + nf(centiseconds, 2), width /                 2,450);
  } else {
    // Countdown is over, show the smiley
    isCountdownOver = true;
    fill(0);
    ellipse(185, 260, 10, 10);
    ellipse(215, 260, 10, 10);
    arc(200, 290, 30, 30, 0, PI);
  }

  // Update and draw the bubbles
  for (let i = bubbles.length - 1; i >= 0; i--) {
        bubbles[i].update();
    bubbles[i].draw();
    if (bubbles[i].y < -50) {
      bubbles.splice(i, 1);
    } else if (dist(bubbles[i].x, bubbles[i].y, mouseX, mouseY) < bubbles[i].size/2) {
      // Pop the bubble if it's clicked
      bubbles.splice(i, 1);
    }
  }

  // Add new bubbles randomly
  if (frameCount % 20 == 0) {
    if (random(1) > 0.5) {
      bubbles.push(new Bubble(random(0, 400), height, random(10, 30)));
    }
  }

  // Update the egg white opacity
  if (remainingTime <= 0) {
    noLoop();
  }
  
  if (frameCount % 60 == 0 && remainingTime > 0) {
    let positionE = min(frameCount / durationAnimation, 1);
    currentColor = lerpColor(yolkColorStart, yolkColorEnd, positionE);
    currentOpacity = opacityStart + (positionE * (opacityEnd -opacityStart));
  }
}

class Bubble {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = random(1, 4);
    this.angle = random(TWO_PI);
    this.dir = random(-1, 1);
  }

  update() {
    this.y -= this.speed;
    this.x += sin(this.angle) * this.dir;
    this.angle += 0.1;
  }

  draw() {
    noStroke();
    fill(255, 255, 255, 100);
    ellipse(this.x, this.y, this.size);
  }
}
