let angleX1 = 0;
let angleY1 = 0;
let angleX2 = 0;
let angleY2 = 0;
let draggingCube1 = false;
let draggingCube2 = false;
let lastMouseX, lastMouseY;

function setup() {
  createCanvas(600, 400, WEBGL);
}

function draw() {
  background(200);

  // Draw first cube
  push();
  if (draggingCube1) {
    angleY1 += (mouseX - lastMouseX) * 0.01;
    if (angleY1 >= PI) {
        angleX1 += (mouseY - lastMouseY) * 0.01;
    } else {
        angleX1 -= (mouseY - lastMouseY) * 0.01;
    }
  }
  translate(-150, 0, 0);
  rotateX(angleX1);
  rotateY(angleY1);
  box(100);
  pop();

  // Draw second cube
  push();
  if (draggingCube2) {
    angleY2 += (mouseX - lastMouseX) * 0.01;
    angleX2 -= (mouseY - lastMouseY) * 0.01;
  }

  translate(150, 0, 0);
  rotateX(angleX2);
  rotateY(angleY2);
  box(100);
  pop();

  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function mousePressed() {
    /*
  lastMouseX = mouseX;
  lastMouseY = mouseY;

  // Check if the mouse is over the first cube
  draggingCube1 = dist(mouseX, mouseY, width/2 - 150, height/2) < 50;

  // Check if the mouse is over the second cube
  draggingCube2 = dist(mouseX, mouseY, width/2 + 150, height/2) < 50;
  */
}

function mouseDragged() {
    if (dist(mouseX, mouseY, width / 2 - 150, height / 2) < 50) {
        draggingCube1 = true;
        draggingCube2 = false;
    } else if (dist(mouseX, mouseY, width / 2 + 150, height / 2) < 50) {
        draggingCube2 = true;
        draggingCube1 = false;
    }
}

function mouseReleased() {
  draggingCube1 = false;
  draggingCube2 = false;
}
