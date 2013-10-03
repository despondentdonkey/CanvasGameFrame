function NineSlice(image) {
    var img = image;
    return {
        topLeft:undefined, top:undefined, topRight:undefined, 
        right:undefined, bottomRight:undefined, bottom:undefined, 
        bottomLeft:undefined, left:undefined, center:undefined,

        copyDimensions: function(slices) {
            this.topLeft = slice.topLeft;
            this.top = slice.top;
            this.topRight = slice.topRight;
            this.right = slice.right;
            this.bottomRight = slice.bottomRight;
            this.bottom = slice.bottom;
            this.bottomLeft = slice.bottomLeft;
            this.left = slice.left;
            this.center = slice.center;
        },

        render: function(gc, x, y, width, height) {
            gc.drawImage(img, this.left.x, this.left.y, this.left.width, this.left.height, x, y+this.topLeft.height, this.left.width, height-this.topLeft.height); //Left
            gc.drawImage(img, this.top.x, this.top.y, this.top.width, this.top.height, x+this.topLeft.width, y, width-this.topLeft.width, this.top.height); //Top
            gc.drawImage(img, this.right.x, this.right.y, this.right.width, this.right.height, x+width, y+this.topRight.height, this.right.width, height-this.topRight.height); //Right
            gc.drawImage(img, this.bottom.x, this.bottom.y, this.bottom.width, this.bottom.height, x+this.bottomLeft.width, y+height, width-this.bottomLeft.width, this.bottom.height); //Bottom
            gc.drawImage(img, this.topLeft.x, this.topLeft.y, this.topLeft.width, this.topLeft.height, x, y, this.topLeft.width, this.topLeft.height); //TopLeft
            gc.drawImage(img, this.topRight.x, this.topRight.y, this.topRight.width, this.topRight.height, x+width, y, this.topRight.width, this.topRight.height); //TopRight
            gc.drawImage(img, this.bottomRight.x, this.bottomRight.y, this.bottomRight.width, this.bottomRight.height, x+width, y+height, this.bottomRight.width, this.bottomRight.height); //BottomRight
            gc.drawImage(img, this.bottomLeft.x, this.bottomLeft.y, this.bottomLeft.width, this.bottomLeft.height, x, y+height, this.bottomRight.width, this.bottomRight.height); //BottomLeft
            if (this.center) gc.drawImage(img, this.center.x, this.center.y, this.center.width, this.center.height, x+this.left.width, y+this.top.height, width-this.left.width, height-this.top.height); //Center
        },
    }
}

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

    base.onComplete = undefined;

    base.update = function(delta) {
        if (timer >= delta) {
            if (cell < cells) {
                cell++;
            } else {
                if (base.onComplete) {
                    base.onComplete();
                }
                cell = 0;
            }
            timer = 0;
        } else {
            timer += delta * speed;
        }
    };

    base.render = function(gc) {
        var img = base.getImage();
        cells = img.width / cellWidth - 1; //For some reason base.img won't work in the constructor.
        
        gc.save();
        gc.translate(base.x, base.y);
        gc.rotate(base.angle*(Math.PI/180));
        gc.drawImage(img, cell*cellWidth, 0, cellWidth, cellHeight, -base.originX, -base.originY, cellWidth * base.scaleX, cellHeight * base.scaleY);
        gc.rotate(0);
        gc.restore();
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
