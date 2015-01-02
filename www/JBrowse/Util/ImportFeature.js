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
    var sortAnnotationsByLocation = function(annots) {
        return annots.sort(function(annot1, annot2) {
                               var start1 = annot1.get("start");
                               var end1 = annot1.get("end");
                               var start2 = annot2.get("start");
                               var end2 = annot2.get('end');

                               if (start1 != start2)  { return start1 - start2; }
                               else if (end1 != end2) { return end1 - end2; }
                               else                   { return 0; }
                           });};

    var importFeature = function (featureJSON) {
        var subfeatures = featureJSON.data.subfeatures;
        delete featureJSON.data.subfeatures;
        var feature = new SimpleFeature(featureJSON);
        window.feature = feature;
        subfeatures = sortAnnotationsByLocation(_.map(subfeatures, function (f) {
            f.parent = feature;
            return new SimpleFeature(f);
        }));
        feature.set('subfeatures', subfeatures);
        return feature; };
    return importFeature;
});
