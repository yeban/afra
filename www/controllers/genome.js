require.config({
    paths: {
        jquery:    'lib/jquery/jquery'
    },
    packages:[{
        name:     'dojo',
        location: 'lib/dojo'
    },
    {
        name:     'dijit',
        location: 'lib/dijit'
    },
    {
        name:     'dojox',
        location: 'lib/dojox'
    },
    {
        name:     'jszlib',
        location: 'lib/jszlib'
    },
    {
        name:     'dgrid',
        location: 'lib/dgrid'
    },
    {
        name:     'xstyle',
        location: 'lib/xstyle'
    },
    {
        name:     'put-selector',
        location: 'lib/put-selector'
    },
    {
        name:     'FileSaver',
        location: 'lib/FileSaver'
    },
    {
        name:     'jDataView',
        location: 'lib/jDataView/src',
        main:     'jdataview'
    },
    {
        name:     'jqueryui',
        location: 'lib/jqueryui'
    }]
});

define(['JBrowse/Browser', 'module']
, function (Browser, module) {

    var config = angular.extend({
        containerID: 'genome',
        baseUrl: 'data/jbrowse/',
        refSeqs: 'data/jbrowse/seq/refSeqs.json',
        include: ['data/jbrowse/trackList.json', 'data/jbrowse/edit-track.json', 'data/jbrowse/simple-track.json'],
        show_nav: false,
        show_tracklist: false,
        show_overview:  false,
        stores: {
            url: {
                type: "JBrowse/Store/SeqFeature/FromConfig",
                features: []
            }
        }
    }, module.config());

    return ['$http', '$q', '$cookieStore', function (http, q, cookie) {
        this.browser = new Browser(config);

        this.load = function (task) {
            this.browser.showRegion(task);
        };

        this.edits = function () {
            return this.browser._getPlugin('WebApollo').then(function (wa) {
                return wa.getAnnotTrack().store.features;
            });
        };

        this.clear_edits = function () {
            return this.browser._getPlugin('WebApollo').then(function (wa) {
                wa.getAnnotTrack().store.features = {};
            });
        };

        var browser = this.browser;
        browser.afterMilestone('completely initialized', function () {
            //browser.showRegion({start: 50, end: 6000, tracks: ['simple_feature']});
            browser.showTracks(['simple_feature']);
        });
    }];
});
