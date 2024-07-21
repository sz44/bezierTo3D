function surfaceSketch(p) {
    p.setup = () => {
        p.createCanvas(p.windowWidth / 2, p.windowHeight, p.WEBGL, surfaceCanvas);

        // let cam = p.createCamera();
        // cam.setPosition(0, p.height/2, 800);
        // cam.lookAt(0, 0, 0);

        green1Light = "hsl(153, 39%, 60%)";
        green1Dark = "hsl(152, 39%, 20%)";
        white = "rgb(255,255,255)";

        // limit = 1000, if need more change above to t <= 1.0001 to catch decimal error
        detail = 20;
        angleStep = Math.PI / 12;
    };
    p.draw = () => {
        p.background(255);
        // p.translate(0, -p.height / 2);
        // p.scale(1/2);

		if (mode === "bezier") {
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
		} else {
			p.fill(p.color(green1Light));
			for (let theta = 0; theta < p.TWO_PI; theta += angleStep) {
				p.beginShape(p.QUAD_STRIP);
				for (let x = 0; x < 20; x += 1) {
					let y = math.evaluate(eq.replaceAll('x', x)) 

					let newX1 = x * p.cos(theta);
					let newZ1 = x * p.sin(theta);
					let newX2 = x * p.cos(theta + angleStep);
					let newZ2 = x * p.sin(theta + angleStep);
	
					p.vertex(newX1 * 20, -y, newZ1 * 20);
					p.vertex(newX2 * 20, -y, newZ2 * 20);
				}
				p.endShape();
			}
		}

        p.orbitControl();
    };
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth / 2, p.windowHeight);
    };
}