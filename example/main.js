var c; //Canvas 2D Api Canvas
var glCanvas; //WebGL Canvas
var keys = Keyboard(); //Keyboard manager
var mouse = Mouse(); //Mouse manager
var loader = Loader(); //Asset manager

var ringAnim;

var cur, rings, menuImg;
var nineSl;

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

	cur = loader.image("cursor.png");
	rings = loader.image("Rings_28x30_strip7.png");

	var greg = Graphic(cur);
	ringAnim = Animation(rings, 28, 30);

	menuImg = loader.image("menu.png");
	nineSl = NineSlice(menuImg);


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

	//Add the canvases to the loop for rendering.
	Loop.add(c);
	Loop.add(glCanvas);

	loader.load(onAssetLoad);
});

function onAssetLoad() {
	nineSl.setDimensions(Rect(6, 5, 52, 54));
	Loop.run();
}
