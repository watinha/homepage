var ViewController = function (params) {
    var public = {},
        private = {
            body_element: params.body_element,
            first_line: params.first_line,
            layout_objs: params.layout_objs
        };

    public.init = function () {
        App.addClass(private.body_element, "files");
        App.addClass(private.first_line, "headerLongerLine");
    };

    public.render = function (view_index) {
        for (var i = 0; i < private.layout_objs.length; i++) {
            private.layout_objs[i].clean();
        };
        private.layout_objs[view_index].render();
    };

    return public;
};
