import { game } from './game.js';

const $$ = document.querySelectorAll.bind(document);

const conTainer = document.querySelector<HTMLDivElement>('.cards-container');
const btnStart = document.querySelector<HTMLButtonElement>('.btn-start');
const countdownBar = document.querySelector<HTMLDivElement>('.countdown-bar');

if (!conTainer) throw new Error(".cards-container not found");
if (!btnStart) throw new Error(".btn-start not found");
if (!countdownBar) throw new Error(".countdown-bar not found");

    export function handleEvents() {
        let the1: HTMLDivElement | null = null;
        let the2: HTMLDivElement | null = null;
        let timerID: number;
        let matchedCards = 0;
        let totalPairs = game.heroes_Data_In_Use.length;

        function setupCardConditions() {
            const cards = document.getElementsByClassName("cards")
            for (let card of cards) {
                card.addEventListener("click", function (this: HTMLDivElement) {
                    if (this === the1 || the1 !== null && the2 !== null) {
                        return;
                    }
                    this.classList.add('flipped-card')
                    if (the1 === null) {
                        the1 = this;
                    }
                    else {
                        the2 = this;
                        checkCardStatus(the1, the2);
                        setTimeout(function () {
                            the1 = null;
                            the2 = null;
                        }, 500)
                    }
                })
            }
        }

        function checkCardStatus(img1: HTMLDivElement, img2: HTMLDivElement) {
            let heroImg1 = img1.querySelector('.hero')?.getAttribute('src')
            let heroImg2 = img2.querySelector('.hero')?.getAttribute('src')
            // match card 
            if (heroImg1 === heroImg2) {
                matchedCards++
                setTimeout(() => {
                    img1.classList.add('match-card')
                    img2.classList.add('match-card')
                }, 600)
                //THẮNG  
                if (matchedCards == totalPairs) {
                    clearInterval(timerID)
                    btnStart!.classList.add('is-blinking');
                    btnStart!.disabled = false
                    setTimeout(() => {
                        alert('Winner!')
                    }, 500)
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
        btnStart!.addEventListener("click", function () {
            btnStart!.classList.remove('is-blinking')
            btnStart!.disabled = true
            conTainer!.classList.add('is-playing');

            let timeLeft = 60;
            matchedCards = 0;
            clearInterval(timerID);

            game.render();
            setupCardConditions();

            timerID = setInterval(() => {
                timeLeft--;
                countdownBar!.style.width = (timeLeft / 60) * 100 + '%';
                //THUA  
                if (timeLeft <= 0) {
                    clearInterval(timerID);
                    const allCards = $$('.cards');
                    allCards.forEach((card) => {
                        card.classList.add('is-locked')
                    })
                    btnStart!.classList.add('is-blinking');
                    btnStart!.disabled = false;
                    setTimeout(() => {
                        alert('Thua rồi!');
                        conTainer!.classList.add('transit-animation');
                        conTainer!.classList.remove('is-playing');
                    }, 500);
                }
            }, 1000);
        });
    }