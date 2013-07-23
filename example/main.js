var c, //Canvas 2D Api Canvas
glCanvas, //WebGL Canvas
keys = Keyboard(), //Keyboard manager
mouse = Mouse(); //Mouse manager

Engine.update = function() {
	$("#fps").html("FPS: " + Time.fps + " | Delta: " + Time.delta);

	if (keys.isDown('A')) {
		console.log("STOP HOLDING DOWN A!");
	}

	if (mouse.isPressed(Mouse.LEFT)) {
		mouse.print();
	}

	keys.update(); //These need to be called last in order for the pressed/released functions to work.
	mouse.update();
};

$(document).ready(function() {
	//Create our canvases, specify the canvas id and then if you want WebGL.
	c = Canvas("canvas", false); //Uses canvas 2d api
	glCanvas = Canvas("glCanvas", true); //Uses WebGL

	//Attach elements to the key/mouse manager to check for input. 
	keys.attach(c.getElement());
	keys.attach(glCanvas.getElement());
	mouse.attach(c.getElement());

	c.render = function() {
		var gc = c.getContext();

		gc.fillStyle = "#0050FF";
		c.clear();

	    gc.fillStyle = '#FFFFFF';
		gc.strokeStyle = '#000000';

		gc.font = "bold 16px sans-serif";
		gc.textBaseline = "top";

		gc.lineWidth = 3;
			gc.strokeText("Yo this is text", 0, 0);
			gc.fillText("Yo this is text", 0, 0);
		gc.lineWidth = 1;
	};

	glCanvas.render = function() {
		var gl = glCanvas.getContext();
		gl.clearColor(0, 1, 0, 1);
		gl.clear(gl.COLOR_BUFFER_BIT);
	};

	Engine.init(60); //Initialize the engine and make it sync to 60 fps.

	//Add the canvases to the loop for rendering.
	Engine.add(c);
	Engine.add(glCanvas);

	Engine.run(); //Starts the loop.
});