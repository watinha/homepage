(function (casper) {
    casper.test.begin("scale and matrix should be set as the page is loaded", 24, function (test) {
        casper.start(casper.cli.options.url, function () {
            casper.viewport(1240, 1024).then(function () {
                test.assertTitle("Willian Massami Watanabe - Curriculum");
            });
        });
        casper.then(function () {
            test.assertEvalEquals(function () {
                return __utils__.findOne("body").className;
            }, "files", "body element should have className == files");
            var main_elements = casper.evaluate(function () {
                var transform_attribute = Modernizr.prefixed("transform"),
                    main_elements = document.querySelectorAll(".files > .wrapper > div:not(.header)"),
                    i = 0, results = [];
                for (i = 0; i < main_elements.length; i++) {
                    results.push({
                        transform: main_elements[i].style[transform_attribute]
                    });
                }
                return results;
            }, "files");
            for (var i = 0; i < main_elements.length; i++) {
                test.assertMatch(main_elements[i].transform, /(\s+|^)scale\(/g,
                    "element " + i + " should have scale transform attribute");
                test.assertMatch(main_elements[i].transform, /(\s+|^)matrix\(1, 0, 0, 1, 0, 0\)/g,
                    "element " + i + " should have matrix transform attribute");
            };
            test.assertMatch(main_elements[i - 1].transform, /(\s+|^)scale\(1\)/g,
                "last element should have scale(1) transform");
            test.assertMatch(main_elements[0].transform, /(\s+|^)scale\(0.64\)/g,
                "first element should have scale(0.64) transform");
        });
        casper.run(function () {
            //casper.capture("bin/capture/standard_layout_test.png");
            test.done();
        });
    });

    casper.test.begin("click should change layout style and open element", 13, function (test) {
        casper.start(casper.cli.options.url, function () {
            test.assertTitle("Willian Massami Watanabe - Curriculum");
        });
        casper.then(function () {
            test.assertEvalEquals(function () {
                return __utils__.findOne("body").className;
            }, "files", "body element should have className == files");
            var main_elements = casper.evaluate(function () {
                var main_elements = document.querySelectorAll(".files > .wrapper > div:not(.header)"),
                    i = 0, results = [];
                for (i = 0; i < main_elements.length; i++) {
                    results.push({
                        className: main_elements[i].className
                    });
                }
                return results;
            });
            for (var i = 0; i < main_elements.length; i++) {
                test.assert((function () {
                    return main_elements[i].className
                                           .split(" ")
                                           .indexOf("open") === -1;
                }()), "there should be no open element [" + i + "]");
            };
            casper.click("#profile_header > a");
            test.assertEvalEquals(function () {
                return __utils__.findOne(".profile").className;
            }, "profile diagonal open", ".profile should be openned on click");
        });
        casper.run(function () {
            //casper.capture("bin/capture/diagonal_layout_test.png");
            test.done();
        });
    });

    casper.test.begin("after click on link inside main div webpage should be reloaded", 2, function (test) {
        casper.start(casper.cli.options.url, function () {
            test.assertTitle("Willian Massami Watanabe - Curriculum");
        });
        casper.then(function () {
            casper.click(".software > h3 > a");
            casper.click(".software > ul > li:first-child > span.bold:first-child > a");
            casper.waitForUrl(/github\.com/, function () {
                test.assertEquals(casper.evaluate(function () {
                    return window.location.hostname + window.location.pathname;
                }), "github.com/watinha/homepage");
            });
        });
        casper.run(function () {
            test.done();
        });
    });

    casper.test.begin("reset button should remove all inline styles and classes", 12, function (test) {
        casper.start(casper.cli.options.url, function () {
            test.assertTitle("Willian Massami Watanabe - Curriculum");
        });
        casper.then(function () {
            casper.click(".layout_switcher");
            test.assertEvalEquals(function () {
                return __utils__.findOne("body").className;
            }, "", "body element should not have className == files");
            var main_elements = casper.evaluate(function () {
                var transform_attribute = Modernizr.prefixed("transform"),
                    main_elements = document.querySelectorAll(".wrapper > div:not(.header)"),
                    i = 0, results = [];
                for (i = 0; i < main_elements.length; i++) {
                    results.push({
                        transform: main_elements[i].style[transform_attribute]
                    });
                }
                return results;
            }, "files");
            for (var i = 0; i < main_elements.length; i++) {
                test.assertEquals(main_elements[i].transform, "",
                    "element " + i + " should not have scale nor matrix transform attribute");
            };
        });
        casper.run(function () {
            //casper.capture("bin/capture/print_layout_test.png");
            test.done();
        });
    });

    casper.test.begin("scale and matrix should be set after the reset link is clicked for the second time", 25, function (test) {
        casper.start(casper.cli.options.url, function () {
            test.assertTitle("Willian Massami Watanabe - Curriculum");
        });
        casper.then(function () {
            casper.click(".layout_switcher");
            test.assertEvalEquals(function () {
                return __utils__.findOne("body").className;
            }, "", "body element should not have className == files");
            casper.click(".layout_switcher");
            test.assertEvalEquals(function () {
                return __utils__.findOne("body").className;
            }, "files", "body element should have className == files");
            var main_elements = casper.evaluate(function () {
                var transform_attribute = Modernizr.prefixed("transform"),
                    main_elements = document.querySelectorAll(".wrapper > div:not(.header)"),
                    i = 0, results = [];
                for (i = 0; i < main_elements.length; i++) {
                    results.push({
                        transform: main_elements[i].style[transform_attribute]
                    });
                }
                return results;
            }, "files");
            for (var i = 0; i < main_elements.length; i++) {
                test.assertMatch(main_elements[i].transform, /(\s+|^)scale\(/g,
                    "element " + i + " should have scale transform attribute");
                test.assertMatch(main_elements[i].transform, /(\s+|^)matrix\(1, 0, 0, 1, 0, 0\)/g,
                    "element " + i + " should have matrix transform attribute");
            };
            test.assertMatch(main_elements[i - 1].transform, /(\s+|^)scale\(1\)/g,
                "last element should have scale(1) transform");
            test.assertMatch(main_elements[0].transform, /(\s+|^)scale\(0.64\)/g,
                "first element should have scale(0.6) transform");
        });
        casper.run(function () {
            test.done();
        });
    });
})(casper);
