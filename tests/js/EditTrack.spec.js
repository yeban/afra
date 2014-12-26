define([
        'JBrowse/Browser',
        'JBrowse/View/Track/DraggableHTMLFeatures',
        'JBrowse/FeatureSelectionManager',
        'JBrowse/View/Track/EditTrack',
        'JBrowse/Model/SimpleFeature'
        ], function (Browser, DraggableHTMLFeatures, FeatureSelectionManager, EditTrack,
            SimpleFeature) {

describe( "Edit Track", function() {

    var baseURL = '/data/jbrowse/Solenopsis_invicta/Si_gnF';
    var jbrowse = new Browser({
        containerID: 'genome',
        baseUrl: baseURL,
        include: [baseURL + '/trackList.json', '/data/jbrowse/edit-track.json'],
        refSeqs: baseURL + '/seq/refSeqs.json'
    });

    var editTrack;
    var input_refSeq;
    var transcript_data = {
    "_uniqueID": "SimpleFeature_2",
    "data": {
        "end": 21389,
        "name": "Si_estOR100817isotig20471",
        "seq_id": "Si_gnF.scaffold02797",
        "start": 16946,
        "strand": 1,
        "subfeatures": [
            {
                "_uniqueID": "SimpleFeature_2_3",
                "data": {
                    "end": 17116,
                    "name": "Si_estOR100817isotig20471",
                    "seq_id": "Si_gnF.scaffold02797",
                    "start": 16946,
                    "strand": 1,
                    "type": "exon"
                }
            },
            {
                "_uniqueID": "SimpleFeature_2_317",
                "data": {
                    "end": 17116,
                    "seq_id": "Si_gnF.scaffold02797",
                    "start": 17116,
                    "strand": 1,
                    "type": "non_canonical_splice_site"
                }
            },
            {
                "_uniqueID": "SimpleFeature_2_318",
                "data": {
                    "end": 19075,
                    "seq_id": "Si_gnF.scaffold02797",
                    "start": 19075,
                    "strand": 1,
                    "type": "non_canonical_splice_site"
                }
            },
            {
                "_uniqueID": "SimpleFeature_2_4",
                "data": {
                    "end": 19197,
                    "name": "Si_estOR100817isotig20471",
                    "seq_id": "Si_gnF.scaffold02797",
                    "start": 19075,
                    "strand": 1,
                    "type": "exon"
                }
            },
            {
                "_uniqueID": "SimpleFeature_2_5",
                "data": {
                    "end": 20446,
                    "name": "Si_estOR100817isotig20471",
                    "seq_id": "Si_gnF.scaffold02797",
                    "start": 20258,
                    "strand": 1,
                    "type": "exon"
                }
            },
            {
                "_uniqueID": "SimpleFeature_2_6",
                "data": {
                    "end": 21106,
                    "name": "Si_estOR100817isotig20471",
                    "seq_id": "Si_gnF.scaffold02797",
                    "start": 21002,
                    "strand": 1,
                    "type": "exon"
                }
            },
            {
                "_uniqueID": "SimpleFeature_2_7",
                "data": {
                    "end": 21389,
                    "name": "Si_estOR100817isotig20471",
                    "seq_id": "Si_gnF.scaffold02797",
                    "start": 21298,
                    "strand": 1,
                    "type": "exon"
                }
            }
        ],
        "type": "transcript"
    },
    "normalized": true
}

    var transcript = new SimpleFeature(transcript_data);

    beforeEach(function(done) {
        setTimeout(function () {
            editTrack = jbrowse.getEditTrack();
            done();
        }, 500);
    });

    it( 'constructs', function() {

        expect(editTrack).toBeTruthy();
    });
});
});

