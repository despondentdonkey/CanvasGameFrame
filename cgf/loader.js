//Loads Image and Audio assets that have been added.
function Loader() {
    'use strict';
    var assets = [];
    var loaded = 0;

    //TESTS
    var jsonAssets = [];
    var jsonLoadedAssets = [];
    var jsonLoaded = 0;

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

        addJSON: function(id, fileName) {
            jsonAssets.push({
                id: id,
                fileName: fileName
            });
        },

        getJSON: function(id) {
            for (var i in jsonLoadedAssets) {
                if (jsonLoadedAssets[i].id === id) {
                    return jsonLoadedAssets[i].data;
                }
            }
        },

        //Call this when the document has been loaded. Specify a callback function to continue after the assets have been loaded.
        load: function(callback) {
            var loadComplete = function(cb) {
                if (loaded >= assets.length && jsonLoaded >= jsonAssets.length) {
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

            for (var i in jsonAssets) {     
                $.ajax({
                    url : jsonAssets[i].fileName,
                    dataType: "text",
                }).done(function(data) {
                    jsonLoadedAssets.push({
                        id: jsonAssets[jsonLoaded].id, //Use loaded because i is set to the last value at this point for some reason.
                        data: data
                    });

                    jsonLoaded++;
                    loadComplete(callback);
                });
            }
        }
    };
}
