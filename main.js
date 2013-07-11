var c;

Engine.update = function() {
	$("#fps").html("FPS: " + Time.fps + " | Delta: " + Time.delta);
}

$(document).ready(function() {
	c = Canvas("canvas", true, true);

	c.render = function() {
		var gc = c.getContext();
		gc.clearColor(0.0, 0.5, 1.0, 1.0);
		gc.clear(gc.COLOR_BUFFER_BIT);
	}

	Engine.init(60);

	Engine.add(c);

	Engine.run();
});