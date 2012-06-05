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

    return public;
};