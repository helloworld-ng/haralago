var Sections = (function () {
    var current = 1;
    var ids = [];

    var entrances = (function () {
        return {
            servicesBreakdown: function () {
                Services.setActive();
            },
            servicesTestimonials: function() {
                Testimonials.play();
            },
            aboutSlideshow: function() {
                AboutSlideShow.play();
            }
        }
    })();
    
    var exits = (function () {
        return {
            servicesTestimonials: function() {
                Testimonials.reset();
            },
            aboutSlideshow: function() {
                AboutSlideShow.reset();
            }
        }
    })();

    function getInfo(id) {
        var div = $("#" + id);
        var section = {
            div: div,
            isGreen: div.hasClass('section--green'),
            isBlue: div.hasClass('section--blue'),
            isBlueText: div.hasClass('section--blue-text'),
            isGreenText: div.hasClass('section--green-text'),
            isClear: div.hasClass('section--clear'),
            showPagination: div.is('[data-pagination]')
        }
        section.isColored = section.isGreen || section.isBlue;
        return section;
    }

    function setHeaderColor(elementId, direction) {
        var section = getInfo(elementId);
        $('#header').attr('class', 'header');

        if (direction == 'down') $('#header').addClass('header--add-delay');
        if (section.isGreen) $('#header').addClass('header--green');
        if (section.isBlue) $('#header').addClass('header--blue');
        if (section.isBlueText) $('#header').addClass('header--blue-text');
        if (section.isGreenText) $('#header').addClass('header--green-text');
        if (section.isClear) $('#header').addClass('header--clear');
    }

    function setPagination(elementId, index) {
        var section = getInfo(elementId);
        if (section.showPagination) {
            $('#pagination').attr('class', 'pagination');
            if (section.isColored) $('#pagination').addClass('pagination--white');
        } else {
            $('#pagination').attr('class', 'hidden');
        }

        Navigation.update(index);
    }

    return {
        init: function () {
            var _sections = $("#main > section");
            ids = $.map(_sections, function (i) {
                return $(i).attr("id")
            });
        },
        transition: function (index) {
            var fromSection = ids[current - 1];
            var toSection = ids[index - 1];
            var direction = index > current ? "down" : "up";
            
            setHeaderColor(toSection, direction);
            setPagination(toSection, index);
            
            var exitFunction = exits[fromSection];
            if (exitFunction) setTimeout(exitFunction, 500);
        },
        afterMove: function (index) {
            current = index;
            var toSection = ids[index - 1];

            var entranceFunction = entrances[toSection];
            if (entranceFunction) entranceFunction();
        }
    }
})();