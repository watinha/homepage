var ViewController = function (params) {
    var public = {},
        private = {
        body_element: params.body_element,
        first_line: params.first_line
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

    return public;
};
