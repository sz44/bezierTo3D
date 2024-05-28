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
  
  push()
  stroke(0, 255, 0);
  strokeWeight(4);
 
  
  for (let i = 0; i < 150; i+= 1) {
    point(200 + i, 300 - (1/3) * i);
  }
  pop()
  
  

}

function draw() {
  //console.log(mouseX, mouseY);
  //background(200);
  cirX = 200;
  cirY = 200;
  cirR = 25;
  circle(cirX, cirY, cirR * 2);
  
  theta = 0;
  
  //draw point if mouse is over circle
  push()
  stroke(255, 0, 0);
  strokeWeight(4);
  point(cirX + cirR * cos(theta), cirY + cirR * sin(theta));
  pop()
  
  if (mouseX === cirX + cirR * cos(theta) && mouseY === cirY + cirR * sin(theta)) {
    push()
    stroke(0, 255, 0);
    strokeWeight(4);
    point(cirX + cirR * cos(theta), cirY + cirR * sin(theta));
    pop();
  }

  line(50, 300, 150, 300);
  if (mouseX >= 50 && mouseX <= 150 && mouseY >= 295 && mouseY <= 305) {
    push();
    stroke(0, 255, 0);
    strokeWeight(10);
    point(mouseX, 300);
    pop();
  }
  
  line(200, 300, 350, 250);
  if (mouseX >= 200 && mouseX <= 350 && mouseY == 350 - (1/3) * mouseX) {
    console.log("over 350 :", mouseX, mouseY);
    push();
    stroke(0, 255, 0);
    strokeWeight(10);
    point(mouseX, mouseY);
    pop();
  }
  
  for (let x = 200; x < 350; x++) {
    point(x, 400 - (1/3) * x);
  }
  
  for (let x = 0; x < 150; x++) {
    point(x+150, 400 - (1/3) * (x + 200));
  }
  
  line(0, 283.33, 400, 283.33);


  //detect when the mouse is over the point
  if (mouseX >= 200 && mouseX <= 350 && mouseY == 400 - (1/3) * mouseX) {
    console.log("over:", mouseX, mouseY);
    push();
    stroke(0, 255, 0);
    strokeWeight(10);
    point(mouseX, mouseY);
    pop();
  }
}