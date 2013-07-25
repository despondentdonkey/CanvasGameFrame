Graphics = {};

// Create new image
Graphics.image = function(src) {

    var img = new Image();
    img.src = src;
    
    // Object with methods to alter img
    return {
        scale = function() {

        },
        clip = function() {

        },
        rotate = function() {

        }
    };
};

Graphics.animation = function(src) {
    // inherit from image.
    var anim = Graphics.image(src);

    return {

    };
};

Graphics.tileset = function(src) {

};

Graphics.draw = {};
Graphics.draw.circle = function() {

};

Graphics.draw.rect = function() {

};
