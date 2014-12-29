define([
        './input_1',
        './input_2',
        './resize_1',
        './resize_2',
        './resize_3'
        ], function (
            input_1,
            input_2,
            resize_1,
            resize_2,
            resize_3
            ) {
var transcript_data = {
    "input": [input_1, input_2],
    "resize": [resize_1, resize_2, resize_3]
};
return transcript_data;
});
