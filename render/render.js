function Graphic(image) {
    var img = image;
    return {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        originX: 0,
        originY: 0,
        angle: 0,
        render: function(gc) {
            gc.save();
            gc.translate(this.x, this.y);
            gc.rotate(this.angle*(Math.PI/180));
            gc.drawImage(img, -this.originX, -this.originY, img.width * this.scaleX, img.height * this.scaleY);
            gc.rotate(0);
            gc.restore();
        },

        getImage: function() {
            return img;
        },
        getWidth: function() {
            return img.width;
        },
        getHeight: function() {
            return img.height;
        },
    }
}

function Animation(image, _cellWidth, _cellHeight) {
    'use strict';
    var base = Graphic(image),
    cellWidth = _cellWidth,
    cellHeight = _cellHeight,
    cells,
    cell = 0,
    timer = 0,
    speed = 1;

    base.render = function(gc, delta) {
        var img = base.getImage();
        cells = img.width / cellWidth - 1; //For some reason base.img won't work in the constructor.
        
        gc.save();
        gc.translate(base.x, base.y);
        gc.rotate(base.angle*(Math.PI/180));
        gc.drawImage(img, cell*cellWidth, 0, cellWidth, cellHeight, -base.originX, -base.originY, cellWidth * base.scaleX, cellHeight * base.scaleY);
        gc.rotate(0);
        gc.restore();
        
        if (timer >= delta) {
            if (cell < cells) {
                cell++;
            } else {
                cell = 0;
            }
            timer = 0;
        } else {
            timer += delta * speed;
        }
    };

    base.getWidth = function() {
        return cellWidth;
    };

    base.getHeight = function() {
        return cellHeight;
    };

    base.getSpeed = function() {
        return speed;
    };

    base.setSpeed = function(value) {
        speed = value;
    };

    return base;
}