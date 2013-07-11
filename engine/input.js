function Keyboard() { //tabindex="1" is required in the canvas tag for keyboard use.
	'use strict';
	var down = [],
	downCount = 0,

	pressed = [],
	pressedCount = 0,

	released = [],
	releasedCount = 0;

	return {
		init: function(element) {
			$(element).bind('keydown', this.onKeyDown);
			$(element).bind('keyup', this.onKeyUp);
		},

		update: function() {
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

	clX = 0,
	clY = 0,
	oX = 0,
	oY = 0;

	return {
		x: 0, y: 0,

		init: function(element) {
		    $(element).bind('mousemove', this.onMouseMove);
			$(element).bind('mousedown', this.onMouseDown);
			$(element).bind('mouseup', this.onMouseUp);
		},

		update: function() {
			while (pressedCount > 0) {
				pressedCount--;
				pressed[pressedCount] = -1;
			}

			while (releasedCount > 0) {
				releasedCount--;
				released[releasedCount] = -1;
			}
		    this.x = clX - oX; 
		    this.y = clY - oY;
		},

		onMouseMove: function(e) {
			clX = e.clientX;
			clY = e.clientY;
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
				return clX;
			else
				return this.x;
		},

		getY: function(client) {
			var cl = typeof client !== "undefined" ? client : false;
			if (cl)
				return clY;
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
	}
}

Mouse.LEFT = 1;
Mouse.MIDDLE = 2;
Mouse.RIGHT = 3;