var c; //Canvas 2D Api Canvas
var glCanvas; //WebGL Canvas
var keys = Keyboard(); //Keyboard manager
var mouse = Mouse(); //Mouse manager
var loader = Loader(); //Asset manager

var ringAnim;

Loop.update = function() {
	$("#fps").html("FPS: " + Time.fps + " | Delta: " + Time.delta);

	if (keys.isDown('A')) {
		console.log("STOP HOLDING DOWN A!");
	}

	if (mouse.isPressed(Mouse.LEFT)) {
		mouse.print();
	}

	ringAnim.update(Time.delta);

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

	var cur = loader.image("cursor.png");
	var rings = loader.image("Rings_28x30_strip7.png");

	var greg = Graphic(cur);
	ringAnim = Animation(rings, 28, 30);

	var menuImg = loader.image("menu.png");
	var nineSl = NineSlice(menuImg);

	nineSl.topLeft = Rect(0, 0, 6, 5);
	nineSl.top = Rect(6, 0, 52, 5);
	nineSl.topRight = Rect(58, 0, 6, 6);
	nineSl.right = Rect(58, 5, 6, 54);
	nineSl.bottomRight = Rect(58, 59, 6, 5);
	nineSl.bottom = Rect(6, 59, 52, 5);
	nineSl.bottomLeft = Rect(0, 59, 6, 5);
	nineSl.left = Rect(0, 5, 6, 54);
	nineSl.center = Rect(6, 5, 52, 54);

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

		nineSl.render(gc, 0, 0, 200, 200);

		greg.render(gc);
		ringAnim.render(gc);
	};

	glCanvas.render = function() {
		var gl = glCanvas.getContext();
		gl.clearColor(0, 1, 0, 1);
		gl.clear(gl.COLOR_BUFFER_BIT);
	};

	Loop.init(60); //Initialize the engine and make it sync to 60 fps.

	//Add the canvases to the loop for rendering.
	Loop.add(c);
	Loop.add(glCanvas);

	loader.load(onAssetLoad);
});

function onAssetLoad() {
	Loop.run();
}