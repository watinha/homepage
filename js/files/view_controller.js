var ViewController = function (params) {
    var public = {},
        private = {
            body_element: params.body_element,
            first_line: params.first_line,
            layout_objs: params.layout_objs,
            click_handler: params.click_handler
        };

    public.init = function () {
        Helpers.addClass(private.body_element, "files");
        Helpers.addClass(private.first_line, "headerLongerLine");
    };

    public.render = function (view_index) {
        private.clean_layouts();
        private.layout_objs[view_index].render();
    };

    public.click = function () {
        private.clean_layouts();
        private.click_handler.render();
        private.click_handler.click();
    };

    private.clean_layouts = function () {
        for (var i in private.layout_objs) {
            private.layout_objs[i].clean();
        };
        if (private.click_handler && private.click_handler.clean)
            private.click_handler.clean();
    };

    return public;
};
