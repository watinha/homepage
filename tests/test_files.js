var TestFiles = function (fixture) {
    var public = {};

    public.execute = function () {
        module('Files style class');

        test('files should set body element class to "files" and set first hr with "headerLongerLine"', function () {
            var files, some_hr;
            fixture.innerHTML = "<hr id=\"some_hr\" />";
            some_hr = document.getElementById("some_hr");

            files = Files({
                body_element: fixture,
                first_line: some_hr
            });
            files.init();

            ok(fixture.className.split(" ").indexOf("files") >= 0, "must have class files");
            ok(some_hr.className.split(" ").indexOf("headerLongerLine") >= 0, "must have class headerLongerLine");
            fixture.className = "";
            fixture.innerHTML = "";
        });

        test('files should include "files" in body element class', function () {
            var files, some_hr;

            fixture.innerHTML = "<hr id=\"some_hr\" />";
            some_hr = document.getElementById("some_hr");
            fixture.className = "oi supimpa";
            some_hr.className = "oi supimpa";

            files = Files({
                body_element: fixture,
                first_line: some_hr
            });
            files.init();

            equal(fixture.className, "oi supimpa files");
            equal(some_hr.className, "oi supimpa headerLongerLine");

            fixture.className = "";
            fixture.innerHTML = "";
        });

        test('Files standard_layout should set left positioning for elements', function () {
            var stub = "<div class=\"stub\" style=\"position:relative\">1 div</div>" +
                       "<div class=\"stub\" style=\"position:relative\">2 div</div>" +
                       "<div class=\"stub\" style=\"position:relative\">3 div</div>" +
                       "<div class=\"stub\" style=\"position:relative\">4 div</div>" +
                       "<div class=\"stub\" style=\"position:relative\">5 div</div>",
                files,
                stubElements;

            fixture.innerHTML = stub;

            files = Files({
                base_elements: document.querySelectorAll(".stub")
            });
            files.standard_layout();

            stubElements = document.querySelectorAll(".stub");
            equal(stubElements[0].style.left, "0%", "left element should be zero");
            equal(stubElements[1].style.left, "12%", "left element should be 12.5%");
            equal(stubElements[2].style.left, "25%", "left element should be 25%");
            equal(stubElements[3].style.left, "37%", "left element should be 37.5%");
            equal(stubElements[4].style.left, "50%", "left element should be 50%");

            fixture.innerHTML = "";
        });
    }

    return public;
};
