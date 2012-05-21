var TestStandardView = function (fixture) {
    var public = {};

    public.execute = function () {
        module('StandardView style class');

        test('files should set body element class to "files" and set first hr with "headerLongerLine"', function () {
            var standard, some_hr;
            fixture.innerHTML = "<hr id=\"some_hr\" />";
            some_hr = document.getElementById("some_hr");

            standard = StandardView({
                body_element: fixture,
                first_line: some_hr
            });
            standard.init();

            ok(fixture.className.split(" ").indexOf("files") >= 0, "must have class files");
            ok(some_hr.className.split(" ").indexOf("headerLongerLine") >= 0, "must have class headerLongerLine");
            fixture.className = "";
            fixture.innerHTML = "";
        });

        test('files should include "files" in body element class', function () {
            var standard, some_hr;

            fixture.innerHTML = "<hr id=\"some_hr\" />";
            some_hr = document.getElementById("some_hr");
            fixture.className = "oi supimpa";
            some_hr.className = "oi supimpa";

            standard = StandardView({
                body_element: fixture,
                first_line: some_hr
            });
            standard.init();

            equal(fixture.className, "oi supimpa files");
            equal(some_hr.className, "oi supimpa headerLongerLine");

            fixture.className = "";
            fixture.innerHTML = "";
        });

        test('Files standard_layout should set left positioning for elements and scale accordingly', function () {
            var stub = "<hr class=\"hr_stub\" />" +
                       "<div class=\"stub\" style=\"position:relative\">1 div</div>" +
                       "<div class=\"stub\" style=\"position:relative\">2 div</div>" +
                       "<div class=\"stub\" style=\"position:relative\">3 div</div>" +
                       "<div class=\"stub\" style=\"position:relative\">4 div</div>" +
                       "<div class=\"stub\" style=\"position:relative\">5 div</div>",
                standard,
                stubElements,
                transformAttribute,
                hr_stub; // browser dependent

            fixture.innerHTML = stub;
            transformAttribute = Modernizr.prefixed('transform');
            hr_stub = document.querySelectorAll(".hr_stub")[0];

            standard = StandardView({
                base_elements: document.querySelectorAll(".stub"),
                first_line: hr_stub
            });
            standard.render();

            stubElements = document.querySelectorAll(".stub");
            equal(stubElements[0].style.left, "0%", "left element should be zero");
            equal(stubElements[1].style.left, "10%", "left element should be 10%");
            equal(stubElements[2].style.left, "20%", "left element should be 20%");
            equal(stubElements[3].style.left, "30%", "left element should be 30%");
            equal(stubElements[4].style.left, "40%", "left element should be 40%");

            equal(stubElements[0].style[transformAttribute], "scale(0.6) matrix(1, 0, 0, 1, 0, 0)");
            equal(stubElements[1].style[transformAttribute], "scale(0.7) matrix(1, 0, 0, 1, 0, 0)");
            equal(stubElements[2].style[transformAttribute], "scale(0.8) matrix(1, 0, 0, 1, 0, 0)");
            equal(stubElements[3].style[transformAttribute], "scale(0.9) matrix(1, 0, 0, 1, 0, 0)");
            equal(stubElements[4].style[transformAttribute], "scale(1) matrix(1, 0, 0, 1, 0, 0)");

            equal(stubElements[0].style.marginTop, "-4%");
            equal(stubElements[1].style.marginTop, "-4%");
            equal(stubElements[2].style.marginTop, "-4%");
            equal(stubElements[3].style.marginTop, "-4%");
            equal(stubElements[4].style.marginTop, "-4%");

            equal(hr_stub.style.marginBottom, "3%");

            fixture.innerHTML = "";
        });

        test('Files remove_standard_layout should clear all previous inline settings', function () {
            var stub = "<hr class=\"hr_stub\" />" +
                       "<div class=\"stub\" style=\"position:relative\">1 div</div>" +
                       "<div class=\"stub\" style=\"position:relative\">2 div</div>" +
                       "<div class=\"stub\" style=\"position:relative\">3 div</div>" +
                       "<div class=\"stub\" style=\"position:relative\">4 div</div>" +
                       "<div class=\"stub\" style=\"position:relative\">5 div</div>",
                standard,
                stubElements,
                transformAttribute,
                hr_stub; // browser dependent

            fixture.innerHTML = stub;
            transformAttribute = Modernizr.prefixed('transform');
            hr_stub = document.querySelectorAll(".hr_stub")[0];

            standard = StandardView({
                base_elements: document.querySelectorAll(".stub"),
                first_line: hr_stub
            });
            standard.render();
            standard.clear();

            stubElements = document.querySelectorAll(".stub");
            equal(stubElements[0].style.left, "");
            equal(stubElements[1].style.left, "");
            equal(stubElements[2].style.left, "");
            equal(stubElements[3].style.left, "");
            equal(stubElements[4].style.left, "");

            equal(stubElements[0].style[transformAttribute], "");
            equal(stubElements[1].style[transformAttribute], "");
            equal(stubElements[2].style[transformAttribute], "");
            equal(stubElements[3].style[transformAttribute], "");
            equal(stubElements[4].style[transformAttribute], "");

            equal(stubElements[0].style.marginTop, "");
            equal(stubElements[1].style.marginTop, "");
            equal(stubElements[2].style.marginTop, "");
            equal(stubElements[3].style.marginTop, "");
            equal(stubElements[4].style.marginTop, "");

            equal(hr_stub.style.marginBottom, "");

            fixture.innerHTML = "";
        });
    }

    return public;
};
