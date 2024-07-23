// const equationMode = document.querySelector("#equationMode");
// const bezierMode = document.querySelector("#bezierMode");
// const selectMode = document.querySelectorAll(".menu input[type=radio]");
const menu = document.querySelector(".menu");
const equationCanvas = document.querySelector("#equationCanvas");
const bezierCanvas = document.querySelector("#bezierCanvas");

const equationText = document.querySelector("#equationText");
const equationBtn = document.querySelector("#equationBtn");

const scaleInput = document.querySelector("#scaleX");

scaleInput.addEventListener("change", (e) => {
    scale = e.target.value;
});

let eq = "";
let scale = 5;

scaleInput.value = scale;

// math.evaluate('12 / (2.3 + 0.7)')
equationBtn.addEventListener("click", (e) => {
    eq = equationText.value;
    console.log(eq);
    console.log(math.evaluate("y=2*7"));
});

let mode = "equation";

function switchMode(mode) {
    if (mode === "bezier") {
        bezierCanvas.style.display = "block";
        equationCanvas.style.display = "none";
        // equationInput.style.display = "none";
    } else {
        bezierCanvas.style.display = "none";
        equationCanvas.style.display = "block";
        // equationInput.style.display = "absolute";
    }
}

switchMode(mode);

menu.addEventListener("click", (e) => {
    if (e.target && e.target.matches("input[type=radio]")) {
        mode = e.target.value;
        console.log(mode);
        switchMode(mode);
    }
});

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

let cont1 = new Point(window.screen.width / 2, 50);
let cont2 = new Point(window.screen.width / 2, window.screen.height - 50);

points.push(head);
points.push(tail);
points.push(cont1);
points.push(cont2);

new p5(bezierSketch);
new p5(equationSketch);
new p5(surfaceSketch);
