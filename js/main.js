
let hamburgerContainer = document.querySelector('.main-header__hamburger-button-container');


//*eventos de teclado
document.addEventListener('keydown', e => {
    // console.log(e.key)
    const boton = document.querySelector('.cart-button__row');
    if(e.key === 'Escape'){
        boton.style.display="none";
        flag = 1;
    }
})

//*hamburguer button effect
hamburgerContainer.addEventListener('click', e => {
    const topBread = document.querySelector('.hamburger-button__top-bread') ;
    topBread.classList.toggle('hamburger-button__top-bread--close');
    const meat = document.querySelector('.hamburger-button__meat') ;
    meat.classList.toggle('hamburger-button__meat--close');
    const bottonBread = document.querySelector('.hamburger-button__botton-bread') ;
    bottonBread.classList.toggle('hamburger-button__botton-bread--close');
})
