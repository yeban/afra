define([],
function () {
    var exportFeature = function (transcript) {
        return JSON.stringify(transcript, function (key, value) {
            if (key === '_parent' && value) return;
            return value;
        });
    };
    return exportFeature;
});
