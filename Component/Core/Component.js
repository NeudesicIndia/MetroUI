Neudesic.utilities.namespace('neu.metro.ui', function (exports, $) {
    "use strict";

    var initializeComponent = function (e) {
        var $el = $(e),
            componentName = $el.attr('data-component'),
            componentClass = Neudesic.utilities.namespace(componentName),
            instance,
            args = [e, $el.data(),
                new neu.metro.events.EventBusProxy($el)];

        instance = Object.create(componentClass.prototype);

        if ('init' in instance) {
            instance.init.apply(instance, args);
        }

        componentClass.apply(instance, args);

        return instance;
    };

    $(function () {
        $('.component').each(function (i, e) {
            initializeComponent(e);
        });
    });

    exports.initializeComponent = initializeComponent;
}, window.jQuery);