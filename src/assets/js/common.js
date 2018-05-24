$(function () {

    //////////////////////////////////////////////////
    // CHANGE WORDS

    var words = ['Awesome', 'Manageable', 'Responsive', 'Modular', 'BEM-Based', 'Great', 'Useful', 'Perfect', 'Clean', 'Robust', 'Intelligent', 'Modern'],
        number = 0;

    setInterval(function () {
        number = number + 1 >= words.length ? 0 : number + 1;
        $('.ctf__actions__init-word-changer span').css({opacity: 0}).html(words[number]).animate({opacity: 1}, 200);
    }, 1000);


    //////////////////////////////////////////////////
    // Tooltip

    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
    });


    //////////////////////////////////////////////////
    // Fixed Menu

    $(window).on('scroll', function(){
        var scrollTop = $(window).scrollTop();

        if (scrollTop > 35) {
            $('.ctf__menu').addClass('ctf__menu--transformed')
        } else {
            $('.ctf__menu').removeClass('ctf__menu--transformed')
        }
    });


    //////////////////////////////////////////////////
    // Calculator

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function calcTotal() {
        var typicalPrice = 190,
            customPrice = 490,
            typicalDays = 0.3,
            customDays = 1,
            typical = $('#numberTypical').val(),
            custom = $('#numberCustom').val(),
            total = $('#calc_total'),
            days = $('#calc_days'),
            formPrice = $('#formPrice'),
            formDays = $('#formDays');

        var countPrice = numberWithSpaces(typical * typicalPrice + custom * customPrice),
            countDays = (typical * typicalDays + custom * customDays) < 3 ? typical + custom > 0 ? 3 : 0 : Math.ceil((typical * typicalDays + custom * customDays));

        total.html(countPrice);
        days.html(countDays);

        formPrice.val(countPrice);
        formDays.val(countDays);

    }

    $('.ctf__hire-us__minus').on('click', function(){
        var input = $(this).closest('.ctf__hire-us__control').find('input'),
            val = input.val();

        if (val == '') {
            val = 0;
        }
        if (val > 0) {
            input.val(parseInt(val) - 1);
        }
        if (val == 1) {
            input.val('');
        }

        calcTotal();
    });

    $('.ctf__hire-us__plus').on('click', function(){
        var input = $(this).closest('.ctf__hire-us__control').find('input'),
            val = input.val();

        if (val == '') {
            val = 0;
        }

        input.val(parseInt(val) + 1);

        calcTotal();
    });

    $('#numberTypical, #numberCustom').on('keyup', function (e) {
        calcTotal();
    });


    //////////////////////////////////////////////////
    // ScrollTo

    Path.map("#/information").to(function(){$(window).stop(true,true).scrollTo('.scroll__information', 300, {offset: -100})});
    Path.map("#/products").to(function(){$(window).stop(true,true).scrollTo('.scroll__products', 300, {offset: -100})});
    Path.map("#/visual-builder").to(function(){$(window).stop(true,true).scrollTo('.scroll__products', 300, {offset: -100})});
    Path.map("#/hire-us").to(function(){$(window).stop(true,true).scrollTo('.scroll__hire-us', 300, {offset: -100})});
    Path.map("#/reviews").to(function(){$(window).stop(true,true).scrollTo('.scroll__reviews', 300, {offset: -100})});
    Path.map("#/modules-market").to(function(){$(window).stop(true,true).scrollTo('.scroll__market', 300, {offset: -100})});
    Path.map("#/showcase").to(function(){$(window).stop(true,true).scrollTo('.scroll__showcase', 300, {offset: -100})});

    Path.listen();

});