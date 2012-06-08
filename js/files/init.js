(function () {
    window.onload = function () {
        if (document.querySelectorAll) {
            var first_line = document.querySelector("body > div.header+hr"),
                base_elements = document.querySelectorAll("body > div:not(.header)"),
                diagonal = DiagonalView({
                    main_elements: base_elements
                }),
                standard = StandardView({
                    base_elements: base_elements,
                    first_line: first_line
                }),
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

            /**
              * Setting up events that the application will respond to
              */
            for (var i = 0; i < base_elements.length; i++) {
                base_elements[i].addEventListener("click", controller.click, true);
                base_elements[i].addEventListener("keydown", function (ev) {
                    console.log(ev.keyCode);
                    if (ev.keyCode == 13 || ev.keyCode == 32)
                        controller.click.apply(this, arguments);
                }, true);
            };
            document.body.addEventListener("keydown", function (ev) {
                var index;
                switch (ev.keyCode) {
                    case 27:
                        controller.render('standard');
                        break;
                    case 40:
                        index = -1;
                        for (var i = 0; i < base_elements.length; i++) {
                            if (base_elements[i] == document.activeElement) {
                                index = i;
                                break;
                            }
                        }
                        base_elements[(index + 1) % base_elements.length].focus();
                        break;
                }
            }, true);
        }
    }
})();
