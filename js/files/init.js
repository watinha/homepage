(function () {
    window.onload = function () {
        if (document.querySelectorAll) {
            var first_line = document.querySelectorAll("body > div.header+hr")[0],
                controller = ViewController({
                    body_element: document.body,
                    first_line: first_line
                }),
                standard = StandardView({
                    base_elements: document.querySelectorAll("body > div:not(.header)"),
                    first_line: first_line
                });
            controller.init();
        }
    }
})();
