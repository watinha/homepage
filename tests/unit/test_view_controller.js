describe('ViewController class', function() {
    var fixture = document.createElement('div');

    it('files should set body element class to "files" and set first hr with "headerLongerLine"', function () {
        var controller, some_hr;
        fixture.innerHTML = "<hr id=\"some_hr\" />";
        some_hr = fixture.querySelector("#some_hr");

        controller = ViewController({
            body_element: fixture,
            first_line: some_hr
        });
        controller.init();

        expect(fixture.className.split(" ").indexOf("files")).not.toBeLessThan(0);
        expect(some_hr.className.split(" ").indexOf("headerLongerLine")).not.toBeLessThan(0);
        fixture.className = "";
        fixture.innerHTML = "";
    });

    it('files should include "files" in body element class', function () {
        var controller, some_hr;

        fixture.innerHTML = "<hr id=\"some_hr\" />";
        some_hr = fixture.querySelector("#some_hr");
        fixture.className = "oi supimpa";
        some_hr.className = "oi supimpa";

        controller = ViewController({
            body_element: fixture,
            first_line: some_hr
        });
        controller.init();

        expect(fixture.className).toBe("oi supimpa files");
        expect(some_hr.className).toBe("oi supimpa headerLongerLine");

        fixture.className = "";
        fixture.innerHTML = "";
    });

    it('method composite for changing layout', function () {
        var controller, i,
            layout_objs = [];

        for (i = 0; i < 7; i++) {
            var layout_mock = {
                clean: function () {
                    this.clean_count = 1;
                },
                render: function () {
                    this.render_count = 1;
                }
            };
            layout_objs.push(layout_mock);
        };

        controller = ViewController({
            body_element: {},
            first_line: {},
            layout_objs: layout_objs
        });

        controller.render(6);
        expect(layout_objs[1].clean_count).toBe(1);
        expect(layout_objs[2].clean_count).toBe(1);
        expect(layout_objs[3].clean_count).toBe(1);
        expect(layout_objs[4].clean_count).toBe(1);
        expect(layout_objs[5].clean_count).toBe(1);
        expect(layout_objs[6].render_count).toBe(1);
    });

    it('method composite for changing layout should also work for objects', function () {
        var controller, i,
            layout_objs = {};

        for (i = 0; i < 7; i++) {
            var layout_mock = {
                clean: function () {
                    this.clean_count = 1;
                },
                render: function () {
                    this.render_count = 1;
                }
            };
            layout_objs["some_string" + i] = layout_mock;
        };

        controller = ViewController({
            body_element: {},
            first_line: {},
            layout_objs: layout_objs
        });

        controller.render("some_string6");
        expect(layout_objs["some_string1"].clean_count).toBe(1);
        expect(layout_objs["some_string2"].clean_count).toBe(1);
        expect(layout_objs["some_string3"].clean_count).toBe(1);
        expect(layout_objs["some_string4"].clean_count).toBe(1);
        expect(layout_objs["some_string5"].clean_count).toBe(1);
        expect(layout_objs["some_string6"].render_count).toBe(1);
    });

    it("controller should use strategy object to handle click events", function () {
        var controller, i, layout_objs = {}, click_count = 0, render_count = 0;

        for (i = 0; i < 7; i++) {
            var layout_mock = {
                clean: function () {
                    this.clean_count = 1;
                },
                render: function () {
                    this.render_count = 1;
                }
            };
            layout_objs["some_string" + i] = layout_mock;
        };

        controller = ViewController({
            body_element: {},
            first_line: {},
            layout_objs: layout_objs,
            click_handler: {
                render: function () {
                    render_count = 1;
                },
                click: function () {
                    click_count = 1;
                }
            }
        });

        controller.click();
        expect(layout_objs["some_string1"].clean_count).toBe(1);
        expect(layout_objs["some_string2"].clean_count).toBe(1);
        expect(layout_objs["some_string3"].clean_count).toBe(1);
        expect(layout_objs["some_string4"].clean_count).toBe(1);
        expect(layout_objs["some_string5"].clean_count).toBe(1);
        expect(layout_objs["some_string6"].clean_count).toBe(1);
        expect(click_count).toBe(1);
        expect(render_count).toBe(1);
    });

    it("method clean should also clear click_handler layout", function () {
        var controller, i, layout_objs = {}, click_count = 0, render_count = 0, clean_count = 0;

        for (i = 0; i < 7; i++) {
            var layout_mock = {
                clean: function () {
                    this.clean_count = 1;
                },
                render: function () {
                    this.render_count = 1;
                }
            };
            layout_objs["some_string" + i] = layout_mock;
        };

        controller = ViewController({
            body_element: {},
            first_line: {},
            layout_objs: layout_objs,
            click_handler: {
                render: function () {
                    render_count = 1;
                },
                clean: function () {
                    clean_count = 1;
                },
                click: function () {
                    click_count = 1;
                }
            }
        });

        controller.render("some_string6");
        expect(layout_objs["some_string1"].clean_count).toBe(1);
        expect(layout_objs["some_string2"].clean_count).toBe(1);
        expect(layout_objs["some_string3"].clean_count).toBe(1);
        expect(layout_objs["some_string4"].clean_count).toBe(1);
        expect(layout_objs["some_string5"].clean_count).toBe(1);
        expect(layout_objs["some_string6"].clean_count).toBe(1);
        expect(clean_count).toBe(1);
        expect(click_count).toBe(0);
        expect(render_count).toBe(0);
    });
});
