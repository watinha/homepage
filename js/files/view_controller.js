var ViewController = function (params, Helpers, window) {
    "use strict";
    var $public = {},
        $private = {
            body_element: params.body_element,
            first_line: params.first_line,
            layout_objs: params.layout_objs,
            click_handler: params.click_handler
        };

    $public.init = function () {
        Helpers.addClass($private.body_element, "files");
        Helpers.addClass($private.first_line, "headerLongerLine");
    };

    $public.render = function (view_index) {
        $private.clean_layouts();
        $private.layout_objs[view_index].render();
    };

    $public.click = function (ev) {
        var target = window.target || (ev && ev.target);
        $private.clean_layouts();
        $private.click_handler.render();
        $private.click_handler.click.apply(target, arguments);
    };

    $private.clean_layouts = function () {
        var i;
        for (i in $private.layout_objs) {
            if ($private.layout_objs.hasOwnProperty(i)) {
                $private.layout_objs[i].clean();
            }
        }
        if ($private.click_handler && $private.click_handler.clean) {
            $private.click_handler.clean();
        }
    };

    return $public;
};
