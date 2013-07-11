function Keyboard() {
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



//Mouse
function Mouse() {'use strict';}

Mouse.LEFT = 1;
Mouse.MIDDLE = 2;
Mouse.RIGHT = 3;

Mouse.down = [];
Mouse.downCount = 0;

Mouse.pressed = [];
Mouse.pressedCount = 0;

Mouse.released = [];
Mouse.releasedCount = 0;

Mouse.clX = 0;
Mouse.clY = 0;
Mouse.oX = 0;
Mouse.oY = 0;

Mouse.init = function(canvas) {
    $(canvas).bind('mousemove', Mouse.onMouseMove);
	$(canvas).bind('mousedown', Mouse.onMouseDown);
	$(canvas).bind('mouseup', Mouse.onMouseUp);
}

Mouse.update = function() {
	while (Mouse.pressedCount > 0) {
		Mouse.pressedCount--;
		Mouse.pressed[Mouse.pressedCount] = -1;
	}

	while (Mouse.releasedCount > 0) {
		Mouse.releasedCount--;
		Mouse.released[Mouse.releasedCount] = -1;
	}
    Mouse.x = Mouse.clX - Mouse.oX; 
    Mouse.y = Mouse.clY - Mouse.oY;
}

Mouse.onMouseMove = function(e) {
	Mouse.clX = e.clientX;
	Mouse.clY = e.clientY;
	Mouse.oX = $(e.target).offset().left; //MUST USE THIS VERSION. offsetX/Y doens't work in Firefox.
	Mouse.oY = $(e.target).offset().top;
}

Mouse.onMouseDown = function(e) {
	if (!Mouse.down[e.which]) {
		Mouse.down[e.which] = true;
		Mouse.downCount++;
		Mouse.pressed[Mouse.pressedCount] = e.which;
		Mouse.pressedCount++;
	}
}

Mouse.onMouseUp = function(e) {
	if (Mouse.down[e.which]) {
		Mouse.down[e.which] = false;
		Mouse.downCount--;
		Mouse.released[Mouse.releasedCount] = e.which;
		Mouse.releasedCount++;
	}
}

Mouse.isDown = function(button) {
	for (var i = 0; i < Mouse.down.length; i++) {
		if (Mouse.down[button]) {
			return true;
		}
	}
	return false;
}

Mouse.isPressed = function(button) {
	for (var i = 0; i < Mouse.pressed.length; i++) {
		if (Mouse.pressed[i] === button) {
			return true;
		}
	}
	return false;
}

Mouse.isReleased = function(button) {
	for (var i = 0; i < Mouse.released.length; i++) {
		if (Mouse.released[i] === button) {
			return true;
		}
	}
	return false;
}