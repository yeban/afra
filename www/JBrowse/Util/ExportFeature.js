define([
       "JBrowse/Util/SortAnnotationsByLocation"
        ],
function (sortAnnotationsByLocation) {
    var exportFeature = function (transcript) {
        var subfeatures = transcript.data.subfeatures;
        if (subfeatures !== undefined) {
            subfeatures = sortAnnotationsByLocation(subfeatures);
            transcript.set('subfeatures', subfeatures);
        }

        return JSON.stringify(transcript, function (key, value) {
            if (((key === '_parent' || key === '_uniqueID') || ( key === 'name' || key === '__proto__')) && value) return;
            return value;
        });
    };
    window.exportFeature = exportFeature;
    return exportFeature;
});
