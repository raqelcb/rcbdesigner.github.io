
(function($) {
    "use strict";
  
    var nav = $('nav');
    var navHeight = nav.outerHeight();
  
/*MENU OK*/
    var icono = document.querySelector('.navbar__fas');
    var nav = document.querySelector('.navbar__collapse');
    icono.addEventListener('click', function () {
        nav.classList.toggle('ver');
    });





    $('.navbar__button').on('click', function() {
      if (!$('#main__nav').hasClass('navbar__small')) {
        $('#main__nav').addClass('navbar__small');
      }
    })
  
    // Preloader
    $(window).on('load', function() {
      if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function() {
          $(this).remove();
        });
      }
    });
  
    // Back to top button
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('.back-top').fadeIn('slow');
      } else {
        $('.back-top').fadeOut('slow');
      }
    });
    $('.back-top').click(function() {
      $('html, body').animate({
        scrollTop: 0
      }, 1500, 'easeInOutExpo');
      return false;
    });
  
    /*--/ Star ScrollTop /--*/
    $('.scrolltop-mf').on("click", function() {
      $('html, body').animate({
        scrollTop: 0
      }, 1000);
    });
  
  
    /*--/ Star Scrolling nav /--*/
    var main__nav_height = $('#main__nav').outerHeight() - 22;
    $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          var scrollto = target.offset().top - main__nav_height;
          $('html, body').animate({
            scrollTop: scrollto
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });
  
    // Scroll to sections on load with hash links
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto_initial = $(initial_nav).offset().top - main__nav_height;
        $('html, body').animate({
          scrollTop: scrollto_initial
        }, 1000, "easeInOutExpo");
      }
    }
  
    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll').on("click", function() {
      $('.navbar__collapse').collapse('hide');
    });
  
    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#main__nav',
      offset: navHeight
    });
    /*--/ End Scrolling nav /--*/
  
    /*--/ Navbar Menu Reduce /--*/
    $(window).trigger('scroll');
    $(window).on('scroll', function() {
      var pixels = 50;
      var top = 1200;
      if ($(window).scrollTop() > pixels) {
        $('.navbar-expand-md').addClass('navbar__small');
        $('.navbar-expand-md').removeClass('navbar__transition');
      } else {
        if (!$('#navbar__default').hasClass('show')) {
          $('.navbar-expand-md').removeClass('navbar__small');
        }
        $('.navbar-expand-md').addClass('navbar__transition');
      }
      if ($(window).scrollTop() > top) {
        $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
      } else {
        $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
      }
    });
  
    /*--/ Star Typed /--*/
    if ($('.text-slider').length == 1) {
      var typed_strings = $('.text-slider-items').text();
      var typed = new Typed('.text-slider', {
        strings: typed_strings.split(','),
        typeSpeed: 80,
        loop: true,
        backDelay: 1100,
        backSpeed: 30
      });
    }
  
    // Portfolio details carousel
    $(".portfolio-details-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      items: 1
    });
  

  
  })(jQuery);