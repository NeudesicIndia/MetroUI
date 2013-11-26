Neudesic.utilities.namespace("neu.metro.events", function (exports, $) {
    var EventBus,
        EventBusProxy,
        GlobalEventBus;

    EventBus = function () {
    };

    EventBus.prototype.listen = function (namespace, channel, callback) {
        $(namespace).on(channel, function (event, data) {
            callback.call(null, data);
        });
    };

    EventBus.prototype.send = function (namespace, channel, data) {
        $(namespace).trigger(channel, [data]);
    };

    EventBusProxy = function ($element) {
        this.$element = $element;
    };

    EventBusProxy.prototype.emit = function (channel, data) {
        this.$element.trigger(channel, [data]);
    };

    EventBusProxy.prototype.listen = function (channel, callback) {
        this.$element.on(channel, function (event, data) {
            callback.call(null, data);
        });
    };

    globalEventBus = new EventBus();

    exports.GlobalEventBus = globalEventBus;
    exports.EventBusProxy = EventBusProxy;
}, window.jQuery);