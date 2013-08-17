//input.js a handy input manager if you have a game loop.

function Keyboard() { //tabindex="1" is required in the canvas tag for keyboard use.
	'use strict';
	var down = [],
	downCount = 0,

	pressed = [],
	pressedCount = 0,

	released = [],
	releasedCount = 0;

	return {
		attach: function(element) { //Attach an element to this instance to check for key presses. 
			$(element).bind('keydown', this.onKeyDown);
			$(element).bind('keyup', this.onKeyUp);
		},

		update: function() { //This should be called last in your loop.
			while (pressedCount > 0) {
				pressedCount--;
				pressed[pressedCount] = -1;
			}

			while (releasedCount > 0) {
				releasedCount--;
				released[releasedCount] = -1;
			}
		},

		onKeyDown: function(e) {
			if (!down[e.which]) {
				down[e.which] = true;
				downCount++;
				pressed[pressedCount] = e.which;
				pressedCount++;
			}
		},

		onKeyUp: function(e) {
			if (down[e.which]) {
				down[e.which] = false;
				downCount--;
				released[releasedCount] = e.which;
				releasedCount++;
			}
		},

		isDown: function(key) {
			for (var i = 0; i < down.length; i++) {
				if (down[(typeof key === "number" ? key:key.charCodeAt(0))]) {
					return true;
				}
			}
			return false;
		},

		isPressed: function(key) {
			for (var i = 0; i < pressed.length; i++) {
				if (pressed[i] === (typeof key === "number" ? key:key.charCodeAt(0))) {
					return true;
				}
			}
			return false;
		},

		isReleased: function(key) {
			for (var i = 0; i < released.length; i++) {
				if (released[i] === (typeof key === "number" ? key:key.charCodeAt(0))) {
					return true;
				}
			}
			return false;
		},
	}
}

function Mouse() {
	'use strict';
	var down = [],
	downCount = 0,

	pressed = [],
	pressedCount = 0,

	released = [],
	releasedCount = 0,

	pX = 0,
	pY = 0,
	oX = 0,
	oY = 0;

	return {
		x: 0, y: 0,

		attach: function(element) { //Attach an element to this instance to check for mouse events. 
		    $(element).bind('mousemove', this.onMouseMove);
			$(element).bind('mousedown', this.onMouseDown);
			$(element).bind('mouseup', this.onMouseUp);
		},

		update: function() { //This should be called last in your loop.
			while (pressedCount > 0) {
				pressedCount--;
				pressed[pressedCount] = -1;
			}

			while (releasedCount > 0) {
				releasedCount--;
				released[releasedCount] = -1;
			}
		    this.x = pX - oX;
		    this.y = pY - oY;
		},

		onMouseMove: function(e) {
			pX = e.pageX;
			pY = e.pageY;
			oX = $(e.target).offset().left; //MUST USE THIS VERSION. offsetX/Y doens't work in Firefox.
			oY = $(e.target).offset().top;
		},

		onMouseDown: function(e) {
			if (!down[e.which]) {
				down[e.which] = true;
				downCount++;
				pressed[pressedCount] = e.which;
				pressedCount++;
			}
		},

		onMouseUp: function(e) {
			if (down[e.which]) {
				down[e.which] = false;
				downCount--;
				released[releasedCount] = e.which;
				releasedCount++;
			}
		},

		getX: function(client) {
			var cl = typeof client !== "undefined" ? client : false;
			if (cl)
				return pX;
			else
				return this.x;
		},

		getY: function(client) {
			var cl = typeof client !== "undefined" ? client : false;
			if (cl)
				return pY;
			else
				return this.y;
		},

		isDown: function(button) {
			for (var i = 0; i < down.length; i++) {
				if (down[button]) {
					return true;
				}
			}
			return false;
		},

		isPressed: function(button) {
			for (var i = 0; i < pressed.length; i++) {
				if (pressed[i] === button) {
					return true;
				}
			}
			return false;
		},

		isReleased: function(button) {
			for (var i = 0; i < released.length; i++) {
				if (released[i] === button) {
					return true;
				}
			}
			return false;
		},

		isColliding: function(x1, y1, x2, y2) {
			if (this.x >= x1 && this.x <= x2) {
				if (this.y >= y1 && this.y <= y2) {
					return true;
				}
			}
			return false;
		},

		print: function() {
			console.log("Mouse Object: x"+this.x+", y"+this.y);
		},
	}
}

Mouse.LEFT = 1;
Mouse.MIDDLE = 2;
Mouse.RIGHT = 3;