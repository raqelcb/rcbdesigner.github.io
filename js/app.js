'use strict'

const icono = document.querySelector('.fas.fa-bars')
const nav   = document.querySelector('.menu')

icono.addEventListener('click',function(){
    nav.classList.toggle('ver')
})