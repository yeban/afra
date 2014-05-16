define(['JBrowse/Browser']
, function (Browser) {

    var config = {
        containerID: 'genome',
        baseUrl: 'data/jbrowse/',
        refSeqs: 'data/jbrowse/seq/refSeqs.json',
        include: ['data/jbrowse/trackList.json', 'data/jbrowse/edit-track.json', 'data/jbrowse/simple-track.json'],
        show_nav: false,
        show_tracklist: true,
        show_overview:  false,
        stores: {
            url: {
                type: "JBrowse/Store/SeqFeature/FromConfig",
                features: []
            }
        }
    };

    return ['$http', '$q', '$cookieStore', function (http, q, cookie) {
        this.browser = new Browser(config);
        this.searchSeqPrevDisabled = true;
        this.searchSeqNextDisabled = true;

        this.navigateToCurrentSearchSeqMatch = function() {
            var ref = this.browser.getCurrentRefSeq();
            var start = this.browser.searchSeqMatches[this.browser.currentSearchSeqMatch];
            var location = {
                ref: ref.name,
                start: start,
                end: start + this.previousSearchSequence.length
            };
            this.browser.navigateToLocation(location);
        };


        this.searchSequence = function(arg) {
            var self = this;
            self.browser.currentSearchSequence = self.currentSearchSequence;

            var sameSearch = self.currentSearchSequence === self.previousSearchSequence;
            var hasSearchMatches = this.browser.searchSeqMatches && this.browser.searchSeqMatches.length > 0;

            if (sameSearch && hasSearchMatches) {
                if (arg === 'previous' && self.browser.currentSearchSeqMatch > 0) {
                    self.browser.currentSearchSeqMatch -= 1;
                    self.navigateToCurrentSearchSeqMatch();
                }
                else if (arg === 'next' && self.browser.currentSearchSeqMatch < self.browser.searchSeqMatches.length) {
                    self.browser.currentSearchSeqMatch += 1;
                    self.navigateToCurrentSearchSeqMatch();
                }
                self.searchSeqPrevDisabled = self.browser.currentSearchSeqMatch <= 0;
                self.searchSeqNextDisabled = self.browser.currentSearchSeqMatch >= self.browser.searchSeqMatches.length-1;
            }
            else {
                newSearch();
            }

            function newSearch() {
                var ref = self.browser.getCurrentRefSeq();
                var searchRegex = new RegExp(self.currentSearchSequence, 'g');
                var ref = self.browser.getCurrentRefSeq();
                var featureParams = {
                    ref: ref.name,
                    start: ref.start,
                    end: ref.end
                };
                self.browser.getSequenceTrack().store.getFeatures(featureParams, gotFeature);
                function gotFeature(feature) {
                    var seq = feature.get('seq');
                    var matches = [];
                    while ( (match = searchRegex.exec(seq)) ) {
                        matches.push(match.index);
                    }
                    self.previousSearchSequence = self.currentSearchSequence;
                    self.browser.searchSeqMatches = matches;
                    self.browser.currentSearchSeqMatch = -1;
                    if (matches.length > 0) {
                        self.searchSequence('next');
                    }
                }
            }
        };

        this.sidebar_visible = true;
        this.toggle_sidebar  = function () {
            this.sidebar_visible = !this.sidebar_visible;
            var thisB = this.browser;
            setTimeout(function () {
                thisB.browserWidget.resize({w: $('#genome').width()});
            }, 0);
        };

        this.load = function (task) {
            this.browser.showRegion(task);
        };

        this.edits = function () {
            return this.browser.getEditTrack().store.features;
        };

        this.clear_edits = function () {
            this.browser.getEditTrack().store.features = {};
        };

        var jbrowse = this;

        var get = function () {
            return http.get('data/tasks/next')
            .then(function (response) {
                return response.data;
            })
            .then(function (task) {
                cookie.put('task', task);
                return task;
            });
        };

        var put = function (id, submission) {
            _.each(_.values(submission), function (f) {
                f.set('ref', f.get('seq_id'));
            });
            var data = JSON.stringify(submission, function (key, value) {
                if (key === '_parent' && value) {
                    return value.id();
                }
                else {
                    return value;
                }
            });
            return http.post('data/tasks/' + id, data).then(function (response) {
                console.log('saved submission');
            });
            // what on failure?
        };

        this.done = function () {
            var task = cookie.get('task');
            put(task.id, jbrowse.edits())
            .then(function () {
                cookie.remove('task');
                $('#thanks').modal();
            });
        };

        $('#thanks').on('hidden.bs.modal', function () {
            jbrowse.clear_edits();
            get()
            .then(function (task) {
                jbrowse.load(task);
            });
        });

        // initialize
        q.when(cookie.get('task'))
        .then(function (task) {
            return task || get();
        })
        .then(function (task) {
            jbrowse.load(task);
        });
    }];
});
