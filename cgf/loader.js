//Loads Image and Audio assets that have been added.
function Loader() {
    'use strict';
    var assets = [];
    var loaded = 0;

    var files = [];

    var add = function(asset) {
        assets.push(asset);
    };

    /* parse
        Parses text to supported file type based on given file path.
        If file type not supported, returns plain text.

        Supported types
            json - jQuery.parseJSON
            xml - $.xml2json plugin
    */
    var parse = function(filepath, data) {
        var types = {
            "json": $.parseJSON,
            "xml": $.xml2json,
            "oel": $.xml2json
        };

        for (var t in types) {
            var ext = filepath.slice(-t.length);
            if (ext === t) {
                return types[t](data);
            }
        }
        
        return data;
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

        /* loader.file
            Loads file via ajax. callback called on load complete.
            
            id
                preferrably string id of file
            path
                full file path of file
            callback
                called when file is loaded.
            parse
                boolean. true to parse data by file extension
                supported file types are in parse function
        */
        file: function(id, path, callback, parse) {
            files.push({
                id: id,
                path: path,
                parse: parse,
                callback: function(data) {
                    return callback(id, path, data);
                }
            });
        },

        //Call this when the document has been loaded. Specify a callback function to continue after the assets have been loaded.
        load: function(callback) {
            var loadComplete = function(cb) {
                loaded++;
                if (loaded >= (assets.length + files.length)) {
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
                }
            }

            for (var i in files) {
                $.ajax({
                    url : files[i].path,
                    dataType: "text",
                    beforeSend: function(xhr, settings) {
                        // Store necessary file data in the xhr object
                        xhr.fileData = files[i];
                    }
                }).done(function(data, status, xhr) {
                    // Retrieve file data from xhr, parse loaded data
                    if (files[i].parse) {
                        data = parse(xhr.fileData.path, data);
                    }
                    xhr.fileData.callback(data);
                    loadComplete(callback);
                });
            }
        }
    };
}
