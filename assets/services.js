const cardsAnimated = document.querySelectorAll('.animationCard');

function showCards() {
    cardsAnimated.forEach(card => {
        //Posicion, relativa al viewport, de las cards
        const cardPosition = card.getBoundingClientRect().top;

        //Altura de la ventana
        const viewportHeight = window.innerHeight / 1.5;

        if(cardPosition < viewportHeight){
            card.style.opacity = 1;
            card.classList.add('showCardFromLeft');
        }
    });
}

window.addEventListener('scroll', showCards);