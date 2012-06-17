#!/usr/local/bin/node

/* NodeJS script that runs JASMINE tests with zombie */
var Browser = require("zombie"),
    browser = new Browser(),
    jasmine_url = process.env["JASMINE_URL"];

console.log("");
console.log("executing JASMINE tests:");

browser.visit(jasmine_url, function () {
    var banner = browser.querySelector("#HTMLReporter > .banner > span:not(.duration)"),
        duration = browser.querySelector("#HTMLReporter > .banner > .duration"),
        tests_summary = browser.querySelectorAll("#HTMLReporter > ul.symbolSummary > li"),
        complete_status = browser.querySelector("#HTMLReporter > .alert > .resultsMenu"),
        passing_alert = browser.querySelector("#HTMLReporter > .alert > .passingAlert"),
        details = browser.querySelectorAll("#details > .specDetail"),
        i = 0,
        stack;

    console.log();
    console.log(banner.textContent);
    console.log("--------------------------------");
    console.log();

    for (i = 0; i < tests_summary.length; i++) {
        var summary = (function () {
                var index = i, checkStatus, printResults;

                checkStatus = function () {
                    return (tests_summary[index].className == "passed" || tests_summary[index].className == "failed");
                };
                printResults = function () {
                    if (tests_summary[index].className == "passed")
                        process.stdout.write(".");
                    if (tests_summary[index].className == "failed")
                        process.stdout.write("F");
                };

                return {
                    checkStatus: checkStatus,
                    printResults: printResults
                };
            })();
        if (i == (tests_summary.length - 1)) {
            browser.wait(summary.checkStatus, function () {
                summary.printResults();

                // final printings
                console.log();
                if (complete_status)
                    console.log(complete_status.textContent);
                else {
                    if (passing_alert)
                        console.log(passing_alert.textContent);
                    console.log("OK. All tests passed");
                }
                console.log("-------------------------------");
                console.log();

                for (i = 0; i < details.length; i++) {
                    console.log(details[i].querySelector(".description").textContent);
                    stack = details[i].querySelector(".stackTrace").textContent.split("@");
                    for (var j = 0; j < stack.length; j++) {
                        console.log(stack[j]);
                    };
                    console.log();
                };

            });
        } else
            browser.wait(summary.checkStatus, summary.printResults);
    };

});
