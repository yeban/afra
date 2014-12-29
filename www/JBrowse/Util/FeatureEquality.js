define([
        "underscore",
        "JBrowse/Util/ImportFeature",
        "JBrowse/Util/ExportFeature"
        ],
function (_, importFeature, exportFeature) {

    return function(featureA, featureB) {
        // Strip a feature of parent, uniqueID and name
        var a = JSON.parse(exportFeature(featureA))["data"];
        var b = JSON.parse(exportFeature(featureB))["data"];

        console.log("--A--");
        console.log(JSON.stringify(a));
        console.log("--B--");
        console.log(JSON.stringify(b));
        window.a = a;
        window.b = b;
        return _.isEqual(a, b);
    };
});
