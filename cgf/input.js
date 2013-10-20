//input.js a handy input manager if you have a game loop.

function Keyboard() { //tabindex="1" is required in the canvas tag for keyboard use.
    'use strict';
    var down = [],
    downCount = 0,

    pressed = [],
    pressedCount = 0,

    released = [],
    releasedCount = 0;

    var onKeyDown = function(e) {
        if (!down[e.which]) {
            down[e.which] = true;
            downCount++;
            pressed[pressedCount] = e.which;
            pressedCount++;
        }
    };

    var onKeyUp = function(e) {
        if (down[e.which]) {
            down[e.which] = false;
            downCount--;
            released[releasedCount] = e.which;
            releasedCount++;
        }
    };

    return {
        attach: function(element) { //Attach an element to this instance to check for key presses.
            $(element).bind('keydown', onKeyDown);
            $(element).bind('keyup', onKeyUp);
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

    var mouseMoving = false;

    var onMouseMove = function(e) {
        pX = e.pageX;
        pY = e.pageY;
        oX = $(e.target).offset().left; //MUST USE THIS VERSION. offsetX/Y doens't work in Firefox.
        oY = $(e.target).offset().top;
        mouseMoving = true;
    };

    var onMouseDown = function(e) {
        if (!down[e.which]) {
            down[e.which] = true;
            downCount++;
            pressed[pressedCount] = e.which;
            pressedCount++;
        }
    };

    var onMouseUp = function(e) {
        if (down[e.which]) {
            down[e.which] = false;
            downCount--;
            released[releasedCount] = e.which;
            releasedCount++;
        }
    };

    return {
        x: 0, y: 0,

        attach: function(element) { //Attach an element to this instance to check for mouse events.
            $(element).bind('mousemove', onMouseMove);
            $(element).bind('mousedown', onMouseDown);
            $(element).bind('mouseup', onMouseUp);
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

            mouseMoving = false;
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

        isMoving: function() {
            return mouseMoving;
        },

        print: function() {
            console.log("Mouse Object: x"+this.x+", y"+this.y);
        },
    }
}

//Keyboard codes. For letters and numbers on the keyboard use a string of the capital character.

Keyboard.BACKSPACE = 8;
Keyboard.TAB = 9;

Keyboard.ENTER = 13;

Keyboard.SHIFT = 16;
Keyboard.CTRL = 17;
Keyboard.ALT = 18;

Keyboard.CAPSLOCK = 20;

Keyboard.ESCAPE = 27;

Keyboard.PAGEUP = 33;
Keyboard.PAGEDOWN = 34;
Keyboard.END = 35;
Keyboard.HOME = 36;
Keyboard.LEFT = 37;
Keyboard.UP = 38;
Keyboard.RIGHT = 39;
Keyboard.DOWN = 40;

Keyboard.INSERT = 45;
Keyboard.DELETE = 46;

Keyboard.ZERO = 96;
Keyboard.ONE = 97;
Keyboard.TWO = 98;
Keyboard.THREE = 99;
Keyboard.FOUR = 100;
Keyboard.FIVE = 101;
Keyboard.SIX = 102;
Keyboard.SEVEN = 103;
Keyboard.EIGHT = 104;
Keyboard.NINE = 105;

Keyboard.SEMICOLON = 186;
Keyboard.EQUAL = 187;
Keyboard.COMMA = 188;
Keyboard.DASH = 189;
Keyboard.PERIOD = 190;
Keyboard.SLASH = 191;
Keyboard.GRAVE = 192;

Keyboard.OPENBRACKET = 219;
Keyboard.BACKSLASH = 220;
Keyboard.CLOSEBRACKET = 221;
Keyboard.QUOTE = 222;

Mouse.LEFT = 1;
Mouse.MIDDLE = 2;
Mouse.RIGHT = 3;
