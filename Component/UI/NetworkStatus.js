Neudesic.utilities.namespace('neu.metro.ui', function (exports, $) {
    "use strict";

    var NetworkStatus = function () { };

    NetworkStatus.prototype = new neu.metro.ui.Controller();

    NetworkStatus.prototype.init = function (element, data, events) {

        neu.metro.ui.Controller.prototype.init.apply(this, arguments);

        var self = this,
            $targetElm,
            _networkStatus = "",
            _dateStamp = "" + (new Date().getDate()) + (new Date().getHours()) + (new Date().getSeconds()) + (Math.random() * 10000).toFixed(0),
            _url = window.location.protocol + "//" + window.location.host  + "t=" + _dateStamp,
            _xhr = new XMLHttpRequest(),
            _type = "HEAD",
            _async = true;

        this.events = events;


        function checkNetwork() {
            $targetElm = self.$element.find(self.$element.data("target"));

            if ((navigator.userAgent.toLowerCase().indexOf("firefox") != -1) && !document.hidden) {

                _xhr.open(_type, _url, _async);
                _xhr.onload = function () {
                    if (this.status === 0 || this.status === 404) {
                        _networkStatus = "Offline";
                    } else {
                        _networkStatus = "Online";
                    }
                };

                _xhr.onerror = function () {
                    if (this.status === 0 || this.status === 404) {
                        _networkStatus = "Offline";
                    } else {
                        console && console.warn("Unexpected error!");
                    }
                };
                _xhr.send();


                _dateStamp = "" + (new Date().getDate()) + (new Date().getHours()) + (new Date().getSeconds()) + (Math.random() * 10000).toFixed(0);
                _url = window.location.protocol + "//" + window.location.host + "?t=" + _dateStamp;


            } else {
                _networkStatus = navigator.onLine ? "Online" : "Offline";
            }

            (_networkStatus === "Offline") ? $targetElm.addClass('disabled') : $targetElm.removeClass('disabled');

            $targetElm.attr('data-network', _networkStatus);
            self.events.emit(_networkStatus);
        }
        setInterval(checkNetwork, 3000);
    };

    exports.NetworkStatus = NetworkStatus;

}, window.jQuery);