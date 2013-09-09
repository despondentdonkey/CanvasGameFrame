//Loads Image and Audio assets that have been added.
function Loader() {
    'use strict';
    var assets = [];
    var loaded = 0;

    var files = [];
    var loadedFiles = [];
    var loadedFileCount = 0;

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

        addFile: function(id, path) {
            files.push({
                id: id,
                path: path
            });
        },

        getFile: function(id) {
            for (var i in loadedFiles) {
                if (loadedFiles[i].id === id) {
                    return loadedFiles[i];
                }
            }
        },

        //Call this when the document has been loaded. Specify a callback function to continue after the assets have been loaded.
        load: function(callback) {
            var loadComplete = function(cb) {
                if (loaded >= assets.length && loadedFileCount >= files.length) {
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
                    loadedFiles.push({
                        id: files[loadedFileCount].id, //Use loaded because i is set to the last value at this point for some reason.
                        path: files[loadedFileCount].path,
                        data: data
                    });

                    loadedFileCount++;
                    loadComplete(callback);
                });
            }
        }
    };
}
