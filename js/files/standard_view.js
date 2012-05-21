var StandardView = function (params) {
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
        var transform_attribute = Modernizr.prefixed("transform"),
            scale_factor;
        for (var i = 0; i < private.base_elements.length; i++) {
            private.base_elements[i].style.left = Math.floor(
                i*40/(private.base_elements.length - 1)) + "%";
            scale_factor = 0.6 + 4 * i / (private.base_elements.length - 1) / 10;
            private.base_elements[i].style[transform_attribute] = "scale(" +
                scale_factor + ") matrix(1, 0, 0, 1, 0, 0)";
            private.base_elements[i].style.marginTop = "-4%";
        };
        private.first_line.style.marginBottom = "3%";
    };

    public.remove_standard_layout = function () {
        var transform_attribute = Modernizr.prefixed("transform");
        for (var i = 0; i < private.base_elements.length; i++) {
            private.base_elements[i].style.left = "";
            private.base_elements[i].style[transform_attribute] = "";
            private.base_elements[i].style.marginTop = "";
        };
        private.first_line.style.marginBottom = "";
    };

    return public;
};
