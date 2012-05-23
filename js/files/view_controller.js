var ViewController = function (params) {
    var public = {},
        private = {
            body_element: params.body_element,
            first_line: params.first_line,
            layout_objs: params.layout_objs
        };

    private.addClass = function (element, className) {
        var classes = element.className.split(" ");
        classes.push(className);
        element.className = classes.join(" ");
    };

    public.init = function () {
        private.addClass(private.body_element, "files");
        private.addClass(private.first_line, "headerLongerLine");
    };

    public.render = function (view_index) {
        for (var i = 0; i < private.layout_objs.length; i++) {
            private.layout_objs[i].clean();
        };
        private.layout_objs[view_index].render();
    };

    return public;
};
