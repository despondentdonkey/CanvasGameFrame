var c, c2;

Engine.update = function() {
	$("#fps").html("FPS: " + Time.fps + " | Delta: " + Time.delta);
}

$(document).ready(function() {
	c = Canvas("canvas", false, true); //Uses canvas 2d api
	c2 = Canvas("canvas2", true, true); //Uses WebGL

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