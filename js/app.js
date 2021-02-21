'use strict';
var icono = document.querySelector('.navbar__fas');
var nav = document.querySelector('.navbar__collapse');
icono.addEventListener('click', function () {
    nav.classList.toggle('ver');
});