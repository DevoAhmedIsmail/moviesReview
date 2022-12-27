/* open page menu */
var btn_menu = document.querySelector('.line-menu-btn');
var left_menu = document.querySelector('.left-menu');
btn_menu.addEventListener('click',()=>{
  left_menu.classList.toggle('open')
});