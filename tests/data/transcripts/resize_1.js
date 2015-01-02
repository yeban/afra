define([
        'JBrowse/Model/SimpleFeature',
        'JBrowse/Util/ImportFeature',
        'JBrowse/Util/ExportFeature'
        ],
        function (SimpleFeature, importFeature, exportFeature) {
    var feature = {
    "_uniqueID": "SimpleFeature_2",
    "data": {
        "end": 21389,
        "name": "Si_estOR100817isotig20471",
        "seq_id": "Si_gnF.scaffold02797",
        "start": 16946,
        "strand": 1,
        "subfeatures": [
            {
                "_uniqueID": "SimpleFeature_2_3",
                "data": {
                    "end": 17120,
                    "name": "Si_estOR100817isotig20471",
                    "seq_id": "Si_gnF.scaffold02797",
                    "start": 16946,
                    "strand": 1,
                    "type": "exon"
                }
            },
            {
                "_uniqueID": "SimpleFeature_2_4",
                "data": {
                    "end": 19197,
                    "name": "Si_estOR100817isotig20471",
                    "seq_id": "Si_gnF.scaffold02797",
                    "start": 19075,
                    "strand": 1,
                    "type": "exon"
                }
            },
            {
                "_uniqueID": "SimpleFeature_2_5",
                "data": {
                    "end": 20446,
                    "name": "Si_estOR100817isotig20471",
                    "seq_id": "Si_gnF.scaffold02797",
                    "start": 20258,
                    "strand": 1,
                    "type": "exon"
                }
            },
            {
                "_uniqueID": "SimpleFeature_2_6",
                "data": {
                    "end": 21106,
                    "name": "Si_estOR100817isotig20471",
                    "seq_id": "Si_gnF.scaffold02797",
                    "start": 21002,
                    "strand": 1,
                    "type": "exon"
                }
            },
            {
                "_uniqueID": "SimpleFeature_2_7",
                "data": {
                    "end": 21389,
                    "name": "Si_estOR100817isotig20471",
                    "seq_id": "Si_gnF.scaffold02797",
                    "start": 21298,
                    "strand": 1,
                    "type": "exon"
                }
            }
        ],
        "type": "transcript"
    },
    "normalized": true
};

var transcript = importFeature(feature);
return transcript;});
