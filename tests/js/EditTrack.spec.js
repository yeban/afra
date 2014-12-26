define([
        'JBrowse/Browser',
        'JBrowse/View/Track/DraggableHTMLFeatures',
        'JBrowse/FeatureSelectionManager',
        'JBrowse/Util/FeatureEquality',
        '../tests/js/RefSeq',
        '../tests/js/OutTranscript',
        '../tests/js/InTranscript'
        ], function (Browser,
            DraggableHTMLFeatures,
            FeatureSelectionManager,
            compareFeatures,
            refSeq,
            expectedOutTranscript,
            inTranscript
            ) {


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
            window.editTrack = editTrack;
            window.inTranscript = inTranscript;
            window.expectedOutTranscript = expectedOutTranscript;
            window.compareFeatures = compareFeatures;
            done();
        }, 1000);
    });

    it( 'constructs', function() {
        expect(editTrack).toBeTruthy();
        expect(inTranscript).toBeDefined();
        expect(expectedOutTranscript).toBeDefined();
        expect(compareFeatures).toBeDefined();
        expect(refSeq).toBeDefined();
    });

    it( 'resizeExon', function() {
        exon = editTrack.filterExons(inTranscript)[0];
        var right = 17120;
        var left = exon.get('start');
        outTranscript = editTrack.resizeExon(refSeq, inTranscript, exon, left, right);
        window.outTranscript = outTranscript;
        expect(compareFeatures(expectedOutTranscript, outTranscript)).toBe(true);
    });
});
});
