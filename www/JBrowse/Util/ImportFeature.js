define([
        'JBrowse/Model/SimpleFeature'
        ],
function (SimpleFeature) {
    // Directly constructing a transcript out of parsed JSON data
    // results in a duplicated level of nesting inside array of
    // SimpleFeature objects.
    //
    // To avoid that, we:
    // * save the subfeatures array data from the parsed data,
    // * generate the full transcript and delete the incorrect portion,
    // * generate SimpleFeature objects from saved array and insert
    //   them back into the transcript,
    // * return the corrected transcript.
    var importFeature = function (featureJSON) {
        var subfeatures = featureJSON.data.subfeatures;
        delete featureJSON.data.subfeatures;
        var feature = new SimpleFeature(featureJSON);
        window.feature = feature;
        subfeatures = _.map(subfeatures, function (f) {
            f.parent = feature;
            return new SimpleFeature(f);
        });
        feature.set('subfeatures', subfeatures);
        return feature; };
    return importFeature;
});
