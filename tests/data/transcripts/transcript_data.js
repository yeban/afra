define([
        './input_1',
        './input_2',
        './input_3',
        './input_4',
        './resize_1',
        './resize_2',
        './resize_3',
        './resize_4',
        './orf_1',
        './orf_2'
        ], function (
            input_1,
            input_2,
            input_3,
            input_4,
            resize_1,
            resize_2,
            resize_3,
            resize_4,
            orf_1,
            orf_2
            ) {
var transcript_data = {
    "input": [input_1, input_2, input_3, input_4],
    "resize": [resize_1, resize_2, resize_3, resize_4],
    "orf": [orf_1, orf_2]

};
return transcript_data;
});
