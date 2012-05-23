var App = (function () {
    var public = {};

    public.addClass = function (element, className) {
        var classes;
        if (App.hasClass(element, className))
            return ;
        classes = element.className.split(" ");
        classes.push(className);
        element.className = classes.join(" ").replace(/^\s+|\s+$/g, "");
    };

    public.hasClass = function (element, className) {
        var classes = element.className.split(" ");
        return (classes.indexOf(className) >= 0);
    };

    return public;
})();
