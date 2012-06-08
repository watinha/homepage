describe('KeyboardHandler class suite', function () {

    it('navigate should go to next focusable element', function () {
        var elements = [], i,
            handler, active_element,
            expected = [0, 0, 0, 1, 0];

        for (i = 0; i < 5; i++) {
            elements[i] = {
                focus_count: 0,
                focus: function () {
                    this.focus_count = 1;
                }
            };
        };
        active_element = elements[2];
        handler = KeyboardHandler({
            main_elements: elements
        });
        handler.move_down(active_element);

        for (i = 0; i < 5; i++) {
            expect(elements[i].focus_count).toBe(expected[i]);
        };
    });

    it('navigate should go to previous focusable element', function () {
        var elements = [], i,
            handler, active_element,
            expected = [0, 1, 0, 0, 0];

        for (i = 0; i < 5; i++) {
            elements[i] = {
                focus_count: 0,
                focus: function () {
                    this.focus_count = 1;
                }
            };
        };
        active_element = elements[2];
        handler = KeyboardHandler({
            main_elements: elements
        });
        handler.move_up(active_element);

        for (i = 0; i < 5; i++) {
            expect(elements[i].focus_count).toBe(expected[i]);
        };
    });
});