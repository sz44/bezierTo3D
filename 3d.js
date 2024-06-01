function setup() {
  createCanvas(1200, 800, WEBGL);

  colorMode(HSL)
  outerColor = color(153, 39, 60);
  innerColor = color(153, 39, 20);
}

function draw() {
  background(80);

  // Set up lights
  ambientLight(50); // General low-level ambient light
  // directionalLight(255, 255, 255, 0.95, 0.25, -1); // White directional light
  directionalLight(outerColor, 0.1, 0.2, 0);
  // pointLight(255, 255, 255, 200, -200, 300); // White point light
  // box(400);
  // normalMaterial();
  // noStroke();
  // sphere();
  // Outer surface material
  // ambientMaterial(outerColor);
  // Draw outer surface
  // fill(outerColor);
  drawSurface(angleStep, detail, 0);

  // Inner surface material
  // ambientMaterial(innerColor);
  // Draw inner surface
  // drawSurface(angleStep, detail, 15); 

  orbitControl();
}

function drawSurface(angleStep = PI / 12, detail = 10, offsetStart = 0) {
  for (let theta = 0; theta < TWO_PI; theta += angleStep) {
    beginShape(QUAD_STRIP);
    for (let t = 0; t <= 1; t += 1 / detail) {
      let offset = offsetStart;
      if (t === 0 || abs(t-1) <= 0.0001) {
        offset = 0;
      }
      let x = bezierPoint(head.x, cont1.x, cont2.x, tail.x, t) - offset;
      let y = bezierPoint(head.y, cont1.y, cont2.y, tail.y, t);

      let newX1 = x * cos(theta);
      let newZ1 = x * sin(theta);
      let newX2 = x * cos(theta + angleStep);
      let newZ2 = x * sin(theta + angleStep);

      let normalX = cos(theta);
      let normalZ = sin(theta);

      normal(normalX, 0, normalZ);

      vertex(newX1, y, newZ1);
      vertex(newX2, y, newZ2);
    }
    endShape();
  }
}

let angleStep = Math.PI / 24; // Adjust the step for smoother shape
let detail = 10; // Number of points on the bezier curve

let outerColor = null;
let innerColor = null;
let green1Light = "hsl(153, 39%, 60%)";
let green1Dark = "hsl(152, 39%, 20%)";

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
let innerCont2 = new Point(350, 30);
