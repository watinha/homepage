var TestViewController = function (fixture) {
    var public = {};

    public.execute = function () {
        module('ViewController class');

        test('files should set body element class to "files" and set first hr with "headerLongerLine"', function () {
            var controller, some_hr;
            fixture.innerHTML = "<hr id=\"some_hr\" />";
            some_hr = document.getElementById("some_hr");

            controller = ViewController({
                body_element: fixture,
                first_line: some_hr
            });
            controller.init();

            ok(fixture.className.split(" ").indexOf("files") >= 0, "must have class files");
            ok(some_hr.className.split(" ").indexOf("headerLongerLine") >= 0, "must have class headerLongerLine");
            fixture.className = "";
            fixture.innerHTML = "";
        });

        test('files should include "files" in body element class', function () {
            var controller, some_hr;

            fixture.innerHTML = "<hr id=\"some_hr\" />";
            some_hr = document.getElementById("some_hr");
            fixture.className = "oi supimpa";
            some_hr.className = "oi supimpa";

            controller = ViewController({
                body_element: fixture,
                first_line: some_hr
            });
            controller.init();

            equal(fixture.className, "oi supimpa files");
            equal(some_hr.className, "oi supimpa headerLongerLine");

            fixture.className = "";
            fixture.innerHTML = "";
        });

        test('method composite for changing layout', function () {
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
            equal(layout_objs[1].clean_count, 1);
            equal(layout_objs[2].clean_count, 1);
            equal(layout_objs[3].clean_count, 1);
            equal(layout_objs[4].clean_count, 1);
            equal(layout_objs[5].clean_count, 1);
            equal(layout_objs[6].render_count, 1);
        });

        test('method composite for changing layout should also work for objects', function () {
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
            equal(layout_objs["some_string1"].clean_count, 1);
            equal(layout_objs["some_string2"].clean_count, 1);
            equal(layout_objs["some_string3"].clean_count, 1);
            equal(layout_objs["some_string4"].clean_count, 1);
            equal(layout_objs["some_string5"].clean_count, 1);
            equal(layout_objs["some_string6"].render_count, 1);
        });
    };

    return public;
};
