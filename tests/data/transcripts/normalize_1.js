define([
        'JBrowse/Model/SimpleFeature',
        'JBrowse/Util/ImportFeature',
        'JBrowse/Util/ExportFeature'
        ],
function (SimpleFeature, importFeature, exportFeature) {
    var feature = {
    "data": {
        "end": 13,
        "start": 1,
        "strand": 1,
        "subfeatures": [
            {
                "data": {
                    "end": 13,
                    "start": 1,
                    "strand": 1,
                    "type": "exon"
                }
            }
        ],
        "type": "transcript"
    },
    "normalized": true,
};

var transcript = importFeature(feature);
return transcript;
});
