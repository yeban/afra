define([],
function () {
    var exportFeature = function (transcript) {
        return JSON.stringify(transcript, function (key, value) {
            if (((key === '_parent' || key === '_uniqueID') || ( key === 'name' || key === '__proto__')) && value) return;
            return value;
        });
    };
    return exportFeature;
});
