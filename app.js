document.addEventListener(`DOMContentLoaded`, () =>{
    swal({
        title: "¡Welcome to the memory cat game!",
        text: `Try to find the matching cats before you ran out of lives. 
        ¡Good luck!`,
        icon: "images/start-img.png",
    })
})


// Traemos lo que necesitamos del html
const section = document.querySelector(`section`);
const playerLivesCount = document.querySelector(`span`);
let playerLives = 6;

//Link texto de cantidad de vidas
playerLivesCount.textContent = playerLives;

//Funcion que retorna la info de las cards
const getData = () => [{
        imgSrc: `./images/error-101.jpg`,
        name: `gatos turbios`
    },
    {
        imgSrc: `./images/error-102.jpg`,
        name: `gato recargando`
    },
    {
        imgSrc: `./images/error-305.jpg`,
        name: `gato cute`
    },
    {
        imgSrc: `./images/error-400.jpg`,
        name: `gato fucku`
    },
    {
        imgSrc: `./images/error-409.jpg`,
        name: `gato violento`
    },
    {
        imgSrc: `./images/error-417.jpg`,
        name: `gato mojado`
    },
    {
        imgSrc: `./images/error-420.jpg`,
        name: `gato fumado`
    },
    {
        imgSrc: `./images/error-506.jpg`,
        name: `gatonejo`
    },
    {
        imgSrc: `./images/error-101.jpg`,
        name: `gatos turbios`
    },
    {
        imgSrc: `./images/error-102.jpg`,
        name: `gato recargando`
    },
    {
        imgSrc: `./images/error-305.jpg`,
        name: `gato cute`
    },
    {
        imgSrc: `./images/error-400.jpg`,
        name: `gato fucku`
    },
    {
        imgSrc: `./images/error-409.jpg`,
        name: `gato violento`
    },
    {
        imgSrc: `./images/error-417.jpg`,
        name: `gato mojado`
    },
    {
        imgSrc: `./images/error-420.jpg`,
        name: `gato fumado`
    },
    {
        imgSrc: `./images/error-506.jpg`,
        name: `gatonejo`
    },
];

//Funcion que randomice el orden de las cartas en el array
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
}

//Funcion que renderiza las cartas
const renderCards = () => {
    const cardData = randomize();

    cardData.forEach(item => {
        const card = document.createElement(`div`);
        const cardBack = document.createElement(`div`);
        const cardFace = document.createElement(`img`);

        card.classList = `card`;
        cardBack.classList = `back`;
        cardFace.classList = `face`;

        cardFace.src = item.imgSrc;
        card.setAttribute(`name`,item.name);

        section.appendChild(card);
        card.appendChild(cardFace);
        card.appendChild(cardBack);

        card.addEventListener(`click`, (e) =>{
            card.classList.toggle(`toggleCard`);
            checkCard(e);
        });
    });

};

//Funcion que controla el match de cartas
const checkCard = (e) =>{
    const clickedCard = e.target;
    clickedCard.classList.add(`flipped`);
    const flippedCards = document.querySelectorAll(`.flipped`);
    const toggleCards = document.querySelectorAll(`.toggleCard`);
    //logica de match
    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute(`name`)) {
            flippedCards.forEach((card)=>{
                card.classList.remove(`flipped`);
                card.style.pointerEvents = `none`;
            })
        }else{
            flippedCards.forEach(card =>{
                card.classList.remove(`flipped`);
                setTimeout(() =>{
                    card.classList.remove(`toggleCard`)
                },1000);
            });
            playerLives--;
            playerLivesCount.innerText = playerLives;
            if (playerLives === 0) {
                setTimeout(() =>{
                    restart();
                    swal({
                        title: "¡Oh no!",
                        text: `You have no lifes left, try again :(`,
                        icon: "images/lose-img.png",
                    })
                },500);
            }
        };
    };
    //mensaje si ganas
    if (toggleCards.length === 16) {
        setTimeout(() =>{
            restart();
            swal({
                title: "¡Congratulations!",
                text: `You've won a virtual pat, take it :)`,
                icon: "images/win-img.gif",
            })
        },500);
    }
};

//Funcion que restartea el game 
const restart = () => {
    const cardData = randomize();
    const cards = document.querySelectorAll(`.card`);
    const faces = document.querySelectorAll(`.face`);
    section.style.pointerEvents = `none`; //desabilitamos la interaccion con el juego mientras se reinicia

    cardData.forEach((card,index) =>{
        cards[index].classList.remove(`toggleCard`);

        setTimeout(()=>{ //lo demoramos para que termine la animacion y no nos deje ver las imagenes nuevas
            cards[index].style.pointerEvents = `all`;
            faces[index].src = card.imgSrc;
            cards[index].setAttribute(`name`, card.name);
            section.style.pointerEvents = `all`; //una vez randomizado devolvemos la interaccion
        },1000); 
    });

    playerLives = 6;
    playerLivesCount.textContent = playerLives;
};

renderCards();