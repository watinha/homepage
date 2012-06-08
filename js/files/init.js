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

            for (var i = 0; i < base_elements.length; i++) {
                base_elements[i].addEventListener("click", controller.click, true);
                base_elements[i].addEventListener("keydown", function (ev) {
                    if (ev.keyCode == 13 || ev.keyCode == 32)
                        controller.click.apply(this, arguments);
                }, true);
            };
        }
    }
})();
