(function () {
    window.onload = function () {
        if (document.querySelectorAll) {
            var App = (function () {
                var build_view_controller, setup_event_listeners,
                    setup_aria, // private methods
                    init, // public methods
                    first_line = document.querySelector("body > div.header+hr"),
                    base_elements = document.querySelectorAll("body > div:not(.header) > div:not(.header)"),
                    wrapper = document.querySelector("body > .wrapper"),
                    controller = null;

                build_view_controller = function () {
                    var diagonal = DiagonalView({
                            main_elements: base_elements
                        }, Helpers, window),
                        standard = StandardView({
                            base_elements: base_elements,
                            first_line: first_line
                        }, Modernizr);

                    controller = ViewController({
                        body_element: document.body,
                        first_line: first_line,
                        layout_objs: {
                            'standard': standard,
                            'diagonal': diagonal
                        },
                        click_handler: diagonal
                    }, Helpers, window);
                    controller.init();
                    controller.render('standard');
                };

                setup_event_listeners = function () {
                    var keyboard_handler = KeyboardHandler({
                            main_elements: base_elements
                        }, Helpers),
                        header = document.querySelector(".header"),
                        layout_switcher_link = document.createElement("button"),
                        layout_switcher_icon = document.createElement("span");
                    /**
                      * Setting up events that the application will respond to
                      */
                    for (var i = 0; i < base_elements.length; i++) {
                        Helpers.activateListener(base_elements[i], controller.click);
                    }
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

                    /* setting link that switches the layout */
                    layout_switcher_link.appendChild(layout_switcher_icon);
                    layout_switcher_link.className = "layout_switcher";
                    layout_switcher_link.setAttribute("aria-label", "print version");
                    layout_switcher_icon.className = "icon reset_layout";
                    header.appendChild(layout_switcher_link);
                    layout_switcher_link.addEventListener("click", function () {
                        if (document.body.className === "files") {
                            document.body.className = "";
                            controller.clean_layouts();
                            layout_switcher_link.setAttribute("aria-label", "dynamic version");
                        } else {
                            controller.init();
                            controller.render('standard');
                            layout_switcher_link.setAttribute("aria-label", "print version");
                        }
                    });
                };

                setup_aria = function () {
                    var i;
                    wrapper.setAttribute("role", "list");
                    for (i = 0; i < base_elements.length; i++) {
                        (function () {
                            var className = base_elements[i].className,
                                list_item = base_elements[i],
                                list_header = list_item.querySelector("#" + className + "_header");
                            list_item.setAttribute("aria-labelledby", className + "_header");
                            list_item.setAttribute("role", "listitem");
                            list_item.setAttribute("aria-controls", className + "_panel");
                            list_item.addEventListener("focus", function () {
                                list_header.tabIndex = -1;
                            });
                            list_item.addEventListener("click", function () {
                                list_header.tabIndex = 0;
                                list_header.focus();
                            });
                            list_item.addEventListener("keypress", function (ev) {
                                if (ev.keyCode != 13 && ev.keyCode != 32)
                                    return ;
                                list_header.tabIndex = 0;
                                list_header.focus();
                            });
                        })(); // jshint ignore:line
                    }
                };

                init = function () {
                    setup_aria();
                    build_view_controller();
                    setup_event_listeners();
                };

                return {
                    init: init
                };
            })().init();
        }
    };
})();
