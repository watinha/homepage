describe("test standard navigation view", function () {

    xit("scale and matrix should be set as the page is loaded", function (done) {
        var Browser = require("zombie"),
            browser = new Browser(),
            url = process.env["HOME_URL"];

        if (url.search("index.html") == -1)
            url += "/index.html"
        browser.visit(url, function () {
            var body = browser.document.body,
                main_elements = browser.document.querySelectorAll(".files > .wrapper > div:not(.header)"),
                all_text_styles = "",
                iterator;

            expect(browser.success).toBe(true);
            expect(body.className).toMatch(/(\s+|^)files(\s+|$)/g);

            for (iterator = 0; iterator < main_elements.length; iterator++) {
                if ( ! main_elements[iterator].style.false) {
                    expect(true).toBe(false); // always fails if it gets here
                    return ;
                }
                expect(main_elements[iterator].style.false).toMatch(/(\s+|^)scale\(/g);
                expect(main_elements[iterator].style.false).toMatch(/(\s+|^)matrix\(1, 0, 0, 1, 0, 0\)/g);
                all_text_styles += " " + main_elements[iterator].style.false;
            };
            expect(all_text_styles).toMatch(/(\s+|^)scale\(1\)/g);
            expect(all_text_styles).toMatch(/(\s+|^)scale\(0\.6/g);
            done();
        });
    });

    it("after click in a div the diagonal layout should be loaded", function (done) {
        var Browser = require("zombie"),
            browser = new Browser(),
            url = process.env["HOME_URL"];

        if (url.search("index.html") == -1)
            url += "/index.html"
        browser.visit(url, function () {
            var body = browser.querySelector("body"),
                main_elements = browser.querySelectorAll(".files > .wrapper > div:not(.header)"),
                all_text_styles = "",
                iterator,
                ev = null;

            expect(browser.success).toBe(true);

            browser.click("#profile_header > a");
            var i, clicked_element;
            for (i = 0; i < main_elements.length; i++) {
                expect(main_elements[i].className).toContain("diagonal");
                if (main_elements[i].className.match(/(\s+|^)profile(\s+|$)/g)) {
                    clicked_element = main_elements[i];
                }
            };
            console.log(browser.querySelector("#supimpa").outerHTML);

            expect(clicked_element.className).toContain("open");
            done();
        });
    });

    xit("after click link inside div you should go the href of that link", function (done) {
        var Browser = require("zombie"),
            browser = new Browser(),
            url = process.env["HOME_URL"];

        if (url.search("index.html") == -1)
            url += "/index.html"
        browser.visit(url, function () {
            var body = browser.document.body,
                main_elements = browser.document.querySelectorAll(".files > .wrapper > div:not(.header)"),
                all_text_styles = "",
                iterator,
                ev = null;

            expect(browser.success).toBe(true);

            browser.clickLink(".software > h3 > a", function () {
                var i, clicked_element;
                browser.clickLink(".software > ul > li:last-child > span.bold:first-child > a", function () {
                    expect(browser.window.location.url).toBe("http://wwatana.be/prototipohci/agenda.html");
                    done();
                });
            });
        });
    });
});
