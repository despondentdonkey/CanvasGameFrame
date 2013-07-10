Engine.update = function() {
	$("#fps").html("FPS: " + Time.fps + " | Delta: " + Time.delta);
}

Engine.render = function() {
	gl.clearColor(0.0, 0.5, 1.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
}

$(document).ready(function() {
	Engine.init("canvas", 60, true);
});