describe('Helpers static class suite', function () {

    it('init should set hasClass', function () {
        var divs, stubs = "<div />" +
                          "<div class=\"some_class\" />" +
                          "<div class=\"set_class some_class\" />" +
                          "<div class=\"other_class set_class some_class\" />" +
                          "<div class=\"with other classes set_class some_class\" />" +
                          "<div class=\"\" />",
            fixture = document.createElement('div');
        fixture.innerHTML = stubs;

        divs = fixture.querySelectorAll("div > div");

        expect(Helpers.hasClass(divs[0], 'set_class')).not.toBe(true);
        expect(Helpers.hasClass(divs[1], 'set_class')).not.toBe(true);
        expect(Helpers.hasClass(divs[2], 'set_class')).toBe(true);
        expect(Helpers.hasClass(divs[3], 'set_class')).toBe(true);
        expect(Helpers.hasClass(divs[4], 'set_class')).toBe(true);
        expect(Helpers.hasClass(divs[5], 'set_class')).not.toBe(true);
        fixture.innerHTML = "";
    });

    it('init should set addClass', function () {
        var divs, stubs = "<div />" +
                          "<div class=\"some_class\" />" +
                          "<div class=\"set_class some_class\" />" +
                          "<div class=\"\" />",
            fixture = document.createElement('div');
        fixture.innerHTML = stubs;

        divs = fixture.querySelectorAll("div > div");

        for (var i = 0; i < divs.length; i++) {
            Helpers.addClass(divs[i], "set_class");
        };

        expect(divs[0].className).toBe("set_class");
        expect(divs[1].className).toBe("some_class set_class");
        expect(divs[2].className).toBe("set_class some_class");
        expect(divs[3].className).toBe("set_class");
        fixture.innerHTML = "";
    });

    it('init should set removeClass', function () {
        var divs, stubs = "<div class=\"some_class\" />" +
                          "<div class=\"some_class another_one\" />" +
                          "<div class=\"set_class some_class\" />" +
                          "<div class=\"no_class\" />",
            fixture = document.createElement('div');
        fixture.innerHTML = stubs;

        divs = fixture.querySelectorAll("div > div");

        for (var i = 0; i < divs.length; i++) {
            Helpers.removeClass(divs[i], "some_class");
        };

        expect(divs[0].className).toBe("");
        expect(divs[1].className).toBe("another_one");
        expect(divs[2].className).toBe("set_class");
        expect(divs[3].className).toBe("no_class");
        fixture.innerHTML = "";
    });

    it('Helpers.activateListener should set listener', function () {
        var mock = {
                addEventListener: function (type, f) {
                    if (type === "click") clickListener = f;
                    else keydownListener = f;
                }
            },
            clickListener, keydownListener, flag = false,
            functionMock = function () { flag = !flag; };
        Helpers.activateListener(mock, functionMock);
        expect(mock.tabIndex).toBe(0);
        expect(clickListener).toBe(functionMock);
        keydownListener({ keyCode: 13 });
        expect(flag).toBe(true);
        keydownListener({ keyCode: 32 });
        expect(flag).toBe(false);
        keydownListener({ keyCode: 0 });
        expect(flag).toBe(false);
    })

});
