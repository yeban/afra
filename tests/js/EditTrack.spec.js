define([
        'JBrowse/Browser',
        'JBrowse/View/Track/DraggableHTMLFeatures',
        'JBrowse/FeatureSelectionManager',
        'JBrowse/Util/FeatureEquality',
        '../tests/js/RefSeq',
        '../tests/js/OutTranscript',
        '../tests/js/OutTranscriptMerge',
        '../tests/js/InTranscript'
        ], function (Browser,
            DraggableHTMLFeatures,
            FeatureSelectionManager,
            compareFeatures,
            refSeq,
            expectedTranscript,
            expectedTranscriptMerge,
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
            done();
        }, 1000);
    });

    it( 'constructs', function() {
        expect(editTrack).toBeTruthy();
        expect(inTranscript).toBeDefined();
        expect(expectedTranscript).toBeDefined();
        expect(expectedTranscriptMerge).toBeDefined();
        expect(compareFeatures).toBeDefined();
        expect(refSeq).toBeDefined();
    });

    it( 'resizeExon no merge no change in translation start of stop', function() {
        exon = editTrack.filterExons(inTranscript)[0];
        var right = 17120;
        var left = exon.get('start');
        outTranscript = editTrack.resizeExon(refSeq, inTranscript, exon, left, right);
        expect(compareFeatures(expectedTranscript, outTranscript)).toBe(true);
    });

    it( 'resizeExon merging no change in translation start of stop', function() {
        exon = editTrack.filterExons(inTranscript)[0];
        var right = 19080;
        var left = exon.get('start');
        outTranscript = editTrack.resizeExon(refSeq, inTranscript, exon, left, right);
        expect(compareFeatures(expectedTranscriptMerge, outTranscript)).toBe(true);
    });
});
});
