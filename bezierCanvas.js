function bezierSketch(p) {
    p.setup = () => {
        p.createCanvas(p.windowWidth/2, p.windowHeight, bezierCanvas );
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

        // point lables
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
        selected.x = p.constrain(newX, 0, p.width);
        selected.y = p.constrain(newY, 0, p.height);
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
