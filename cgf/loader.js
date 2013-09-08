//Loads Image and Audio assets that have been added.
function Loader() {
    'use strict';
    var assets = [];
    var loaded = 0;

    var add = function(asset) {
        assets.push(asset);
    };
    
    // Returns an object used for loading levels.
    var getLevelObj = function(type, filepath, callback) {
        // Return an object to pass filepath
        return {
            filepath: filepath,
            type: type,
            // Callback function to assign data to a container (or anything else, really)
            callback: function(obj) {
                return callback(obj);
            }
        };
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

        // Queues XML for loading
        xml: function(filepath, callback) {
            add(function() {
                return getLevelObj("xml", filepath, callback);
            });
        },
        
        // Queues JSON for loading
        json: function(filepath, callback) {
            add(function() {
                return getLevelObj("json", filepath, callback);
            });
        },

        //Call this when the document has been loaded. Specify a callback function to continue after the assets have been loaded.
        load: function(callback) {
            var loadComplete = function(cb) {
                loaded++;
                if (loaded >= assets.length) {
                    if (BPM.debug) console.log("*************LOAD COMPLETE");
                    cb();
                }
            };

            for (var i=0; i<assets.length; i++) {
                if (assets[i] instanceof Image) {
                    $(assets[i]).load(function() {
                        loadComplete(callback);
                    });
                } else if (assets[i] instanceof Audio) {
                    $(assets[i]).on('canplay oncanplaythrough', function() {
                        loadComplete(callback);
                    });
                // Loads XML file and converts to JSON via AJAX and $.xml2json jquery plugin
                // Calls callback when loading has finished.
                } else if (assets[i] instanceof Function) {
                    var lvlObj = assets[i]();
                    if (!lvlObj || !lvlObj.type || (typeof lvlObj.type !== "string")) {
                        console.error("Error @ Loader.load: Level object does not exist or the type provided is invalid.");
                        return;
                    }
                    if (lvlObj.type.toLowerCase() === "xml") {
                        $.ajax({
                            url: lvlObj.filepath,
                            dataType: "xml",
                            beforeSend: function(xhr) {
                                // Force mime type to xml (oel is typically unrecognized as xml)
                                xhr.overrideMimeType("application/xml; charset=utf-8");
                            }
                        }).fail(function(data) {
                            console.error("Error loading XML data from " + this.url);
                        }).done(function(data) {
                            var obj = $.xml2json(data);
                            lvlObj.callback(obj);
                            loadComplete(callback);
                        });
                    } else if (lvlObj.type.toLowerCase() === "json") {
                        $.ajax({
                            url: lvlObj.filepath,
                            dataType: "json"
                        }).fail(function(data) {
                            console.error("Error loading JSON data from " + this.url);
                        }).done(function(data) {
                            lvlObj.callback(data);
                            loadComplete(callback);
                        });
                    }
                } else {
                    console.error("Error @ Loader.load: Unknown asset type.");
                }
            }
        }
    };
}
