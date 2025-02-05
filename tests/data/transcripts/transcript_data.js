define([
        './input_1',
        './input_2',
        './input_3',
        './input_4',
        './input_5',
        './input_6',
        './input_7',
        './input_8',
        './input_9',
        './input_10',
        './input_11',
        './resize_1',
        './resize_2',
        './resize_3',
        './resize_4',
        './orf_1',
        './orf_2',
        './orf_3',
        './non_canonical_1',
        './non_canonical_2',
        './cds_1',
        './cds_2',
        './merge_1',
        './merge_2',
        './normalize_1'
        ], function (
            input_1,
            input_2,
            input_3,
            input_4,
            input_5,
            input_6,
            input_7,
            input_8,
            input_9,
            input_10,
            input_11,
            resize_1,
            resize_2,
            resize_3,
            resize_4,
            orf_1,
            orf_2,
            orf_3,
            non_canonical_1,
            non_canonical_2,
            cds_1,
            cds_2,
            merge_1,
            merge_2,
            normalize_1
            ) {
var transcript_data = {
    "input": [input_1, input_2, input_3, input_4, input_5, input_6, input_7,
                input_8, input_9, input_10, input_11],
    "resize": [resize_1, resize_2, resize_3, resize_4],
    "orf": [orf_1, orf_2, orf_3],
    "non_canonical": [non_canonical_1, non_canonical_2],
    "cds": [cds_1, cds_2],
    "merge": [merge_1, merge_2],
    "normalize": [normalize_1]

};
return transcript_data;
});
