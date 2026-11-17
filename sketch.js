let photos = [];
let bits = [];

let phoneX;
let phoneY;
let phoneW;
let phoneH;
let s;

let contentSlider;

let colors = [
  "#0f1014",
  "#e5eeff",
  "#1100ff",
  "#00eeff",
  "#00bfff",
  "#fff194",
  "#130057",
  "#333333"
];

let fonts = [
  "Arial",
  "Georgia",
  "Times New Roman",
  "Courier New",
  "Impact",
  "Verdana",
  "Trebuchet MS",
  "Comic Sans MS",
  "Palatino",
  "Arial Black"
];

let words = [
  "watch till end",
  "breaking news",
  "part 2",
  "you need to see this",
  "new post",
  "trending",
  "did you know?",
  "one more video",
  "comment below",
  "for you",
  "wait what",
  "follow for more",
  "just posted",
  "keep watching",
  "OMG",
  "this is crazy",
  "you won't believe this",
  "watch again",
  "everyone is talking about this",
  "wait for it",
  "new update",
  "must see",
  "why is nobody talking about this?"
];


async function setup() {

  // tiktok screens
  photos[0] = await loadImage("screenshot1.PNG");
  photos[1] = await loadImage("screenshot2.PNG");
  photos[2] = await loadImage("screenshot3.PNG");
  photos[3] = await loadImage("screenshot4.PNG");
  photos[4] = await loadImage("screenshot5.PNG");
  photos[5] = await loadImage("screenshot7.PNG");

  createCanvas(windowWidth, windowHeight);

  updatePhone();

  noStroke();
  textAlign(LEFT, CENTER);

  // slider selects phone content
  contentSlider = createSlider(0, 5, 0, 1);

  contentSlider.style("width", "150px");
  contentSlider.style("transform", "rotate(-90deg)");
  contentSlider.style("transform-origin", "top left");
  contentSlider.style("accent-color", "#707070");
  contentSlider.style("cursor", "pointer");

  positionSlider();

}


// phone size and position
function updatePhone() {

  phoneH = min(height * 0.56, width * 0.95);

  s = phoneH / 560;

  phoneW = 300 * s;

  phoneX = (width - phoneW) / 2;
  phoneY = (height - phoneH) / 2;

}

// slider beside phone
function positionSlider() {

  if (contentSlider) {

    contentSlider.position(
      phoneX + phoneW + 25 * s,
      phoneY + phoneH / 2 + 75 * s
    );

  }

}


// resize canvas
function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

  updatePhone();

  positionSlider();

}


function draw() {
  
  // doomscrolling at night
    background("#101014");

// soft light behind phone
    noStroke();

    fill(80, 100, 160, 8);
      ellipse(
        phoneX + phoneW/2,
        phoneY + phoneH/2,
        phoneW * 4,
        phoneH * 2.5
);

        fill(100, 120, 200, 10);
        ellipse(
              phoneX + phoneW/2,
              phoneY + phoneH/2,
              phoneW * 3,
              phoneH * 2
      );

fill(130, 150, 255, 12);
ellipse(
  phoneX + phoneW/2,
  phoneY + phoneH/2,
  phoneW * 2,
  phoneH * 1.5
);

  // display fragments
  for (let i = 0; i < bits.length; i++) {

    bits[i].move();
    bits[i].show();

  }


  // phone shadow
  noStroke();

  fill(0, 0, 0, 20);
  rect(phoneX + 8*s, phoneY + 10*s, phoneW, phoneH, 45*s);

  fill(0, 0, 0, 25);
  rect(phoneX + 5*s, phoneY + 6*s, phoneW, phoneH, 43*s);

  fill(0, 0, 0, 35);
  rect(phoneX + 3*s, phoneY + 3*s, phoneW, phoneH, 42*s);


  // phone body
  fill("#d1d1d1");
  stroke("#777777");
  strokeWeight(3*s);

  rect(
    phoneX,
    phoneY,
    phoneW,
    phoneH,
    40*s
  );


  // screen background
  let screenX = phoneX + 15*s;
  let screenY = phoneY + 60*s;
  let screenW = 270*s;
  let screenH = 440*s;

  fill("#000000");
  stroke("#777777");
  strokeWeight(1.5*s);

  rect(
    screenX,
    screenY,
    screenW,
    screenH,
    5*s
  );


  // select image using slider
  let selectedPhoto = photos[contentSlider.value()];


  // keep original image ratio
  let ratio = min(
    screenW / selectedPhoto.width,
    screenH / selectedPhoto.height
  );

  let imgW = selectedPhoto.width * ratio;
  let imgH = selectedPhoto.height * ratio;

  let imgX = screenX + (screenW - imgW) / 2;
  let imgY = screenY + (screenH - imgH) / 2;


  // display image
  image(
    selectedPhoto,
    imgX,
    imgY,
    imgW,
    imgH
  );


  // screen border
  noFill();
  stroke("#dbdbdb");
  strokeWeight(1.5*s);

  rect(
    screenX,
    screenY,
    screenW,
    screenH,
    5*s
  );


   // phone notch
  fill(228);
  stroke("#777777");
  strokeWeight(1.5*s);

  rect(
    phoneX + 105*s,
    phoneY + 15*s,
    90*s,
    25*s,
    12*s
  );


  // front camera circle
  noFill();
  stroke("#777777");
  strokeWeight(1.5*s);

  ellipse(
    phoneX + 180*s,
    phoneY + 27.5*s,
    12*s,
    12*s
  );

  noStroke();


  // home button
        fill("#e8e8e8");
        stroke("#777777");
        strokeWeight(3*s);
        
        ellipse(
          phoneX + 150*s,
          phoneY + 530*s,
          35*s,
          35*s
        );
        
        noStroke();
  
}


