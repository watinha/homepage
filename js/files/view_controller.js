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
        for (var i in private.layout_objs) {
            private.layout_objs[i].clean();
        };
        private.layout_objs[view_index].render();
    };

    public.click = function () {
        public.render(private.click_handler.layout_name);
        private.click_handler.click();
    };

    return public;
};
