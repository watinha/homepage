var DiagonalView = function (params) {
    var public = {},
        private = {
            main_elements: params.main_elements
        };

    public.render = function () {
        for (var i = 0; i < private.main_elements.length; i++) {
            Helpers.addClass(private.main_elements[i], 'diagonal');
        };
    };

    public.clean = function () {
        for (var i = 0; i < private.main_elements.length; i++) {
            Helpers.removeClass(private.main_elements[i], 'diagonal');
        };
    };

    public.click = function (ev) {
        var ev = window.event || ev,
            target = ev.target,
            main_element_target = private.get_main_parent(target);
        for (var i = 0; i < private.main_elements.length; i++) {
            Helpers.removeClass(private.main_elements[i], "open");
            private.main_elements[i].style.bottom = "";
            if (private.main_elements[i] == main_element_target)
                main_element_target.style.bottom = (10 + 50*i) + "px";
        };

        Helpers.addClass(main_element_target, "open");
    };

    private.get_main_parent = function (element) {
        if (element.tagName == "BODY" || ! element.parentNode)
            return false;

        for (var i = 0; i < private.main_elements.length; i++) {
            if (element == private.main_elements[i])
                return element;
        };

        return private.get_main_parent(element.parentNode);
    };

    return public;
};
