function setup() {
  createCanvas(1200, 800, WEBGL);

  colorMode(HSL)
}

function draw() {
  background(200);
  let outerColor = color(153, 39, 60);
  let innerColor = color(153, 39, 20);

  // Set up lights
  ambientLight(250); // General low-level ambient light
  // directionalLight(255, 255, 255, 0.25, 0.25, -1); // White directional light
  // pointLight(255, 255, 255, 200, -200, 300); // White point light

  // Outer surface material
  // fill(67, 153, 114);
  ambientMaterial(outerColor);

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

  // Inner surface material
  // fill(47, 113, 84);
  ambientMaterial(innerColor);

  // Draw inner surface
  for (let theta = 0; theta < TWO_PI; theta += angleStep) {
    beginShape(QUAD_STRIP);
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

let innerHead = new Point(50, -100);
let innerTail = new Point(50, 100);
let innerCont1 = new Point(70, 50);
let innerCont2 = new Point(350, 20);
