var canvas, gl; //Global gl context and canvas. 

function Time() {'use strict';} //Keeps track of the frame rate and delta time. Also includes useful time functions. 

Time.fps = 0; // Dynamic value containing the frame rate.
Time.delta = 0; // Dynamic value containing the time that passes each frame. 

Time.lastFPS = (new Date()).getTime();
Time.fpsCounter = 0;
Time.lastFrame = 0;

Time.get = function() {
    'use strict';
    return (new Date()).getTime();
};

//Updates the fps and delta values.
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

function Engine() {'use strict';} //Handles the loop since Javascript doesn't offer threading. 

//Initializes everything and starts the loop.
Engine.init = function(canvasID, frameRate, useInput) {
	console.time("Engine initialized");

	//Default values
	Engine.frameRate = typeof frameRate !== "undefined" ? frameRate : 60;
	Engine.useInput = typeof useInput !== "undefined" ? useInput : true;

	canvas = $("#" + canvasID).get(0); //Get the canvas element.

	gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl"); //Get the WebGL context. If it fails then try to get the experimental one. 

	if (gl) {
		console.log("WebGL context found!");
		gl.viewport(0, 0, canvas.width, canvas.height); //Set the view to the canvas width and height.

		if (Engine.useInput) {
			Keyboard.init(canvas);
			Mouse.init(canvas);
		}

		$(canvas).focus(); //Focus the canvas when initialized so we can use input without having to click into it.

		console.timeEnd("Engine initialized");

		Engine.run();       
	} else {
		console.error("WebGL context not found.");
	}	
}

//This is pretty much the loop. 
Engine.run = function() {
	Engine.update();

	if (Engine.useInput) {
		Keyboard.update();
		Mouse.update();
	}
	Time.update();

	Engine.render();
	setTimeout(Engine.run, 1000/Engine.frameRate); //Executes this function again after the time has passed which causes a synced loop to occur.
}

//These methods will be overridden.
Engine.update = function() {}
Engine.render = function() {}