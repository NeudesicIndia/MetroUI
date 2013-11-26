Neudesic.utilities.namespace('neu.metro.ui', function (exports, $) {
    "use strict";

    var Charm = function () {};

    Charm.prototype = new neu.metro.ui.Controller();

    Charm.prototype.init = function (element, data, events) {
        neu.metro.ui.Controller.prototype.init.apply(this, arguments);

        var self = this;
        this.$container = this.$element.closest('.appbar-container');
        this.isShown = false;
        this.events = events;
        this.$scrollBtns = this.$element.find(".scroll-btn");
        this.$scrollBtnBottom = this.$element.find(".scroll-bottom");
        this.$scrollBtnTop = this.$element.find(".scroll-top");
        this.resizeEvent = ('onorientationchange' in window) ? 'orientationchange.adjustCharm' : 'resize.adjustCharm';

        this.events.listen('show', this.show.bind(this));
        this.events.listen('hide', this.hide.bind(this));
        this.events.listen('toggle', this.toggle.bind(this));

        $(document).on("mousemove", function (evt) {
            if (evt.pageX > ($(document).width()- 110)) {
                if(!self.isShown) self.show();
            }
        });

    };

    Charm.prototype.show = function () {
        var charmBar = this,
            $thisElement = this.$element;

        charmBar.events.emit('shown');
        charmBar.isShown = true;
        this.$container.fadeIn(0);

        $thisElement.animate({
            "right": 0
        }, 500, "easeOutExpo");

        $(document).on('keyup.hideCharm', function (e) {
            if (e.keyCode == 27) {
                charmBar.hide();
            }
        });

        $('.appbar-container').on('click.hideAllCharms', function (e) {
            e.stopPropagation();
            if ($(e.target).is(this)) {
                charmBar.hide();
                return false;
            }
        });

    }; 

    Charm.prototype.hide = function (e) {
        var charmBar = this,
            $thisElement = this.$element;

        charmBar.events.emit('hidden');
        charmBar.isShown = false;

        $thisElement.animate({
            "right": "-110px"
        }, 200, "easeInExpo", function () {
            charmBar.$container.fadeOut(0);
        });

        $('.appbar-container').off('click.hideAllCharms');
        $(document).off('keyup.hideCharm');
    };

    Charm.prototype.toggle = function () {
        if (this.isShown) {
            this.hide();
        } else {
            this.show();
        }

        this.events.emit('toggled', this.isShown);
    };

    exports.Charm = Charm;
}, window.jQuery);