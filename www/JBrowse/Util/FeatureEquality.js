define([
        'underscore',
        'JBrowse/Util/ImportFeature',
        'JBrowse/Util/ExportFeature'
        ],
function (_, importFeature, exportFeature) {

    return function(featureA, featureB) {
        // Strip a feature of parent, uniqueID and name
        var a = JSON.parse(exportFeature(featureA));
        var b = JSON.parse(exportFeature(featureB));
        return _.isEqual(a, b);
    };
});
