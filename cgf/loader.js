//Loads Image and Audio assets that have been added.
function Loader() {
    'use strict';
    var assets = [];
    var loaded = 0;

    var files = [];
    var loadedFiles = [];

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

        file: function(id, path, callback) {
            files.push({
                id: id,
                path: path,
                callback: function(data) {
                    return callback(id, path, data);
                }
            });
        },

        //Call this when the document has been loaded. Specify a callback function to continue after the assets have been loaded.
        load: function(callback) {
            var loadComplete = function(cb) {
                if (loaded >= assets.length && loadedFiles.length >= files.length) {
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
                }
            }

            for (var i in files) {     
                $.ajax({
                    url : files[i].path,
                    dataType: "text",
                }).done(function(data) {
                    // Refer to length of loadedFiles array for current file
                    var loadedCount = loadedFiles.length;
                    loadedFiles.push({
                        id: files[loadedCount].id,
                        path: files[loadedCount].path,
                        data: data
                    });
                    files[loadedCount].callback(data);
                    loadComplete(callback);
                });
            }
        }
    };
}
