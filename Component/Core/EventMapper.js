Neudesic.utilities.namespace("neu.metro.ui", function (exports, $) {
    var EventMapper = function (element, options, events) {
        var $element = $(element),
            targetComponent = options.targetComponent,
            eventList = options.from.split(' '),
            i,
            length = eventList.length;

        if (typeof targetComponent == 'undefined') {
            targetComponent = $element.parent().closest('[data-component]');
        }

        for (i = 0; i < length; ++i) {
            $element.on(eventList[i], function () {
                neu.metro.events.GlobalEventBus.send(targetComponent, options.to, options.data);
            });
        }
    };

    exports.EventMapper = EventMapper;
}, window.jQuery);