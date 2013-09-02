//Loads Image and Audio assets that have been added.
function Loader() {
    'use strict';
    var assets = [];
    var loaded = 0;

    var add = function(asset) {
        assets.push(asset);
    };

    return {
        image: function(src) {
            var newImage = new Image();
            newImage.src = src;
            add(newImage);
            return newImage;
        },

        audio: function(src) {
            var newAudio = new Audio();
            newAudio.src = src;
            add(newAudio);
            return newAudio;
        },

        // Queues JSON for loading
        json: function(filepath, callback) {
            // add function to assets to check for function in Loader.load
            add(function() {
                // Return an object to pass filepath
                return {
                    // Callback function to assign data to a container (or anything else, really)
                    callback: function(obj) {
                        return callback(obj);
                    },
                    filepath: filepath
                };
            });
        },

        //Call this when the document has been loaded. Specify a callback function to continue after the assets have been loaded.
        load: function(callback) {
            var loadComplete = function(cb) {
                if (loaded >= assets.length) {
                    cb();
                }
            };

            for (var i=0; i<assets.length; i++) {
                if (assets[i] instanceof Image) {
                    $(assets[i]).load(function() {
                        loaded++;
                        loadComplete(callback);
                    });
                } else if (assets[i] instanceof Audio) {
                    $(assets[i]).on('canplay oncanplaythrough', function() {
                        loaded++;
                        loadComplete(callback);
                    });
                // Loads XML file and converts to JSON via AJAX and $.xml2json jquery plugin
                // Calls callback when loading has finished.
                } else if (assets[i] instanceof Function) {
                    var lvlObj = assets[i]();
                    $.ajax({
                        url: lvlObj.filepath,
                        beforeSend: function(xhr) {
                            // Force mime type to xml (oel is typically unrecognized as xml)
                            xhr.overrideMimeType("application/xml; charset=utf-8");
                        }
                    }).fail(function(data) {
                        console.error("Error loading XML data from " + this.url);
                    }).done(function(data) {
                        var obj = $.xml2json(data);
                        lvlObj.callback(obj);
                        loaded++;
                        loadComplete(callback);
                    });

                }
            }
        }
    };
}
