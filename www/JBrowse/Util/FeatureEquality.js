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
        if ((a["start"] === b["start"] && a["end"] === b["end"]) && (a["seq_id"] === b["seq_id"] && a["strand"] === b["strand"])) {
            if (!_.isUndefined(a["subfeatures"]) && !_.isUndefined(b["subfeatures"])) {
                var common_subfeatures = _.intersection(a["subfeatures"], b["subfeatures"]);
                if (common_subfeatures.length === a["subfeatures"].length) {
                    return true;
                }
                return false;
            }
            return true;
        }
        return false; };});
