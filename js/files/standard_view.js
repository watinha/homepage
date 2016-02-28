var StandardView = function (params, Modernizr) {
    "use strict";
    var $public = {},
        $private = {
            base_elements: params.base_elements,
            first_line: params.first_line
        };

    $public.render = function () {
        var transform_attribute = Modernizr.prefixed("transform"),
            scale_factor,
            i;
        for (i = 1; i <= $private.base_elements.length; i = i + 1) {
            $private.base_elements[i - 1].style.left =
                String(Math.floor((5 + i * 0.9 * 3) * 10) / 10) + "%";
            scale_factor = (6 + 4 * (i / ($private.base_elements.length))) / 10;
            $private.base_elements[i - 1].style[transform_attribute] = "scale(" +
                String(Math.floor(scale_factor * 100) / 100) + ") matrix(1, 0, 0, 1, 0, 0)";
            $private.base_elements[i - 1].style.marginTop = "-4%";
        }
        $private.first_line.style.marginBottom = "3%";
    };

    $public.clean = function () {
        var transform_attribute = Modernizr.prefixed("transform"),
            i;
        for (i = 0; i < $private.base_elements.length; i = i + 1) {
            $private.base_elements[i].style.left = "";
            $private.base_elements[i].style[transform_attribute] = "";
            $private.base_elements[i].style.marginTop = "";
        }
        $private.first_line.style.marginBottom = "";
    };

    return $public;
};
