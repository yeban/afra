define([
        'underscore',
        'jquery',
        'JBrowse/Browser',
        'JBrowse/View/Track/DraggableHTMLFeatures',
        'JBrowse/FeatureSelectionManager',
        'JBrowse/Util/FeatureEquality',
        '../tests/data/RefSeq',
        '../tests/data/transcripts/transcript_data'
        ], function (
            _,
            $,
            Browser,
            DraggableHTMLFeatures,
            FeatureSelectionManager,
            compareFeatures,
            refSeq,
            transcript_data
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
    var x;

    beforeEach(function(done) {
        setTimeout(function () {
            editTrack = jbrowse.getEditTrack();
            done();
        }, 1000);
    });

    it( 'constructs', function() {
        expect(editTrack).toBeTruthy();
        expect(compareFeatures).toBeDefined();
        expect(refSeq).toBeDefined();
        expect(transcript_data).toBeDefined();
    });

    it ( 'test comparison function', function() {
        expect(compareFeatures(transcript_data["input"][0], transcript_data["input"][0])).toBe(true);
    });

    it( 'resizeExon no merge no change in translation start of stop', function() {
        exon = editTrack.filterExons(transcript_data["input"][0])[0];
        var right = 17120;
        var left = exon.get('start');
        outTranscript = editTrack.resizeExon(refSeq, transcript_data["input"][0], exon, left, right);
        expect(compareFeatures(transcript_data["resize"][0], outTranscript)).toBe(true);

        // Use vimdiff to see the difference between the input
        // transcript and the expected output transcript
        exon = editTrack.filterExons(transcript_data["input"][1])[1];
        var right = exon.get('end') + 3;
        var left = exon.get('start');
        outTranscript = editTrack.resizeExon(refSeq, transcript_data["input"][1], exon, left, right);
        expect(compareFeatures(transcript_data["resize"][2], outTranscript)).toBe(true);
    });

    it( 'resizeExon merging no change in translation start of stop', function() {
        exon = editTrack.filterExons(transcript_data["input"][0])[0];
        var right = 19080;
        var left = exon.get('start');
        outTranscript = editTrack.resizeExon(refSeq, transcript_data["input"][0], exon, left, right);
        expect(compareFeatures(transcript_data["resize"][1], outTranscript)).toBe(true);
    });
});
});
