var TestApp = function (fixture) {
    var public = {};

    public.execute = function () {
        module('App static class');

        test('init should set hasClass', function () {
            var divs, stubs = "<div />" +
                              "<div class=\"some_class\" />" +
                              "<div class=\"set_class some_class\" />" +
                              "<div class=\"other_class set_class some_class\" />" +
                              "<div class=\"with other classes set_class some_class\" />" +
                              "<div class=\"\" />";
            fixture.innerHTML = stubs;

            divs = fixture.querySelectorAll("#qunit-fixture div");

            ok( ! App.hasClass(divs[0], 'set_class'));
            ok( ! App.hasClass(divs[1], 'set_class'));
            ok(App.hasClass(divs[2], 'set_class'));
            ok(App.hasClass(divs[3], 'set_class'));
            ok(App.hasClass(divs[4], 'set_class'));
            ok( ! App.hasClass(divs[5], 'set_class'));
            fixture.innerHTML = "";
        });

        test('init should set addClass', function () {
            var divs, stubs = "<div />" +
                              "<div class=\"some_class\" />" +
                              "<div class=\"set_class some_class\" />" +
                              "<div class=\"\" />";
            fixture.innerHTML = stubs;

            divs = fixture.querySelectorAll("#qunit-fixture div");

            for (var i = 0; i < divs.length; i++) {
                App.addClass(divs[i], "set_class");
            };

            equal(divs[0].className, "set_class");
            equal(divs[1].className, "some_class set_class");
            equal(divs[2].className, "set_class some_class");
            equal(divs[3].className, "set_class");
            fixture.innerHTML = "";
        });

        test('init should set removeClass', function () {
            var divs, stubs = "<div class=\"some_class\" />" +
                              "<div class=\"some_class another_one\" />" +
                              "<div class=\"set_class some_class\" />" +
                              "<div class=\"no_class\" />";
            fixture.innerHTML = stubs;

            divs = fixture.querySelectorAll("#qunit-fixture div");

            for (var i = 0; i < divs.length; i++) {
                App.removeClass(divs[i], "some_class");
            };

            equal(divs[0].className, "");
            equal(divs[1].className, "another_one");
            equal(divs[2].className, "set_class");
            equal(divs[3].className, "no_class");
            fixture.innerHTML = "";
        });
    };

    return public;
};
