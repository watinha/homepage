#!/usr/local/bin/node

/* NodeJS script that runs qUnit tests with zombie */
var Browser = require("zombie"),
    browser = new Browser(),
    qunit_url = process.env["QUNIT_URL"];

console.log("");
console.log("executing QUnit tests:");
browser.visit(qunit_url).then(function () {
    var tests = browser.querySelectorAll("#qunit-tests > li"),
        failed = [];
    for (var i = 0; i < tests.length; i++) {
        if (tests[i].className == "pass")
            process.stdout.write(".");
        else {
            process.stdout.write("F");
            failed.push(tests[i]);
        }
    };
    console.log("");
    if (failed.length == 0) {
        console.log("OK.");
        console.log("");
        return ;
    }

    for (var i = 0; i < failed.length; i++) {
        var strong = failed[i].querySelectorAll("li.fail > strong")[0].textContent,
            assertions = failed[i].querySelectorAll("ol > li.fail");
        for (var j = 0; j < assertions.length; j++) {
            var equals = assertions[i].querySelectorAll("tr.test-expected"),
                ok = assertions[i].querySelectorAll("span.test-message");

            if (equals.length > 0) {
                var expected = equals[0].querySelectorAll("tr.test-expected")[0].textContent,
                    actual = equals[0].querySelectorAll("tr.test-actual")[0].textContent,
                    source = equals[0].querySelectorAll("tr.test-source")[0].textContent;
                console.log("");
                console.log("FAILED: " + strong);
                console.log(expected);
                console.log("  " + actual);
                console.log(source);
                return ;
            }
            if (ok.length > 0) {
                var source = assertions[i].querySelectorAll("tr.test-source")[0].textContent;
                console.log("");
                console.log("FAILED: " + strong);
                console.log(source);
                return ;
            }
        };
    };
});
