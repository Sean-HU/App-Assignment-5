// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {
    function renderHomeView() {
        $('body').html(homeTpl());
        $('.search-first').on('keyup', findByName);
        $('.search-last').on('keyup', findByName);
    }

    var homeTpl = Handlebars.compile($("#home-tpl").html());
    var employeeListTpl = Handlebars.compile($("#employee-list-tpl").html());


    /* ---------------------------------- Local Variables ---------------------------------- */
    var service = new EmployeeService();
    service.initialize().done(function () {
        renderHomeView();
    });

    /* --------------------------------- Event Registration -------------------------------- */
    $('.search-first').on('keyup', findByName);
    $('.search-last').on('keyup', findByName);

    $('.help-btn').on('click', function() {
        alert("Employee Directory v3.4");
    });

    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByName() {
        var trimmed_first = $('.search-first').val().trim();
        var trimmed_last = $('.search-last').val().trim();
        if (trimmed_first != trimmed_first.toLowerCase()) {  //if not lowercase, 
            trimmed_first = ""; }                           //then set to empty string so it is not included in search
        if (trimmed_last != trimmed_last.toLowerCase()) {
            trimmed_last = ""; }
        if (!((trimmed_first.indexOf(' ') >= 0) || (trimmed_last.indexOf(' ') >= 0))) {
            if ((trimmed_first.length >= 2) || (trimmed_last.length >= 2)) {
                service.findByName(trimmed_first, trimmed_last).done(function (employees) {
                    $('.content').html(employeeListTpl(employees));
                });
            }
            else {
                $('.content').html(null);
            }
        }
    }
}());