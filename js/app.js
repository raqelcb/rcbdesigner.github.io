'use strict'

const icono = document.querySelector('.fas.fa-bars')
const nav   = document.querySelector('.menu')

icono.addEventListener('click',function(){
    nav.classList.toggle('ver')
})


var siguienteFoto = function () {
    foto++;
  
    if (foto >= 3) {
      foto = 0;
    }
  
    pasarFoto();
  };
  
  var anteriorFoto = function () {
    if (foto === 0) {
      foto = 3;
    }
  
    foto--;
    pasarFoto();
  };
  
  var pasarFoto = function () {
    work__image.forEach(function (cadaImg, i) {
        work__image[i].classList.remove('ver');
      slider__li[i].classList.remove('ver');
    });
    work__image[foto].classList.add('ver');
    slider__li[foto].classList.add('ver');
  };
  
  var fragmento = document.createDocumentFragment();
  var foto = 0;
  var work__carousel = document.body.querySelector('.work__carousel');
  var work__image = work__carousel.querySelectorAll('.work__image');
  var ul = document.createElement('ul');
  ul.classList.add('slider__ul');
  fragmento.appendChild(ul);
  work__carousel.appendChild(fragmento);
  var slider__ul = work__carousel.querySelector('.slider__ul');
  work__image.forEach(function (cadaImg, i) {
    var li = document.createElement('li');
    li.classList.add('slider__li');
  
    if (i === 0) {
      li.classList.add('ver');
    }
  
    fragmento.appendChild(li);
  });
  slider__ul.appendChild(fragmento);
  var slider__li = slider__ul.querySelectorAll('.slider__li'); 
  
  var flechas = work__carousel.querySelectorAll('.slider__flecha');
  slider__li.forEach(function (cadaLi, i) {
    slider__li[i].addEventListener('click', function () {
      foto = i;
      pasarFoto();
    });
  });
  flechas[0].addEventListener('click', siguienteFoto);
  flechas[1].addEventListener('click', anteriorFoto);

//   (function($) {
//     "use strict";
  
//     var nav = $('nav');
//     var navHeight = nav.outerHeight();
  

//  // Preloader
//  $(window).on('load', function() {
//     if ($('#preloader').length) {
//       $('#preloader').delay(100).fadeOut('slow', function() {
//         $(this).remove();
//       });
//     }
//   });


// // Back to top button
// $(window).scroll(function() {
//     if ($(this).scrollTop() > 100) {
//       $('.back-top').fadeIn('slow');
//     } else {
//       $('.back-top').fadeOut('slow');
//     }
//   });
//   $('.back-top').click(function() {
//     $('html, body').animate({
//       scrollTop: 0
//     }, 1500, 'easeInOutExpo');
//     return false;
//   });


//  /*--/ Star Typed /--*/
// if ($('.text-slider').length == 1) {
//     var typed_strings = $('.text-slider-items').text();
//     var typed = new Typed('.text-slider', {
//       strings: typed_strings.split(','),
//       typeSpeed: 80,
//       loop: true,
//       backDelay: 1100,
//       backSpeed: 30
//     });
//   }
// })(jQuery);