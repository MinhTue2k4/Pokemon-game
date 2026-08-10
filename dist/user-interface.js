import { game } from './game.js';
const $$ = document.querySelectorAll.bind(document);
const conTainer = document.querySelector('.cards-container');
const btnStart = document.querySelector('.btn-start');
const countdownBar = document.querySelector('.countdown-bar');
if (!conTainer)
    throw new Error(".cards-container not found");
if (!btnStart)
    throw new Error(".btn-start not found");
if (!countdownBar)
    throw new Error(".countdown-bar not found");
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
export function handleEvents() {
    let the1 = null;
    let the2 = null;
    let timerID;
    let matchedCards = 0;
    let totalPairs = game.heroes_Data_In_Use.length;
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
                    alert('Winner!');
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
    //
    btnStart.addEventListener("click", function () {
        btnStart.classList.remove('is-blinking');
        btnStart.disabled = true;
        conTainer.classList.add('is-playing');
        matchedCards = 0;
        clearInterval(timerID);
        const cards = game.createDeck();
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
                    alert('Thua rồiiiiiiiiiiiiiiiii!');
                    conTainer.classList.add('transit-animation');
                    conTainer.classList.remove('is-playing');
                }, 500);
            }
        }, 1000);
    });
}
//# sourceMappingURL=user-interface.js.map