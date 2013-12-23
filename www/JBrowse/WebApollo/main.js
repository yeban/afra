define(
       [
           'dojo/_base/declare',
           'dijit/MenuItem', 
           'dijit/CheckedMenuItem',
           'dijit/form/DropDownButton',
           'dijit/DropDownMenu',
           'JBrowse/Plugin',
           'WebApollo/FeatureEdgeMatchManager',
           'WebApollo/FeatureSelectionManager',
           'WebApollo/TrackConfigTransformer'
       ],
    function( declare, dijitMenuItem, dijitCheckedMenuItem, dijitDropDownButton, dijitDropDownMenu, JBPlugin, 
              FeatureEdgeMatchManager, FeatureSelectionManager, TrackConfigTransformer ) {

return declare( JBPlugin,
{

    constructor: function( args ) {
        var thisB = this;
        this.colorCdsByFrame = false;
        this.searchMenuInitialized = false;
        var browser = this.browser;  // this.browser set in Plugin superclass constructor

        // hand the browser object to the feature edge match manager
        FeatureEdgeMatchManager.setBrowser( browser );

        this.featSelectionManager = new FeatureSelectionManager();
        this.annotSelectionManager = new FeatureSelectionManager();
        this.trackTransformer = new TrackConfigTransformer();

        // setting up selection exclusiveOr --
        //    if selection is made in annot track, any selection in other tracks is deselected, and vice versa,
        //    regardless of multi-select mode etc.
        this.annotSelectionManager.addMutualExclusion(this.featSelectionManager);
        this.featSelectionManager.addMutualExclusion(this.annotSelectionManager);

        FeatureEdgeMatchManager.addSelectionManager(this.featSelectionManager);
        FeatureEdgeMatchManager.addSelectionManager(this.annotSelectionManager);


        // add a global menu option for setting CDS color
        var cds_frame_toggle = new dijitCheckedMenuItem(
                {
                    label: "Color by CDS frame",
                    checked: false,
                    onClick: function(event) {
                        thisB.colorCdsByFrame = cds_frame_toggle.checked;
                        browser.view.redrawTracks();
                    }
                });
        browser.addGlobalMenuItem( 'options', cds_frame_toggle );
        var plus_strand_toggle = new dijitCheckedMenuItem(
                {
                    label: "Show plus strand",
                    checked: true,
                    onClick: function(event) {
                        var plus = plus_strand_toggle.checked;
                        var minus = minus_strand_toggle.checked;
                        console.log("plus: ", plus, " minus: ", minus);
                        if (plus && minus)  {
                            browser.view.featureFilter = browser.view.passAllFilter;
                        }
                        else if (plus)  {
                            browser.view.featureFilter = browser.view.plusStrandFilter;
                        }
                        else if (minus)  {
                            browser.view.featureFilter = browser.view.minusStrandFilter;
                        }
                        else  {
                            browser.view.featureFilter = browser.view.passNoneFilter;
                        }
                        // browser.view.redrawTracks();
                        thisB.redoLayout();
                    }
                });
        browser.addGlobalMenuItem( 'options', plus_strand_toggle );
        var minus_strand_toggle = new dijitCheckedMenuItem(
                {
                    label: "Show minus strand",
                    checked: true,
                    onClick: function(event) {
                        var plus = plus_strand_toggle.checked;
                        var minus = minus_strand_toggle.checked;
                        console.log("plus: ", plus, " minus: ", minus);
                        if (plus && minus)  {
                            browser.view.featureFilter = browser.view.passAllFilter;
                        }
                        else if (plus)  {
                            browser.view.featureFilter = browser.view.plusStrandFilter;
                        }
                        else if (minus)  {
                            browser.view.featureFilter = browser.view.minusStrandFilter;
                        }
                        else  {
                            browser.view.featureFilter = browser.view.passNoneFilter;
                        }
                        // browser.view.redrawTracks();
                        thisB.redoLayout();
                    }
                });
        browser.addGlobalMenuItem( 'options', minus_strand_toggle );

        // register the WebApollo track types with the browser, so
        // that the open-file dialog and other things will have them
        // as options
        browser.registerTrackType({
            type:                 'WebApollo/View/Track/DraggableHTMLFeatures',
            defaultForStoreTypes: [ 'JBrowse/Store/SeqFeature/NCList',
                                    'JBrowse/Store/SeqFeature/GFF3'
                                  ],
            label: 'WebApollo Features'
        });
        browser.registerTrackType({
            type:                 'WebApollo/View/Track/DraggableAlignments',
            defaultForStoreTypes: [ 
                                    'JBrowse/Store/SeqFeature/BAM',
                                  ],
            label: 'WebApollo Alignments'
        });
        browser.registerTrackType({
            type:                 'WebApollo/View/Track/SequenceTrack',
            defaultForStoreTypes: [ 'JBrowse/Store/Sequence/StaticChunked' ],
            label: 'WebApollo Sequence'
        });


        // transform track configs from vanilla JBrowse to WebApollo:
        // type: "JBrowse/View/Track/HTMLFeatures" ==> "WebApollo/View/Track/DraggableHTMLFeatures"
        var track_configs = browser.config.tracks;
        for (var i=0; i<track_configs.length; i++)  {
            var track_config = track_configs[i];
            this.trackTransformer.transform(track_config);
        }
    },

    // would rather call view.redrawTracks()
    //
    // BUT, view.redrawTracks currently doesn't force relayout
    //     browser.view.redrawTracks();
    // track.changed() forces relayout (at least for HTMLFeatures)
    //    but also call changeCallBack(), which currently is always view.showVisibleBlocks()
    //    thus will needlessly call view.showVisibleBlocks() repeatedly 
    // so trying for now to be explicit
    redoLayout: function()  {
        this.browser.view.trackIterate( function(t) { 
                                       t.hideAll(); 
                                       if (t._clearLayout)  { 
                                           // console.log("clearing layout for track: " + t.label);
                                           t._clearLayout(); 
                                       } 
                                   } 
                                 );
        this.browser.view.showVisibleBlocks(true);
    },

    getAnnotTrack: function()  {
        if (this.browser && this.browser.view && this.browser.view.tracks)  {
            var tracks = this.browser.view.tracks;
            for (var i = 0; i < tracks.length; i++)  {
                // should be doing instanceof here, but class setup is not being cooperative
                if (tracks[i].isWebApolloAnnotTrack)  {
                    return tracks[i];
                }
            }
        }
        return null;
    },

    /** ported from berkeleybop/jbrowse GenomeView.js
     * returns char height/width on GenomeView
     */
    getSequenceCharacterSize: function(recalc)  {
        var container = this.browser.container;
        if (this.browser.view && this.browser.view.elem)  {
            container = this.browser.view.elem;
        }
        if (recalc || (! this._charSize))  {
            //	    this._charSize = this.calculateSequenceCharacterSize(this.browser.view.elem);
            this._charSize = this.calculateSequenceCharacterSize(container);
        }
        return this._charSize;
    },

    /**
     * ported from berkeleybop/jbrowse GenomeView.js 
     * Conducts a test with DOM elements to measure sequence text width
     * and height.
     */
    calculateSequenceCharacterSize: function( containerElement ) {
        var widthTest = document.createElement("div");
        widthTest.className = "wa-sequence";
        widthTest.style.visibility = "hidden";
        var widthText = "12345678901234567890123456789012345678901234567890";
        widthTest.appendChild(document.createTextNode(widthText));
        containerElement.appendChild(widthTest);

        var result = {
            width:  widthTest.clientWidth / widthText.length,
            height: widthTest.clientHeight
        };

        containerElement.removeChild(widthTest);
        return result;
    },

    /** utility function, given an array with objects that have label props, 
     *        return array with all objects that don't have label
     *   D = [ { label: A }, { label: B}, { label: C } ]
     *   E = D.removeItemWithLabel("B");
     *   E ==> [ { label: A }, { label: C } ]
     */
    removeItemWithLabel: function(inarray, label) {
        var outarray = [];
        for (var i=0; i<inarray.length; i++) {
            var obj = inarray[i];
            if (! (obj.label && (obj.label === label))) {
                outarray.push(obj);
            }
        }
        return outarray;
    }
});

});
