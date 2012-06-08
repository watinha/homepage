var KeyboardHandler = function (params) {
    var public = {},
        private = {main_elements: params.main_elements};

    public.move_down = function (active_element) {
        var current_index = private.find_active(active_element);
        private.main_elements[(current_index + 1) % private.main_elements.length].focus();
    };

    public.move_up = function (active_element) {
        var current_index = private.find_active(active_element) - 1;
        private.main_elements[(current_index >= 0 ? current_index : (private.main_elements.length - 1))].focus();
    };

    private.find_active = function (active_element) {
        for (var i = 0; i < private.main_elements.length; i++) {
            if (private.main_elements[i] == active_element)
                return i;
        };
        return false;
    };

    return public;
};
