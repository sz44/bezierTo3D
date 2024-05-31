function setup() {
    createCanvas(800, 800, WEBGL);
  }
  
  function draw() {
    background(200);
  
    // Set up lights
    // ambientLight(50); // Ambient light for general illumination
    // directionalLight(255, 255, 255, 0.25, 0.25, -0.9); // White directional light
    // directionalLight(255, 255, 255, -1, 1, 1); // White directional light
    // pointLight(255, 0, 0, 200, -200, 300); // Red point light for effect
    // stroke(10);
    // noStroke();
    fill(67, 153, 114);
  
    let angleStep = PI / 12; // Adjust the step for smoother shape
    let detail = 10; // Number of points on the bezier curve
  
     // Draw outer surface
    for (let theta = 0; theta < TWO_PI; theta += angleStep) {
      beginShape(QUAD_STRIP);
      for (let t = 0; t <= 1; t += 1 / detail) {
        let x = bezierPoint(head.x, cont1.x, cont2.x, tail.x, t);
        let y = bezierPoint(head.y, cont1.y, cont2.y, tail.y, t);
        
        let newX1 = x * cos(theta);
        let newZ1 = x * sin(theta);
        let newX2 = x * cos(theta + angleStep);
        let newZ2 = x * sin(theta + angleStep);
  
        vertex(newX1, y, newZ1);
        vertex(newX2, y, newZ2);
      }
      endShape();
    }
    /*
    fill(100);
    
    // Draw inner surface
    for (let theta = 0; theta < TWO_PI; theta += angleStep) {
      beginShape(TRIANGLE_STRIP);
      for (let t = 0; t <= 1; t += 1 / detail) {
        let x = bezierPoint(innerHead.x, innerCont1.x, innerCont2.x, innerTail.x, t);
        let y = bezierPoint(innerHead.y, innerCont1.y, innerCont2.y, innerTail.y, t);
        
        let newX1 = x * cos(theta);
        let newZ1 = x * sin(theta);
        let newX2 = x * cos(theta + angleStep);
        let newZ2 = x * sin(theta + angleStep);
  
        vertex(newX1, y, newZ1);
        vertex(newX2, y, newZ2);
      }
      endShape();
    }
    */
    orbitControl();
  
  }
  
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  
  let head = new Point(50, -100);
  let tail = new Point(50, 100);
  let cont1 = new Point(80, 50);
  let cont2 = new Point(380, 30);
  
  let innerHead = new Point(0, 0);
  let innerTail = new Point(0, 200);
  let innerCont1 = new Point(15, 100);
  let innerCont2 = new Point(190, 60);
  