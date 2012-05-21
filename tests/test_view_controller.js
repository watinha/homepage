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
    };
    return public;
};