// scrolling creates new fragments
function mouseWheel(event) {

  for (let i = 0; i < 5; i++) {

    bits.push(new Bit());

  }

  // maximum 400 fragments
  if (bits.length > 800) {

    bits.splice(0, bits.length - 400);

  }

  return false;

}


// information fragments
class Bit {

  constructor() {

    // start inside phone
    this.x = random(
      phoneX + 15 * s,
      phoneX + 285 * s
    );

    this.y = random(
      phoneY + 60 * s,
      phoneY + 500 * s
    );


    // destination above phone
    this.stopX = random(10, width - 10);

    let topArea = max(10, phoneY - 20);

    this.stopY = random(10, topArea);


    // movement speed
    this.speedX = random(2, 15);
    this.speedY = random(2, 15);


    // text or graphic
    this.isWord = random(1) < 0.7;

    this.word = random(words);

    this.size = random(5, 20);

    this.font = random(fonts);

    this.bold = random(1) < 0.4;

    this.angle = random(-0.5, 0.5);

    this.color = random(colors);

    this.paper = random(1) < 0.35;

    this.shape = floor(random(5));

    this.shapeSize = random(5, 18);

  }


  move() {

    // move horizontally
    if (abs(this.x - this.stopX) > this.speedX) {

      if (this.x < this.stopX) {
        this.x += this.speedX;
      }

      if (this.x > this.stopX) {
        this.x -= this.speedX;
      }

    }


    // move vertically
    if (abs(this.y - this.stopY) > this.speedY) {

      if (this.y < this.stopY) {
        this.y += this.speedY;
      }

      if (this.y > this.stopY) {
        this.y -= this.speedY;
      }

    }

  }


  show() {

    push();

    translate(this.x, this.y);

    rotate(this.angle);


    if (this.isWord) {

      textFont(this.font);

      textSize(this.size);

      if (this.bold) {
        textStyle(BOLD);
      } else {
        textStyle(NORMAL);
      }


      // paper background
      if (this.paper) {

        fill(179, 179, 179, 180);

        rect(
          -4,
          -this.size / 2 - 3,
          textWidth(this.word) + 8,
          this.size + 6
        );

      }


      fill(this.color);

      text(this.word, 0, 0);

    } else {

      fill(this.color);


      if (this.shape == 0) {

        rect(
          0,
          0,
          this.shapeSize * 1.5,
          this.shapeSize
        );

      }


      if (this.shape == 1) {

        ellipse(
          0,
          0,
          this.shapeSize,
          this.shapeSize
        );

      }


      if (this.shape == 2) {

        triangle(
          -this.shapeSize,
          this.shapeSize / 2,
          0,
          -this.shapeSize,
          this.shapeSize,
          this.shapeSize / 2
        );

      }


      if (this.shape == 3) {

        quad(
          0,
          -this.shapeSize,
          this.shapeSize,
          0,
          0,
          this.shapeSize,
          -this.shapeSize,
          0
        );

      }


      if (this.shape == 4) {

        rect(
          0,
          0,
          this.shapeSize,
          this.shapeSize / 2
        );

        rect(
          -this.shapeSize / 4,
          this.shapeSize / 2,
          this.shapeSize / 2,
          this.shapeSize
        );

      }

    }

    pop();

  }

}
