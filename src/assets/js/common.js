$(function () {

    //////////////////////////////////////////////////
    // Change promo main word
    var words = ['Awesome', 'Manageable', 'Responsive', 'Modular', 'BEM-Based', 'Great', 'Useful', 'Perfect', 'Clean', 'Robust', 'Intelligent', 'Modern'],
        number = 0;

    setInterval(function () {
        number = number + 1 >= words.length ? 0 : number + 1;
        $('.header__promoMainWord').css({opacity: 0}).html(words[number]).animate({opacity: 1}, 200);
    }, 1000);

    //////////////////////////////////////////////////
    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    //////////////////////////////////////////////////
    //  Make dropdown menus keyboard accessible
    $(".nav__item--dropdownToggle .nav__link, .nav__subLink" ).focus(function () {
        $('.nav__item--dropdownToggle').addClass("hover");
    }).blur(function () {
        $('.nav__item--dropdownToggle').removeClass("hover");
    });

    //////////////////////////////////////////////////
    //  Toggle mobile menu
    $(".nav__toggle").click(function () {
        $(".nav__toggle").toggleClass("nav__toggle--open");
        $(".nav__list").toggleClass("nav__list--open");
    })
})