Neudesic.utilities.namespace('neu.metro.ui', function (exports, $) {
    "use strict";

    var Flyout = function () { };

    Flyout.prototype.init = function (element, data, events) {
        var self = this;
        this.$element = $(element);
        this.isShown = false;
        this.events = events;
        this.charmBar = data.charmBar;

        this.events.listen('show', this.show.bind(this));
        this.events.listen('hide', this.hide.bind(this));

    };

    Flyout.prototype.show = function () {
        var self = this;
        this.$element.addClass('shown');
        this.$element.after('<div class="pane-backdrop" />');
        this.isShown = true;
        this.events.emit('shown');

        if (self.charmBar) {
            neu.metro.events.GlobalEventBus.send(self.charmBar, 'hide');
        }
        
       $(document).on('keyup.hideFlyout', function (e) {
            if (e.keyCode == 27) {
                self.hide();
            }
        });

        $(document).on('click.hideFlyout', '.pane-backdrop', function (e) {
            e.stopPropagation();
            self.hide();
            return false;
        });

    };

    Flyout.prototype.hide = function () {
        var self = this;
        this.$element.removeClass('shown');
        $('.pane-backdrop').remove();
        this.isShown = false;
        this.events.emit('hidden');

        if (self.charmBar) {
            neu.metro.events.GlobalEventBus.send(self.charmBar, 'show');
        }

        $(document).off('keyup.hideFlyout click.hideFlyout');
    };

    exports.Flyout = Flyout;
}, window.jQuery);