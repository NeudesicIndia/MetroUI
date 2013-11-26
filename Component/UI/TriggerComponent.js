Neudesic.utilities.namespace('neu.metro.ui', function (exports, $) {
    "use strict";

    var TriggerComponent = function (element, data) {
        var self = this,
            $element = this.$element = $(element);
            
        this.targetComponent = data.targetComponent;
        this.triggerFrom = data.from;
        this.triggerTo = data.to;

        new neu.metro.ui.EventMapper(element, {
            from: self.triggerFrom,
            to: self.triggerTo,
            targetComponent: self.targetComponent
        });

    };

    exports.TriggerComponent = TriggerComponent;

}, window.jQuery);