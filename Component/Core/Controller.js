Neudesic.utilities.namespace('neu.metro.ui', function (exports, $) {
    "use strict";

    var Controller = function () {};

    Controller.prototype = {
        init: function (element, options, events) {
            var self = this;

            this.$element = $(element);

            this.$element.on('click', '[data-action]', function () {
                var actions = $(this).data('action').split(' '),
                    action,
                    i,
                    length;

                for (i = 0, length = actions.length; i < length; ++i) {
                    action = actions[i];

                    if (action in self) {
                        self[action].call(self, this, $(this).data());
                    }
                }
            });
        }
    };

    exports.Controller = Controller;
}, window.jQuery);