define([
        'JBrowse/Browser',
        'JBrowse/View/Track/DraggableHTMLFeatures',
        'JBrowse/FeatureSelectionManager',
        'JBrowse/View/Track/EditTrack'
        ], function (Browser, DraggableHTMLFeatures, FeatureSelectionManager, EditTrack) {

describe( "Edit Track", function() {

    var baseURL = '/data/jbrowse/Solenopsis_invicta/Si_gnF'; 
    var jbrowse = new Browser({
        containerID: 'genome',
        baseUrl: baseURL,
        include: [baseURL + '/trackList.json', '/data/jbrowse/edit-track.json'],
        refSeqs: baseURL + '/seq/refSeqs.json'
    });

    var editTrack;

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

