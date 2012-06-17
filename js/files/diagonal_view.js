var DiagonalView = function (params, Helpers, window) {
    "use strict";
    var $public = {},
        $private = {
            main_elements: params.main_elements
        };

    $public.render = function () {
        var i;
        for (i = 0; i < $private.main_elements.length; i = i + 1) {
            Helpers.addClass($private.main_elements[i], 'diagonal');
        }
    };

    $public.clean = function () {
        var i;
        for (i = 0; i < $private.main_elements.length; i = i + 1) {
            Helpers.removeClass($private.main_elements[i], 'diagonal');
            Helpers.removeClass($private.main_elements[i], "open");
            $private.main_elements[i].style.bottom = "";
        }
    };

    $public.click = function (ev) {
        var event = window.event || ev,
            target = event.target,
            main_element_target = $private.get_main_parent(target),
            i;
        for (i = 0; i < $private.main_elements.length; i = i + 1) {
            Helpers.removeClass($private.main_elements[i], "open");
            $private.main_elements[i].style.bottom = "";
            if ($private.main_elements[i] === main_element_target) {
                main_element_target.style.bottom = String(50 * i - 10) + "px";
            }
        }

        Helpers.addClass(main_element_target, "open");
    };

    $private.get_main_parent = function (element) {
        var i;
        if (element.tagName === "BODY" || !element.parentNode) {
            return false;
        }

        for (i = 0; i < $private.main_elements.length; i = i + 1) {
            if (element === $private.main_elements[i]) {
                return element;
            }
        }

        return $private.get_main_parent(element.parentNode);
    };

    return $public;
};
