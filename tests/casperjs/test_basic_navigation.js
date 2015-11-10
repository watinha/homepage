(function (casper) {
    casper.test.begin("scale and matrix should be set as the page is loaded", 1, function (test) {
        casper.start("index.html", function () {
            test.assertTitle("Willian Massami Watanabe - Curriculum");
        });
        casper.run(function () {
            test.done();
        });
    });
})(casper);
