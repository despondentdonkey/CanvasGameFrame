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

        xml: {
                load: function(url, file) {
                    var filepath = url + "/" + file;
                    console.log(filepath);
                    var jqxhr = $.ajax({
                        url: filepath,
                        beforeSend: function(xhr) {
                            xhr.overrideMimeType("application/xml; charset=utf-8");
                        }
                    }).success(function(data) {
                        alert("data loaded!");
                        return data;
                    }).error(function(data) {
                        console.error("Error loading xml data from " + url);
                    });
                },

                toJSON: function(xml) {

                }
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
        }
    };
}
