// 心臓の鼓動のようなアニメーション
const cycle = 100; // 1周期のフレーム数
let count = 0; // 何フレーム目か
let size = 50;
// BLANK[1] 1周期の前半は size が大きくなり、後半は小さくなる
let speed = 1; // アニメーションの速さ
// BLANK[2] 
count = (count + speed) % cycle;

function setup() {
  createCanvas(200, 200);
  count = 0;
}

function draw() {
  background(160, 192, 255);
  count = (count + speed) % cycle;

  if (keyIsPressed) {
    count = (count + speed *2 ) % cycle
  }

  if (count < cycle / 2) {
    size = 50 +  cycle - count;
  } else {
    size = 50 + count;
  }
  ellipse(width / 2, height / 2, size, size);
}



