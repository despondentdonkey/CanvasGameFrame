Engine.update = function() {
	console.log(Time.fps);

    if (Mouse.isDown(Mouse.LEFT)) {
		console.log(Mouse.x);
    }
}

Engine.render = function() {
	gl.clearColor(0.0, 0.5, 1.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
}

$(document).ready(function() {
	Engine.init(60, true);
});