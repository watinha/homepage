describe('StandardView style class', function() {
    var fixture = document.createElement('div');

    it('Files standard_layout should set left positioning for elements and scale accordingly', function () {
        var stub = "<hr class=\"hr_stub\" />" +
                   "<div class=\"stub\" style=\"position:relative\">1 div</div>" +
                   "<div class=\"stub\" style=\"position:relative\">2 div</div>" +
                   "<div class=\"stub\" style=\"position:relative\">3 div</div>" +
                   "<div class=\"stub\" style=\"position:relative\">4 div</div>" +
                   "<div class=\"stub\" style=\"position:relative\">5 div</div>",
            standard,
            stubElements,
            transformAttribute,
            hr_stub; // browser dependent

        fixture.innerHTML = stub;
        transformAttribute = "transform";
        hr_stub = fixture.querySelectorAll(".hr_stub")[0];

        standard = StandardView({
            base_elements: fixture.querySelectorAll(".stub"),
            first_line: hr_stub
        }, {
            prefixed: function (attribute) {
                expect(attribute).toBe("transform");
                return "transform";
            }
        });
        standard.render();

        stubElements = fixture.querySelectorAll(".stub");
        expect(stubElements[0].style.left).toBe("7.7%", "left element should be 7.7");
        expect(stubElements[1].style.left).toBe("10.4%", "left element should be 10.4");
        expect(stubElements[2].style.left).toBe("13.1%", "left element should be 13.1");
        expect(stubElements[3].style.left).toBe("15.8%", "left element should be 15.8");
        expect(stubElements[4].style.left).toBe("18.5%", "left element should be 18.5");

        expect(stubElements[0].style[transformAttribute]).toBe("scale(0.68) matrix(1, 0, 0, 1, 0, 0)");
        expect(stubElements[1].style[transformAttribute]).toBe("scale(0.76) matrix(1, 0, 0, 1, 0, 0)");
        expect(stubElements[2].style[transformAttribute]).toBe("scale(0.84) matrix(1, 0, 0, 1, 0, 0)");
        expect(stubElements[3].style[transformAttribute]).toBe("scale(0.92) matrix(1, 0, 0, 1, 0, 0)");
        expect(stubElements[4].style[transformAttribute]).toBe("scale(1) matrix(1, 0, 0, 1, 0, 0)");

        expect(stubElements[0].style.marginTop).toBe("-4%");
        expect(stubElements[1].style.marginTop).toBe("-4%");
        expect(stubElements[2].style.marginTop).toBe("-4%");
        expect(stubElements[3].style.marginTop).toBe("-4%");
        expect(stubElements[4].style.marginTop).toBe("-4%");

        expect(hr_stub.style.marginBottom).toBe("3%");
        fixture.innerHTML = "";
    });

    it('Files remove_standard_layout should clear all previous inline settings', function () {
        var stub = "<hr class=\"hr_stub\" />" +
                   "<div class=\"stub\" style=\"position:relative\">1 div</div>" +
                   "<div class=\"stub\" style=\"position:relative\">2 div</div>" +
                   "<div class=\"stub\" style=\"position:relative\">3 div</div>" +
                   "<div class=\"stub\" style=\"position:relative\">4 div</div>" +
                   "<div class=\"stub\" style=\"position:relative\">5 div</div>",
            standard,
            stubElements,
            transformAttribute,
            hr_stub; // browser dependent

        fixture.innerHTML = stub;
        transformAttribute = "transform";
        hr_stub = fixture.querySelectorAll(".hr_stub")[0];

        standard = StandardView({
            base_elements: fixture.querySelectorAll(".stub"),
            first_line: hr_stub
        }, {
            prefixed: function (attribute) {
                expect(attribute).toBe("transform");
                return "transform";
            }
        });
        standard.render();
        standard.clean();

        stubElements = fixture.querySelectorAll(".stub");
        expect(stubElements[0].style.left).toBe("");
        expect(stubElements[1].style.left).toBe("");
        expect(stubElements[2].style.left).toBe("");
        expect(stubElements[3].style.left).toBe("");
        expect(stubElements[4].style.left).toBe("");

        expect(stubElements[0].style[transformAttribute]).toBe("");
        expect(stubElements[1].style[transformAttribute]).toBe("");
        expect(stubElements[2].style[transformAttribute]).toBe("");
        expect(stubElements[3].style[transformAttribute]).toBe("");
        expect(stubElements[4].style[transformAttribute]).toBe("");

        expect(stubElements[0].style.marginTop).toBe("");
        expect(stubElements[1].style.marginTop).toBe("");
        expect(stubElements[2].style.marginTop).toBe("");
        expect(stubElements[3].style.marginTop).toBe("");
        expect(stubElements[4].style.marginTop).toBe("");

        expect(hr_stub.style.marginBottom).toBe("");
        fixture.innerHTML = "";
    });
});
