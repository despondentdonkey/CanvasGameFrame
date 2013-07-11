var c, c2,
keys = Keyboard();
mouse = Mouse();

Engine.update = function() {
	$("#fps").html("FPS: " + Time.fps + " | Delta: " + Time.delta);

	if (keys.isDown('A')) {
		console.log("AI BABIE");
	}

	if (mouse.isPressed(Mouse.LEFT)) {
		console.log(mouse.x);
	}

	keys.update();
	mouse.update();
}

$(document).ready(function() {
	c = Canvas("canvas", false); //Uses canvas 2d api
	c2 = Canvas("canvas2", true); //Uses WebGL

	keys.init(c.getElement());
	mouse.init(c.getElement());

	c.render = function() {
		var gc = c.getContext();

		gc.fillStyle = "#0050FF";
		c.clear();
	}

	c2.render = function() {
		var gl = c2.getContext();
		gl.clearColor(0, 1, 0, 1);
		gl.clear(gl.COLOR_BUFFER_BIT);
	}

	Engine.init(60);

	Engine.add(c);
	Engine.add(c2);

	Engine.run();
});