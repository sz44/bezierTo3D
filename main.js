function bezierSketch(p) {
    p.setup = () => {
        p.createCanvas(p.windowWidth/2, p.windowHeight, bezierCanvas );
        // p.createCanvas(478 , 431, bezierCanvas );
        head.x = 50;
        head.y = 50;
        tail.x = 50;
        tail.y = p.height - 50;
        cont1.x = p.width/2;
        cont1.y = 50;
        cont2.x = p.width/2;
        cont2.y = p.height - 50;
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

        /*
        p.push();
        p.noStroke();
        p.fill(0,0,0);
        p.textSize(24);
        p.text(`${head.x}, ${head.y}`, head.x + 15, head.y);
        p.text(`${tail.x}, ${tail.y}`, tail.x + 15, tail.y);
        p.text(`${cont1.x}, ${cont1.y}`, cont1.x + 15, cont1.y);
        p.text(`${cont2.x}, ${cont2.y}`, cont2.x + 15, cont2.y);
        p.pop();
        */

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
    p.touchStarted = () => {
        for (let point of points) {
            if (p.dist(p.touches[0].x, p.touches[0].y, point.x, point.y) <= PointRad) {
                selected = point;
                offsetX = p.touches[0].x - point.x;
                offsetY = p.touches[0].y - point.y;
                break;
            }
        }
        return false; // prevent default
    };

    p.touchEnded = () => {
        selected = null;
        return false; // prevent default
    };

    p.touchMoved = () => {
        if (selected === null) {
            return;
        }

        let newX = p.touches[0].x - offsetX;
        let newY = p.touches[0].y - offsetY;

        selected.x = p.constrain(newX, 0, p.width);
        selected.y = p.constrain(newY, 0, p.height);

        return false; // prevent default
    };

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
        if (newX <= 0) {
            selected.x = 0;
        } else if (newX >= p.width - 0) {
            selected.x = p.width - 0;
        } else {
            selected.x = newX;
        }
    
        if (newY <= 0) {
            selected.y = 0;
        } else if (newY >= p.height - 0) {
            selected.y = p.height - 0;
        } else {
            selected.y = newY;
        }
    }
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth/2, p.windowHeight);
        head.x = 50;
        head.y = 50;
        tail.x = 50;
        tail.y = p.height - 50;
        cont1.x = p.width/2;
        cont1.y = 50;
        cont2.x = p.width/2;
        cont2.y = p.height - 50;
    }
}

function surfaceSketch(p) {
    p.setup = () => {
        p.createCanvas(p.windowWidth/2, p.windowHeight, p.WEBGL, surfaceCanvas);

        // let cam = p.createCamera();
        // cam.setPosition(0, p.height/2, 800);
        // cam.lookAt(0, 0, 0);
    }
    p.draw = () => {
        p.background(255);
        p.translate(0, -p.height/2);
        // p.scale(1/2);
        p.fill(p.color(green1Light));
        for (let theta = 0; theta < p.TWO_PI; theta += angleStep) {
            p.beginShape(p.QUAD_STRIP);
            for (let t = 0; t <= 1.001; t += 1 / detail) {
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
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth/2, p.windowHeight);
    }
}

let green1Light = "hsl(153, 39%, 60%)";
let green1Dark = "hsl(152, 39%, 20%)";
let white = "rgb(255,255,255)";

// limit = 1000, if need more change above to t <= 1.0001 to catch decimal error
let detail = 20;
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

let head = new Point(50, 50);
let tail = new Point(50, window.screen.height - 50);

let cont1 = new Point(window.screen.width/2, 50);
let cont2 = new Point(window.screen.width/2, window.screen.height - 50);

points.push(head);
points.push(tail);
points.push(cont1);
points.push(cont2);

new p5(bezierSketch);
new p5(surfaceSketch);