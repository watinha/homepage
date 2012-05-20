var Files = function (params) {
    var public = {},
        private = {
        body_element: params.body_element,
        base_elements: params.base_elements,
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

    public.standard_layout = function () {
        for (var i = 0; i < private.base_elements.length; i++) {
            private.base_elements[i].style.left = Math.floor(
                i*50/(private.base_elements.length - 1)) + "%";
        };
    };

    return public;
};
