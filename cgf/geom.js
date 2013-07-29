function vec2(_x, _y) {
	return {
		x: _x, y: _y,
	}
}

function vec3(_x, _y, _z) {
	return {
		x: _x, y: _y, z: _z,
	}
}

function vec4(_x, _y, _z, _w) {
	return {
		x: _x, y: _y, z: _z, w: _w,
	}
}

function Rect(_x, _y, _width, _height) {
    return {
        x: _x, y: _y, width: _width, height: _height,
    }
}

function Circle(context, config) {
    var x = config.x || 0;
    var y = config.y || 0;
    var radius = config.radius || 10;
    var color = config.color || 'black';
    var fillColor = config.fillColor;
    var lineWidth = config.lineWidth || 10;
    
    return {
        sketch: function() {
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI);
        },
        stroke: function() {
            context.lineWidth = lineWidth;
            context.strokeStyle = color;
            context.stroke();
        },
        fill: function() {
            if (fillColor) {
                context.fillStyle = fillColor;
                context.fill();
            }
        },
        draw: function() {
            this.sketch();
            this.stroke();
            this.fill();
        },
        setX: function(newX) {
            x = newX;
        },
        setY: function(newY) {
            y = newY;
        },
        setRadius: function(newRadius) {
            radius = newRadius;
        },
        setColor: function(newColor) {
            color = newColor;
        },
        setFillColor: function(newFillColor) {
            fillColor = newFillColor;
        }
    };
}
