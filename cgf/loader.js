//Loads Image and Audio assets that have been added.
function Loader() {
    'use strict';
    var assets = [];
    var loaded = 0;

    return {
        add: function(asset) {
            assets.push(asset);
        },

        image: function(src) {
            var newImage = new Image();
            newImage.src = src;
            this.add(newImage);
            return newImage;
        },

        audio: function(src) {
            var newAudio = new Audio();
            newAudio.src = src;
            this.add(newAudio);
            return newAudio;
        },

        //Call this when the document has been loaded. Specify a callback function to continue after the assets have been loaded.
        load: function(callback) {
            for (var i=0; i<assets.length; i++) {
                if (assets[i] instanceof Image) {
                    $(assets[i]).load(function() {
                        loaded++;
                        if (loaded >= assets.length) {
                            callback();
                        }
                    });
                } else if (assets[i] instanceof Audio) {
                    $(assets[i]).on('canplay oncanplaythrough', function() {
                        loaded++;
                        if (loaded >= assets.length) {
                            callback();
                        }
                    });
                }
            }
        },
    }
}