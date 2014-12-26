define(['underscore',
        'dojo/_base/declare',
        'JBrowse/Store/SeqFeature',
        'JBrowse/Model/SimpleFeature',
        'JBrowse/Store/Stack']
, function(_, declare, SeqFeature, SimpleFeature, Stack) {

    return declare(SeqFeature, {

        constructor: function (args) {
            this.inherited(arguments);
            this.refSeq   = args.refSeq;
            this.features = this._makeFeatures(this.config.features || []);

            // Fetch features from local storage
            this.localFeatures = this._parseLocalStorage();
            if (this.localFeatures) {
                this.features = _.union(this.features, this.localFeatures);
            }

            this._calculateStats();
        },

        insert: function (feature) {
            this.features.push(feature);
            this._updateLocalStorage(this.features);
            this._calculateStats();
        },

        replace: function (feature) {
            var index = _.indexOf(this.ids(), feature.id());
            this.features[index] = feature;
            this._updateLocalStorage(this.features);
            this._calculateStats();
        },

        remove: function (feature) {
            var index = _.indexOf(this.ids(), feature.id());
            this.features.splice(index, 1);
            this._updateLocalStorage(this.features);
            this._calculateStats();
        },

        get: function (id) {
            return _.find(this.features, function (f) {
                return f.id() === id;
            });
        },

        ids: function () {
            return _.map(this.features, function (f) {return f.id();});
        },

        _parseLocalStorage: function () {
            localFeatures = JSON.parse(localStorage.getItem('features'));
            localFeatures = _.map(localFeatures, function (feature) {
                var subfeatures = feature.data.subfeatures;
                delete feature.data.subfeatures;
                var transcript = new SimpleFeature(feature);
                subfeatures = _.map(subfeatures, function (f) {
                    f.parent = transcript;
                    return new SimpleFeature(f);
                });
                transcript.set('subfeatures', subfeatures);
                return transcript;
            });
            return localFeatures;
        },

        _updateLocalStorage: function (features) {
            var features = JSON.stringify(features, function (key, value) {
                if (key === '_parent' && value) return;
                return value;
            });
            localStorage.setItem('features', features);
        },

        _makeFeatures: function (fdata) {
            return _.map(fdata, _.bind(function (fd) {
                return this._makeFeature(fd);
            }, this));
        },

        _parseInt: function (data) {
            _.each(['start','end','strand'], function (field) {
                if (field in data)
                    data[field] = parseInt(data[field]);
            });
            if ('score' in data)
                data.score = parseFloat(data.score);
            if ('subfeatures' in data)
                for (var i=0; i<data.subfeatures.length; i++)
            this._parseInt(data.subfeatures[i]);
        },

        _makeFeature: function (data, parent) {
            this._parseInt(data);
            return new SimpleFeature({data: data, parent: parent});
        },

        _calculateStats: function () {
            var minStart = Infinity;
            var maxEnd = -Infinity;
            var featureCount = 0;
            _.each(this.features, function (f) {
                var s = f.get('start');
                var e = f.get('end');
                if (s < minStart)
                    minStart = s;

                if (e > maxEnd)
                    maxEnd = e;

                featureCount++;
            });

            this.globalStats = {
                featureDensity: featureCount / (this.refSeq.end - this.refSeq.start + 1),
                featureCount:   featureCount,
                minStart:       minStart,            /* 5'-most feature start */
                maxEnd:         maxEnd,              /* 3'-most feature end   */
                span:           (maxEnd-minStart+1)  /* min span containing all features */
            };
        },

        getFeatures: function (query, featCallback, endCallback, errorCallback) {
            var start = query.start;
            var end   = query.end;
            _.each(this.features, _.bind(function (f) {
                if (!(f.get('end') < start || f.get('start') > end)) {
                    featCallback(f);
                }
            }, this));
            if (endCallback)  { endCallback() }
        },

        undo: function () {
            this.redoStateStack = this.redoStateStack || new Stack();
            var redoState = this.features.slice();
            this.redoStateStack.push(redoState);

            var undoState = this.undoStateStack.pop();
            this.features = undoState;
        },

        redo: function () {
            this.undoStateStack = this.undoStateStack || new Stack() ;
            var undoState = this.features.slice();
            this.undoStateStack.push(undoState);

            var redoState = this.redoStateStack.pop();
            this.features = redoState;
        },

        backupStore: function () {
            var undoState = this.features.slice();
            this.undoStateStack = this.undoStateStack || new Stack() ;
            this.undoStateStack.push(undoState);
        }

    });
});
