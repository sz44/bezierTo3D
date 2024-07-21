function equationSketch(p) {
    p.setup = () => {
        width = p.windowWidth / 2;
        height = p.windowHeight;
        p.createCanvas(width, height, equationCanvas);
    };

    p.draw = () => {
        p.clear();
        p.scale(1, -1);
        p.translate(0, -height)
        p.beginShape();
        for (let x=0; x<20; x += 1) {
            let y = math.evaluate(eq.replaceAll('x', x)) 
            p.vertex(x*20, y);
        }
        p.endShape();

    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth / 2, p.windowHeight);
    };
}


