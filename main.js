function bezierSketch(p) {
    p.setup = () => {
        p.createCanvas(800, 800, bezierCanvas );
    }
    p.draw = () => {
        p.background(255);
        p.cursor(p.ARROW);

        p.stroke(255, 0, 0);
        p.strokeWeight(PointRad * 2);
        p.point(head.x, head.y);
        p.point(tail.x, tail.y);
        p.point(cont1.x, cont1.y);
        p.point(cont2.x, cont2.y);
    
        p.noFill();
        p.stroke(0);
        p.strokeWeight(4);
        p.bezier(head.x, head.y, cont1.x, cont1.y, cont2.x, cont2.y, tail.x, tail.y);
    
        for (let point of points) {
            if (p.pow(p.mouseX - point.x, 2) + p.pow(p.mouseY - point.y, 2) <= p.pow(PointRad, 2)) {
                p.cursor(p.MOVE);
            }
        }
    }
    p.mousePressed = () => {
        for (let point of points) {
            if (p.pow(p.mouseX - point.x, 2) + p.pow(p.mouseY - point.y, 2) <= p.pow(PointRad, 2)) {
                selected = point;
                offsetX = p.mouseX - point.x;
                offsetY = p.mouseY - point.y;
                break;
            }
        }
    }
    
    p.mouseReleased = () => {
        selected = null;
    }
    
    p.mouseDragged = () => {
        if (selected === null) {
            return;
        }
    
        // Calculate the new position
        let newX = p.mouseX - offsetX;
        let newY = p.mouseY - offsetY;
    
        // Constrain the new position to the canvas boundaries, snap to end if mouse outside canvas
        if (newX <= PointRad) {
            selected.x = PointRad;
        } else if (newX >= p.width - PointRad) {
            selected.x = p.width - PointRad;
        } else {
            selected.x = newX;
        }
    
        if (newY <= PointRad) {
            selected.y = PointRad;
        } else if (newY >= p.height - PointRad) {
            selected.y = p.height - PointRad;
        } else {
            selected.y = newY;
        }
    }
}

function surfaceSketch(p) {
    p.setup = () => {
        p.createCanvas(800, 800, p.WEBGL, surfaceCanvas );
    }
    p.draw = () => {
        p.background(255);

        for (let theta = 0; theta < p.TWO_PI; theta += angleStep) {
            p.beginShape(p.QUAD_STRIP);
            for (let t = 0; t <= 1; t += 1 / detail) {
                let x = p.bezierPoint(head.x, cont1.x, cont2.x, tail.x, t);
                let y = p.bezierPoint(head.y, cont1.y, cont2.y, tail.y, t);

                let newX1 = x * p.cos(theta);
                let newZ1 = x * p.sin(theta);
                let newX2 = x * p.cos(theta + angleStep);
                let newZ2 = x * p.sin(theta + angleStep);

                p.vertex(newX1, y, newZ1);
                p.vertex(newX2, y, newZ2);
            }
            p.endShape();
        }
    p.orbitControl();
    }
}

let detail = 10;
let angleStep = Math.PI / 12;

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

new p5(bezierSketch);
new p5(surfaceSketch);