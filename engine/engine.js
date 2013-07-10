var canvas, gl;

function Time() {'use strict';}

Time.lastFPS = (new Date()).getTime();
Time.fpsCounter = 0;
Time.fps = 0;

Time.lastFrame = 0;
Time.delta = 0;

Time.get = function() {
    'use strict';
    return (new Date()).getTime();
};

Time.update = function() {
    'use strict';
    if (Time.get() - Time.lastFPS > 1000) {
        Time.fps = Time.fpsCounter;
        Time.fpsCounter = 0; //reset the FPS counter
        Time.lastFPS += 1000; //add one second
    }
    Time.fpsCounter++;

    var time = Time.get();
    var deltaTime = (time - Time.lastFrame);
    Time.lastFrame = time;
    if (!(deltaTime >= time))
        Time.delta = deltaTime;
};

function Engine() {'use strict';}

Engine.init = function(frameRate, useInput) {
	console.time("Engine initialized");

	Engine.frameRate = typeof frameRate !== "undefined" ? frameRate : 60;
	Engine.useInput = typeof useInput !== "undefined" ? useInput : true;
	canvas = $("#canvas").get(0);

	gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

	if (gl) {
		console.log("WebGL context found!");
		gl.viewport(0, 0, canvas.width, canvas.height);

		if (Engine.useInput) {
			Keyboard.init(canvas);
			Mouse.init(canvas);
		}

		$(canvas).focus();

		console.timeEnd("Engine initialized");

		Engine.run();       
	} else {
		console.error("WebGL context not found.");
	}	
}

Engine.run = function() {
	Engine.update();

	if (Engine.useInput) {
		Keyboard.update();
		Mouse.update();
	}
	Time.update();

	Engine.render();
	setTimeout(Engine.run, 1000/Engine.frameRate);
}

//These methods will be overridden.
Engine.update = function() {}
Engine.render = function() {}