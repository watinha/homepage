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
        transformAttribute = Modernizr.prefixed('transform');
        hr_stub = fixture.querySelectorAll(".hr_stub")[0];

        standard = StandardView({
            base_elements: fixture.querySelectorAll(".stub"),
            first_line: hr_stub
        });
        standard.render();

        stubElements = fixture.querySelectorAll(".stub");
        expect(stubElements[0].style.left).toBe("0%", "left element should be zero");
        expect(stubElements[1].style.left).toBe("10%", "left element should be 10%");
        expect(stubElements[2].style.left).toBe("20%", "left element should be 20%");
        expect(stubElements[3].style.left).toBe("30%", "left element should be 30%");
        expect(stubElements[4].style.left).toBe("40%", "left element should be 40%");

        expect(stubElements[0].style[transformAttribute]).toBe("scale(0.6) matrix(1, 0, 0, 1, 0, 0)");
        expect(stubElements[1].style[transformAttribute]).toBe("scale(0.7) matrix(1, 0, 0, 1, 0, 0)");
        expect(stubElements[2].style[transformAttribute]).toBe("scale(0.8) matrix(1, 0, 0, 1, 0, 0)");
        expect(stubElements[3].style[transformAttribute]).toBe("scale(0.9) matrix(1, 0, 0, 1, 0, 0)");
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
        transformAttribute = Modernizr.prefixed('transform');
        hr_stub = fixture.querySelectorAll(".hr_stub")[0];

        standard = StandardView({
            base_elements: fixture.querySelectorAll(".stub"),
            first_line: hr_stub
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
