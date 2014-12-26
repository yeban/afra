define([
        'JBrowse/Browser',
        'JBrowse/View/Track/DraggableHTMLFeatures',
        'JBrowse/FeatureSelectionManager',
        'JBrowse/View/Track/EditTrack',
        '../tests/js/RefSeq',
        '../tests/js/Transcript'
        ], function (Browser, DraggableHTMLFeatures, FeatureSelectionManager, EditTrack,
            SimpleFeature, refSeq, transcript) {

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

    beforeEach(function(done) {
        setTimeout(function () {
            editTrack = jbrowse.getEditTrack();
            done();
        }, 1000);
    });

    it( 'constructs', function() {
        expect(editTrack).toBeTruthy();
        expect(transcript).toBeDefined();
        expect(refSeq).toBeDefined();
    });

    it ( 'resizeExon', function() {
    });
});
});
