function setup() {
  createCanvas(400, 400);
  
  background(200);
  
  stroke(255, 0, 0);
  strokeWeight(10);
  
  //Start
  point(350, 50);
  point(351, 51);
  
  //End
  point(50, 50);
  
  //C1
  point(390, 390);
  
  //C2
  point(50, 350);
  
  noFill();
  stroke(0);
  strokeWeight(1);
  bezier(350, 50, 50, 50, 390, 390, 50, 350);
}

function draw() {
  background(200);
  cirX = 200;
  cirY = 200;
  cirR = 25;
  circle(cirX, cirY, cirR * 2);
  
  if (pow(mouseX - 200, 2) + pow(mouseY - 200, 2) >= pow(cirR - 4, 2) &&
     pow(mouseX - 200, 2) + pow(mouseY - 200, 2) <= pow(cirR + 4, 2)) {
    push()
    stroke(0, 255, 0);
    strokeWeight(10);
    point(mouseX, mouseY);
    pop();
  }
  
  for (let x = 200; x < 350; x++) {
    point(x, 400 - (1/3) * x);
  }

  if (mouseX >= 195 && mouseX <= 355 && 
      mouseY >= 400 - (1/3) * mouseX - 5 &&
      mouseY <= 400 - (1/3) * mouseX + 5) {
    push();
    stroke(0, 255, 0);
    strokeWeight(10);
    point(mouseX, mouseY);
    pop();
  }
}