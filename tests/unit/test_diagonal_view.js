var TestDiagonalView = function (fixture) {
    var public = {};

    public.execute = function () {
        module('DiagonalView class');

        test('render should set class to all divs from selector', function () {
            var view,
                stub = "<div class=\"some_div\" />" +
                       "<div class=\"some_div\" />" +
                       "<div class=\"some_div\" />" +
                       "<div class=\"some_div\" />";
            fixture.innerHTML = stub;

            view = DiagonalView({
                main_elements: fixture.querySelectorAll(".some_div")
            });
            view.render();

            equal('some_div diagonal', fixture.querySelectorAll(".some_div")[0].className);
            equal('some_div diagonal', fixture.querySelectorAll(".some_div")[1].className);
            equal('some_div diagonal', fixture.querySelectorAll(".some_div")[2].className);
            equal('some_div diagonal', fixture.querySelectorAll(".some_div")[3].className);
            fixture.innerHTML = "";
        });

        test('clear should set remove class from all divs', function () {
            var view,
                stub = "<div class=\"some_div diagonal\" />" +
                       "<div class=\"diagonal some_div\" />" +
                       "<div class=\"some_div diagonal another_class\" />" +
                       "<div class=\"some_div\" />";
            fixture.innerHTML = stub;

            view = DiagonalView({
                main_elements: fixture.querySelectorAll(".some_div")
            });
            view.clean();

            equal(fixture.querySelectorAll(".some_div")[0].className, 'some_div');
            equal(fixture.querySelectorAll(".some_div")[1].className, 'some_div');
            equal(fixture.querySelectorAll(".some_div")[2].className, 'some_div another_class');
            equal(fixture.querySelectorAll(".some_div")[3].className, 'some_div');
            fixture.innerHTML = "";
        });

    };

    return public;
};
