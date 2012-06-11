describe('DiagonalView class', function () {
    var fixture = document.createElement('div');

    it('render should set class to all divs from selector', function () {
        var view,
            stub = "<div class=\"some_div\" />" +
                   "<div class=\"some_div\" />" +
                   "<div class=\"some_div\" />" +
                   "<div class=\"some_div\" />";
        fixture.innerHTML = stub;

        view = DiagonalView({
            main_elements: fixture.querySelectorAll(".some_div")
        }, Helpers, window);
        view.render();

        expect('some_div diagonal').toBe(fixture.querySelectorAll(".some_div")[0].className);
        expect('some_div diagonal').toBe(fixture.querySelectorAll(".some_div")[1].className);
        expect('some_div diagonal').toBe(fixture.querySelectorAll(".some_div")[2].className);
        expect('some_div diagonal').toBe(fixture.querySelectorAll(".some_div")[3].className);
        fixture.innerHTML = "";
    });

    it('clear should set remove class from all divs', function () {
        var view,
            stub = "<div class=\"some_div diagonal\" />" +
                   "<div class=\"diagonal some_div\" />" +
                   "<div class=\"some_div diagonal another_class open\" style=\"bottom:25px\" />" +
                   "<div class=\"some_div\" />";
        fixture.innerHTML = stub;

        view = DiagonalView({
            main_elements: fixture.querySelectorAll(".some_div")
        }, Helpers, window);
        view.clean();

        expect(fixture.querySelectorAll(".some_div")[0].className).toBe('some_div');
        expect(fixture.querySelectorAll(".some_div")[1].className).toBe('some_div');
        expect(fixture.querySelectorAll(".some_div")[2].className).toBe('some_div another_class');
        expect(fixture.querySelectorAll(".some_div")[2].style.bottom).toBe('');
        expect(fixture.querySelectorAll(".some_div")[3].className).toBe('some_div');
        fixture.innerHTML = "";
    });

    it("click should set open class to target", function () {
        var view, clicked_element,
            stub = "<div class=\"some_div diagonal\"></div>" +
                   "<div class=\"diagonal some_div\" id=\"clicked_element\"><span><a href=\"#\">clickable element</a></span></div>" +
                   "<div class=\"some_div diagonal another_class\"></div>" +
                   "<div class=\"some_div\"></div>";
        fixture.innerHTML = stub;

        view = DiagonalView({
            main_elements: fixture.querySelectorAll(".some_div")
        }, Helpers, window);
        clicked_element = fixture.querySelector("#clicked_element");
        view.click({
            target: fixture.querySelector("#clicked_element")
        });

        expect(clicked_element.className).toContain("open");
        fixture.innerHTML = "";
    });

    it("click should set open class to respective main_element parent to target", function () {
        var view, clicked_element,
            stub = "<div class=\"some_div diagonal\"></div>" +
                   "<div class=\"diagonal some_div\" id=\"clicked_element\"><span><a href=\"#\">clickable element</a></span></div>" +
                   "<div class=\"some_div diagonal another_class\"></div>" +
                   "<div class=\"some_div\"></div>";
        fixture.innerHTML = stub;

        view = DiagonalView({
            main_elements: fixture.querySelectorAll(".some_div")
        }, Helpers, window);
        clicked_element = fixture.querySelector("#clicked_element");
        view.click({
            target: fixture.querySelector("#clicked_element > span > a")
        });

        expect(clicked_element.className).toContain("open");
        fixture.innerHTML = "";
    });

    it("click should set open class to respective main_element parent to target and remove open class from others", function () {
        var view, clicked_element, previous_element,
            stub = "<div class=\"some_div diagonal open\" id=\"previous_element\"></div>" +
                   "<div class=\"diagonal some_div\" id=\"clicked_element\"><span><a href=\"#\">clickable element</a></span></div>" +
                   "<div class=\"some_div diagonal another_class\"></div>" +
                   "<div class=\"some_div\"></div>";
        fixture.innerHTML = stub;

        view = DiagonalView({
            main_elements: fixture.querySelectorAll(".some_div")
        }, Helpers, window);
        previous_element = fixture.querySelector("#previous_element");
        clicked_element = fixture.querySelector("#clicked_element");
        view.click({
            target: fixture.querySelector("#clicked_element > span > a")
        });

        expect(clicked_element.className).toContain("open");
        expect(previous_element.className).not.toContain("open");
        fixture.innerHTML = "";
    });

    it("click should adjust relative position accordingly to the element that has been clicked", function () {
         var view, target,
            stub = "<div class=\"some_div diagonal\"></div>" +
                   "<div class=\"some_div diagonal\"></div>" +
                   "<div class=\"some_div diagonal\"></div>" +
                   "<div class=\"some_div diagonal\"></div>" +
                   "<div class=\"some_div diagonal\"></div>" +
                   "<div class=\"some_div diagonal\"></div>" +
                   "<div class=\"some_div diagonal\"></div>" +
                   "<div class=\"some_div diagonal\"></div>" +
                   "<div class=\"some_div diagonal\"></div>" +
                   "<div class=\"some_div diagonal\"></div>";
        fixture.innerHTML = stub;
        target = fixture.querySelectorAll(".some_div");

        view = DiagonalView({
            main_elements: target
        }, Helpers, window);
        for (var i = 0; i < target.length; i++) {
            view.click({target: target[i]});
            expect(target[i].style.bottom).toBe((10 + 50*i) + "px");
            for (var j = 0; j < i; j++) {
                expect(target[j].style.bottom).toBe("");
            };
        };

        fixture.innerHTML = "";
   });
});
