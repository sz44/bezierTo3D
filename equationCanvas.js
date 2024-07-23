function equationSketch(p) {
    p.setup = () => {
        width = p.windowWidth / 2;
        height = p.windowHeight;
        p.createCanvas(width, height, equationCanvas);
    };

    p.draw = () => {
        p.clear();
        p.scale(1, -1);
        p.translate(0, -height/2)
        p.beginShape();
        for (let x=0; x<80; x += 1/scale) {
            let y = math.evaluate(eq.replaceAll('x', x)) 
            if (y * scale > height/2) {
                break
            }
            p.vertex(x*scale, y*scale);
        }
        p.endShape();

    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth / 2, p.windowHeight);
    };
}


