(function () {
    window.onload = function () {
        if (document.querySelectorAll) {
            var App = (function () {
                var build_view_controller, setup_event_listeners, init, // methods
                    first_line = document.querySelector("body > div.header+hr"),
                    base_elements = document.querySelectorAll("body > div > div:not(.header)"),
                    controller = null;

                build_view_controller = function () {
                    var diagonal = DiagonalView({
                            main_elements: base_elements
                        }),
                        standard = StandardView({
                            base_elements: base_elements,
                            first_line: first_line
                        });

                    controller = ViewController({
                        body_element: document.body,
                        first_line: first_line,
                        layout_objs: {
                            'standard': standard,
                            'diagonal': diagonal
                        },
                        click_handler: diagonal
                    });
                    controller.init();
                    controller.render('standard');
                };

                setup_event_listeners = function () {
                    var keyboard_handler = KeyboardHandler({
                            main_elements: base_elements
                        });
                    /**
                      * Setting up events that the application will respond to
                      */
                    for (var i = 0; i < base_elements.length; i++) {
                        Helpers.activateListener(base_elements[i], controller.click);
                    };
                    document.body.addEventListener("keydown", function (ev) {
                        var index;
                        switch (ev.keyCode) {
                            case 27:
                                controller.render('standard');
                                break;
                            case 40:
                                keyboard_handler.move_down(document.activeElement);
                                break;
                            case 39:
                                keyboard_handler.move_down(document.activeElement);
                                break;
                            case 38:
                                keyboard_handler.move_up(document.activeElement);
                                break;
                            case 37:
                                keyboard_handler.move_up(document.activeElement);
                                break;
                        }
                    }, true);
                };

                init = function () {
                    build_view_controller();
                    setup_event_listeners();
                };

                return {
                    init: init
                };
            })().init();
        }
    }
})();
