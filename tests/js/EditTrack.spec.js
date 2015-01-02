define([
        'underscore',
        'jquery',
        'JBrowse/Browser',
        'JBrowse/View/Track/DraggableHTMLFeatures',
        'JBrowse/FeatureSelectionManager',
        'JBrowse/Util/FeatureEquality',
        '../tests/data/RefSeq',
        '../tests/data/RefSeq_2',
        '../tests/data/transcripts/transcript_data',
        '../tests/data/tracks',
        ], function (
            _,
            $,
            Browser,
            DraggableHTMLFeatures,
            FeatureSelectionManager,
            compareFeatures,
            refSeq,
            refSeq_2,
            transcript_data,
            track
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
        expect(refSeq_2).toBeDefined();
        expect(transcript_data).toBeDefined();
        expect(track).toBeDefined();
    });

    it( 'tests comparison function', function() {
        expect(compareFeatures(transcript_data["input"][0], transcript_data["input"][0])).toBe(true);
    });

    it('tests getWholeCDSCoordinates', function() {
        expect(editTrack.getWholeCDSCoordinates(transcript_data.input[0])).toEqual([undefined, undefined]);
        expect(editTrack.getWholeCDSCoordinates(transcript_data.input[1])).toEqual([19977, 18796]);
    });

    it('tests transcriptToCDNA', function() {
        expect(editTrack.transcriptToCDNA(transcript_data.input[3], 4)).toEqual(0);
    });

    it('tests CDNAToTranscript', function() {
        expect(editTrack.CDNAToTranscript(transcript_data.input[3], 0)).toEqual(4);
    });

    it('tests getCDNA', function() {
        expect(editTrack.getCDNA(refSeq_2, transcript_data.input[2])).toEqual(refSeq_2.slice(1));
    });

    it('tests getCDS', function() {
        expect(editTrack.getCDS(refSeq_2, transcript_data.input[2])).toEqual(refSeq_2.slice(1));
    });


    it ('test setORF', function() {
        // There is strong evidence that the `end` parameter of the transcript
        // data is exclusive. Let us read the gff specification
        expect(compareFeatures(
                editTrack.setORF(refSeq_2, transcript_data.input[2]),
                transcript_data.orf[0])).toBe(true);

        expect(compareFeatures(
                editTrack.setORF(refSeq_2, transcript_data.input[3]),
                transcript_data.orf[1])).toBe(true);

    });

    it ('tests setCDS', function() {
        expect(compareFeatures(
                editTrack.setCDS(transcript_data.input[4], 0, 24),
                transcript_data.cds[0])).toBe(true);
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

        exon = editTrack.filterExons(transcript_data["input"][1])[0];
        exon_ = editTrack.filterExons(transcript_data["input"][1])[1];
        var right = exon_.get('start') + 3;
        var left = exon.get('start');
        outTranscript = editTrack.resizeExon(refSeq, transcript_data["input"][1], exon, left, right);
        expect(compareFeatures(transcript_data["resize"][3], outTranscript)).toBe(true);
    });

    it( 'tests areOnSameStrand', function() {
        expect(editTrack.areOnSameStrand([transcript_data.input[0], transcript_data.input[2]])).toBe(true);
        expect(editTrack.areOnSameStrand([transcript_data.input[0], transcript_data.input[1]])).toBe(false);
    });

    it( 'tests mergeTranscripts', function() {
        expect(compareFeatures(
                editTrack.mergeTranscripts(refSeq_2,
                    [transcript_data.input[2], transcript_data.input[2]]),
                transcript_data.input[2])).toBe(true);

        expect(compareFeatures(
                editTrack.mergeTranscripts(refSeq_2,
                    [transcript_data.input[2], transcript_data.input[2], transcript_data.input[2]]),
                transcript_data.input[2])).toBe(true);

        expect(compareFeatures(
                editTrack.mergeTranscripts(refSeq_2,
                    [transcript_data.input[6], transcript_data.input[7]]),
                transcript_data.input[6])).toBe(true);

            expect(compareFeatures(
                    editTrack.mergeTranscripts(refSeq_2,
                        [transcript_data.input[4], transcript_data.input[5]]),
                    transcript_data.merge[0])).toBe(true);
    });

    it( 'tests normalizeFeature', function() {
        exon = editTrack.filterExons(transcript_data.input[7])[0];
        expect(compareFeatures(
                editTrack.normalizeFeature(exon, track),
                transcript_data.normalize[0])).toBe(true);
    });

});
});
