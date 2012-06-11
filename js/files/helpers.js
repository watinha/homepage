var Helpers = (function () {
    "use strict";
    var $public = {};

    $public.addClass = function (element, className) {
        var classes;
        if (Helpers.hasClass(element, className)) {
            return;
        }
        classes = element.className.split(" ");
        classes.push(className);
        element.className = classes.join(" ").replace(/^\s+|\s+$/g, "");
    };

    $public.hasClass = function (element, className) {
        var classes = element.className.split(" ");
        return (classes.indexOf(className) >= 0);
    };

    $public.removeClass = function (element, className) {
        var classes;
        if (!Helpers.hasClass(element, className)) {
            return;
        }
        classes = element.className.split(" ");
        classes.splice(classes.indexOf(className), 1);
        element.className = classes.join(" ").replace(/^\s+|\s+$/g, "");
    };

    $public.activateListener = function (element, callback) {
        element.tabIndex = 0;
        element.addEventListener("click", callback, true);
        element.addEventListener("keydown", function (ev) {
            if (ev.keyCode === 13 || ev.keyCode === 32) {
                callback.apply(this, arguments);
            }
        }, true);
    };

    return $public;
}());
