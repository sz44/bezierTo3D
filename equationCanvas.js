function equationSketch(p) {
    p.setup = () => {
        p.createCanvas(p.windowWidth / 2, p.windowHeight, equationCanvas);
    };

    p.draw = () => {};

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth / 2, p.windowHeight);
    };
}
