function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    //Task: make bezier curve dynamic, able to change by moving points.
    //Task: create new curves from clicks
    background(200);
   
    
    stroke(255, 0, 0);
    strokeWeight(PointRad * 2);
    point(head.x, head.y);
    point(tail.x, tail.y);
    point(cont1.x, cont1.y);
    point(cont2.x, cont2.y);
    
    noFill();
    stroke(0);
    strokeWeight(1);
    bezier(head.x, head.y, tail.x, tail.y, cont1.x, cont1.y, cont2.x, cont2.y);
    
    /*
    if (pow(mouseX - head.x, 2) + pow(mouseY - head.y, 2) <= pow(PointRad, 2) && mouseIsPressed) {
      push();
      stroke(255, 0, 0);
      strokeWeight(PointRad * 2);
      point(200, 200);
      pop();
      head.x = mouseX;
      head.y = mouseY;
    }
    */
  }
  
  function mouseDragged() {
    if (pow(mouseX - head.x, 2) + pow(mouseY - head.y, 2) <= pow(PointRad, 2)) {
       head.x = mouseX;
       head.y = mouseY;
    }
  }
  
  const PointRad = 10;
  
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  
  let head = new Point(350, 50);
  let tail = new Point(50, 50);
    
  let cont1 = new Point(390, 390);
  let cont2 = new Point(50, 350);