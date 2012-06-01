#!/usr/local/bin/node

var Browser = require("zombie"),
    assert = require("assert");
    browser = new Browser(),
    url = process.env["HOME_URL"];

browser.visit(url, function () {
    var body = browser.document.body,
        main_elements = browser.document.querySelectorAll(".files > div:not(.header)"),
        all_text_styles = "",
        iterator;

    assert.ok(browser.success, "request to homepage should proceed");
    assert.ok(body.className.match(/(\s+|^)files(\s+|$)/g), "document.body should have files class");

    for (iterator = 0; iterator < main_elements.length; iterator++) {
        if ( ! main_elements[iterator].style.false) {
            assert.ok(false, "style attribute must be set");
            return ;
        }
        assert.ok(main_elements[iterator].style.false.match(/(\s+|^)scale\(/g), "there must be a scale attribute in CSS");
        assert.ok(main_elements[iterator].style.false.match(/(\s+|^)matrix\(1, 0, 0, 1, 0, 0\)/g), "there must be a matrix attribute in CSS");
        all_text_styles += " " + main_elements[iterator].style.false;
    };
    assert.ok(all_text_styles.match(/(\s+|^)scale\(1\)/g), "there must be a scale attribute set to 1");
    assert.ok(all_text_styles.match(/(\s+|^)scale\(0\.6\)/g), "there must be a scale attribute set to 0.5");
});
