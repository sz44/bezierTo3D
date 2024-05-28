function setup() {
    createCanvas(400, 400);

    background(200);

    stroke(255, 0, 0);
    strokeWeight(10);

    //Start
    point(350, 50);

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

    for (let i = 200; i < 400; i += 5) {
        point(i, 370 - 0.33 * i);
    }


}

function draw() {
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
    if (mouseY == 400 - (1 / 3) * mouseX) {
        push();
        stroke(0, 255, 0);
        strokeWeight(10);
        point(mouseX, mouseY);
        pop();
    }

    //detect when the mouse is over the point
    if (mouseX => 350 - 10) { }
}        