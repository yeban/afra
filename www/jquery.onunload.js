/*
 * Define functions to handle page unload events.
 * Note that these functions are added to global jQuery namespace.
 */
define(['jquery'], function ($) {
    $.extend({
        /* Add a navigation warning to window with appropriate message
         * determined by doneStatus param.
         */
        confirmDialog: function () {
            var confirmOnPageExit = function (evt) {
                var message = "Some of your unsaved changes may be lost. " +
                              "Please note that the search tracks and zoom " +
                              "level are not restored.";

                return message;
            };

            window.onbeforeunload = confirmOnPageExit;
        },

        /* Removes navigation warning from window object */
        removeDialog: function () {
            window.onbeforeunload = function () {};
        }
    });
});
