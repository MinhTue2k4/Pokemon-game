import { game } from './game.js';
const $$ = document.querySelectorAll.bind(document);
function getElement(element, name) {
    if (element === null) {
        throw new Error(`${name} not found`);
    }
    return element;
}
const btnStart = getElement(document.querySelector('.btn-start'), '.btn-start');
const conTainer = getElement(document.querySelector('.cards-container'), '.cards-container');
const countdownBar = getElement(document.querySelector('.countdown-bar'), '.countdown-bar');
const gameMessage = getElement(document.querySelector('.game-message'), '.game-message');
function renderCards(cards) {
    const htmls = cards.map((hero) => {
        return `
                <div class="cards">
                    <img src="./assets/cover.jpg" class="cover">
                    <img src="${hero.image}" class="hero">
                </div>
            `;
    });
    conTainer.innerHTML = `<div class="row"> ${htmls.join('')} </div>`;
}
;
export function showGameMessage(message) {
    gameMessage.textContent = message;
}
export function handleEvents() {
    let the1 = null;
    let the2 = null;
    let timerID;
    let matchedCards = 0;
    let totalPairs = 0;
    function setupCardConditions() {
        const cards = document.getElementsByClassName("cards");
        for (let card of cards) {
            card.addEventListener("click", function () {
                if (this === the1 || the1 !== null && the2 !== null) {
                    return;
                }
                this.classList.add('flipped-card');
                if (the1 === null) {
                    the1 = this;
                }
                else {
                    the2 = this;
                    checkCardStatus(the1, the2);
                    setTimeout(function () {
                        the1 = null;
                        the2 = null;
                    }, 500);
                }
            });
        }
    }
    function checkCardStatus(img1, img2) {
        let heroImg1 = img1.querySelector('.hero')?.getAttribute('src');
        let heroImg2 = img2.querySelector('.hero')?.getAttribute('src');
        // match card 
        if (heroImg1 === heroImg2) {
            matchedCards++;
            setTimeout(() => {
                img1.classList.add('match-card');
                img2.classList.add('match-card');
            }, 600);
            //THẮNG  
            if (matchedCards == totalPairs) {
                clearInterval(timerID);
                btnStart.classList.add('is-blinking');
                btnStart.disabled = false;
                setTimeout(() => {
                    showGameMessage('Win! Press Play me to play again.');
                }, 500);
            }
        }
        else {
            setTimeout(function () {
                img1.classList.remove('flipped-card');
                img2.classList.remove('flipped-card');
            }, 800);
        }
    }
    function hideGameMessage() {
        gameMessage.textContent = '';
    }
    btnStart.addEventListener("click", function () {
        btnStart.classList.remove('is-blinking');
        btnStart.disabled = true;
        conTainer.classList.add('is-playing');
        hideGameMessage();
        the1 = null;
        the2 = null;
        matchedCards = 0;
        clearInterval(timerID);
        const cards = game.createDeck();
        totalPairs = game.heroes_Data_In_Use.length;
        renderCards(cards);
        setupCardConditions();
        let timeLeft = 60;
        timerID = setInterval(() => {
            timeLeft--;
            countdownBar.style.width = (timeLeft / 60) * 100 + '%';
            //THUA  
            if (timeLeft <= 0) {
                clearInterval(timerID);
                const allCards = $$('.cards');
                allCards.forEach((card) => {
                    card.classList.add('is-locked');
                });
                btnStart.classList.add('is-blinking');
                btnStart.disabled = false;
                setTimeout(() => {
                    showGameMessage('Time out! Press Play me to replay');
                    conTainer.classList.add('transit-animation');
                    conTainer.classList.remove('is-playing');
                }, 500);
            }
        }, 1000);
    });
}
//# sourceMappingURL=user-interface.js.map