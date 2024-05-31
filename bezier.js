function setup() {
    createCanvas(800, 800);
}

//Task: create new curves from clicks
//Task: tools: node-tool, move-resize-tool
function draw() {
    background(200);
    cursor(ARROW);

    stroke(255, 0, 0);
    strokeWeight(PointRad * 2);
    point(head.x, head.y);
    point(tail.x, tail.y);
    point(cont1.x, cont1.y);
    point(cont2.x, cont2.y);

    noFill();
    stroke(0);
    strokeWeight(4);
    bezier(head.x, head.y, cont1.x, cont1.y, cont2.x, cont2.y, tail.x, tail.y);

    for (let p of points) {
        if (pow(mouseX - p.x, 2) + pow(mouseY - p.y, 2) <= pow(PointRad, 2)) {
            cursor(MOVE);
        }
    }
}

function mousePressed() {
    for (let point of points) {
        if (pow(mouseX - point.x, 2) + pow(mouseY - point.y, 2) <= pow(PointRad, 2)) {
            selected = point;
            offsetX = mouseX - point.x;
            offsetY = mouseY - point.y;
            break;
        }
    }
}

function mouseReleased() {
    selected = null;
}

function mouseDragged() {
    if (selected === null) {
        return;
    }

    // Calculate the new position
    let newX = mouseX - offsetX;
    let newY = mouseY - offsetY;

    // Constrain the new position to the canvas boundaries, snap to end if mouse outside canvas
    if (newX <= PointRad) {
        selected.x = PointRad;
    } else if (newX >= width - PointRad) {
        selected.x = width - PointRad;
    } else {
        selected.x = newX;
    }

    if (newY <= PointRad) {
        selected.y = PointRad;
    } else if (newY >= height - PointRad) {
        selected.y = height - PointRad;
    } else {
        selected.y = newY;
    }
}


const PointRad = 10;

let selected = null;
let offsetX = 0;
let offsetY = 0;

let points = [];

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

points.push(head);
points.push(tail);
points.push(cont1);
points.push(cont2);
