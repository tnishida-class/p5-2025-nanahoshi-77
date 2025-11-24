// 2D アニメーションゲームのようなインタラクション
let x, y;
let vx, vy;
const g = 1 ;
let size;
let groundY;

function setup(){
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  vx = 0;
  vy = 0;
 size = height * 0.1; // キャラクターのサイズ
 groundY = height * 0.8;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);
  // 地面を描く
  groundY = height * 0.8;
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);
  size = height * 0.1; // キャラクターのサイズ

  // BLANK[1] キャラクターの左右移動
  let speed = 5;
  //Shiftキーを押している間だけスピードアップ
  if (keyIsDown(SHIFT)) {
   speed = 10
  }

  if(keyIsDown(LEFT_ARROW)){
    vx = -speed ;
  } else if (keyIsDown (RIGHT_ARROW)){
    vx = speed ;
  } else {
      vx = 0;
    }

  // BLANK[2] 重力とジャンプ
  vy += g; //重力を加える
  y += vy; 

  //地面についたか判定
  if (y + size / 2 >= groundY) {
    y = groundY - size / 2;
     vy = 0;
  }

  // 速くなりすぎないように制限
   vx = constrain(vx, -20, 20);
  vy = constrain(vy, -20, 20);

  x = constrain (x, size / 2, width - size / 2 )
  y = constrain (y, size / 2, groundY - size / 2)

  // 位置を更新
  x += vx;
  y += vy;

  // キャラクターを描く
  fill(0);
  ellipse(x, y, size, size);
}

function keyPressed (){
  //スペースキーでジャンプ（空中ジャンプ不可）
  if (key === ' ' && (y + size / 2 >= groundY)){
    vy = -20; //ジャンプ力     
  }
}      