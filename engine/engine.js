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

function Canvas(canvasID, _useWebGL, useInput) {
    'use strict';
    var id = canvasID,
    useWebGL = _useWebGL,
    element = $("#" + id).get(0),
    context; 

    if (useWebGL) {
    	context = element.getContext("webgl") || element.getContext("experimental-webgl");
		if (context) {
			console.log("WebGL context found for " + id + "!");

			if (useInput) {
				Keyboard.init(element);
				Mouse.init(element);
			}    
		} else {
			console.error("WebGL context not found for " + id + ".");
		}	
    } else {

    }

    return {
    	render: function(c) {},
    	getContext: function() {
    		return context;
    	},
    }
}

function Engine() {'use strict';} //Handles the loop since Javascript doesn't offer threading. 

Engine.canvasList = new Array();

//Initializes everything needed before you start the loop.
Engine.init = function(frameRate) {
	//Default values
	Engine.frameRate = typeof frameRate !== "undefined" ? frameRate : 60;
}

Engine.add = function(canvas) {
	Engine.canvasList.push(canvas);
}

//This is pretty much the loop. 
Engine.run = function() {
	Engine.update();
	Time.update();

	for (var i=0; i<Engine.canvasList.length; ++i) {
		Engine.canvasList[i].render(Engine.canvasList[i].getContext());
	}

	setTimeout(Engine.run, 1000/Engine.frameRate); //Executes this function again after the time has passed which causes a synced loop to occur.
}

//These methods will be overridden.
Engine.update = function() {}
