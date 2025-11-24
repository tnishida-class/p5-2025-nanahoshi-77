let started = false
let running = false;
let leftBall; // priviliged
let rightBall; // less priviliged
let leftTargets = [], rightTargets = [];
let maxSize = 200;
let leftScore = 0;
let rightScore = 0;

function setup(){
  createCanvas(windowWidth, windowHeight);
leftBall = {
  x : width/4,
  y : (height/4)*3,
  size : 30,
  vx : 3,
  vy : 2 };
rightBall = {
  x : (width/4)*3,
  y : (height/4)*3,
  size : 30,
  vx : 3,
  vy : 2 
 };
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background (240, 240, 242);

  if(running){
  //left ball movement
  leftBall.x += leftBall.vx
  leftBall.y += leftBall.vy

  if(leftBall.x - leftBall.size/2 <0 || leftBall.x + leftBall.size/2 > windowWidth/2){
    leftBall.vx = -leftBall.vx
  }
  if(leftBall.y - leftBall.size/2 <0 || leftBall.y + leftBall.size/2 > height){
    leftBall.vy = -leftBall.vy
  }
  leftBall.x = constrain(leftBall.x, leftBall.size/2, width/2 - leftBall.size/2);
  leftBall.y = constrain(leftBall.y, leftBall.size/2, height - leftBall.size/2);

  rightBall.x += rightBall.vx
  rightBall.y += rightBall.vy

  if(rightBall.x - rightBall.size/2 < windowWidth/2 || rightBall.x + rightBall.size/2 > windowWidth){
    rightBall.vx = -rightBall.vx
  }
  if(rightBall.y - rightBall.size/2 <0 || rightBall.y + rightBall.size/2 > height){
    rightBall.vy = -rightBall.vy
  }
  rightBall.x = constrain(rightBall.x, width/2 + rightBall.size/2, width - rightBall.size/2);
  rightBall.y = constrain(rightBall.y, rightBall.size/2, height - rightBall.size/2);

// priviliged side targets (more frequent spawning)
if (frameCount % 20 === 0){
  leftTargets.push(createTarget(0, windowWidth/2))
}
if (frameCount % 80 === 0){
  rightTargets.push(createTarget(windowWidth/2, windowWidth));
}

leftTargets = checkHit(leftBall, leftTargets, "left");
rightTargets = checkHit(rightBall, rightTargets, "right");

// stop animation when ball reach max size
if (leftBall.size >= maxSize || rightBall.size >= maxSize){
  running = false;
 }
}

// left ball shape
noStroke();
fill (224, 198, 79);
ellipse (leftBall.x, leftBall.y, leftBall.size);
// right ball shape
noStroke();
fill (9, 71, 18);
ellipse (rightBall.x, rightBall.y, rightBall.size);

// middle line
stroke(0);
strokeWeight(2);
line(windowWidth/2, 0, windowWidth/2, windowHeight);

// targets shape
for(let i = 0; i < leftTargets.length; i++){
    let t = leftTargets[i];
    noStroke();
    fill(118, 171, 219);
    ellipse(t.x, t.y, t.size);
 }
 for(let i = 0; i < rightTargets.length; i++){
    let t = rightTargets[i];
    noStroke();
    fill(118, 171, 219);
    ellipse(t.x, t.y, t.size);
 }
 // score display
fill (0);
textSize(28);
strokeWeight(0.5);
textAlign(CENTER);
text(`知識獲得 : ${leftScore}`, windowWidth/4, 30);
text(`知識獲得 : ${rightScore}`, windowWidth/4*3, 30);

// beginning screen
if(!started){
  textSize(24);
  fill(0);
  textAlign(CENTER);
  text("Aを押してスタート", width/2, height/2);

// message after program stopped
} else if (!running){
  textSize(32);
  fill(200, 0, 0);
  textAlign(CENTER);
  text("同じ時間と道でも、社会階層によって教育格差がある", windowWidth/2, windowHeight/2);
 }
}

// erase hit targets (update active targets)
function checkHit (ball, targetSide, sideScore){
 const activeTargets = []

  for (let i = 0; i < targetSide.length; i++){
   let t = targetSide[i];
   let d = dist(ball.x, ball.y, t.x, t.y);

   if( d >= (ball.size / 2 + t.size / 2)){
    activeTargets.push(t);
   } else {
    ball.size += 7;
    // update score
    if(sideScore === "left") leftScore++;
    else rightScore++;
   }
}
return activeTargets;
}

// targets properties
function createTarget(minX , maxX){
  return {
    x : random (minX + 10 , maxX - 10),
    y : random (50 , height - 10),
    size : 15
  }
}

function keyPressed(){
  if (key === 'A' || key === 'a'){
    started = true;
    running = true;
  }
}