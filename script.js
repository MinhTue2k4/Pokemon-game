const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const conTainer = $('.cards-container')
const timerDiv = $('.timer-div')
const btnStart = $('.btn-start')
const countdownBar = $('.countdown-bar')
const app = {
    heroes: [
        { name: "Abaddon", image: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/abaddon.png" },
        { name: "Alchemist", image: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/alchemist.png" },
        { name: "Ancient_Apparition", image: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/ancient_apparition.png" },
        { name: "Antimage", image: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png" },
        { name: "Arc_Warden", image: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/arc_warden.png" },
        { name: "Axe", image: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/axe.png" },
        { name: "Dazzle", image: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/dazzle.png" },
        { name: "Kez", image: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/kez.png" },
        { name: "Huskar", image: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/huskar.png" },
        { name: "Sven", image: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/sven.png" },
    ],
    render: function () {
        //x2 array 
        let double_the_Heroes = this.heroes.concat(this.heroes);
        // -50 to 50%
        double_the_Heroes.sort(function () {
            return Math.random() - 0.5;
        });
        const htmls = double_the_Heroes.map(hero => {
            return `
                <div class="cards">
                    <img src="https://yt3.googleusercontent.com/ytc/AIdro_lWrxG_fpbnTzQokp3OGudXc5dgZtHPFYm5LyC6kWRZT5g=s900-c-k-c0x00ffffff-no-rj" 
                        class="cover">
                    <img src="${hero.image}" class="hero">
                </div>
            `
        })
        conTainer.innerHTML = `<div class="row"> ${htmls.join('')} </div>`;
    },
    handleEvents: function () {
        the1 = the2 = null;
        timerID = null;
        matchedCards = 0;
        totalPairs = this.heroes.length;

        function setupCardConditions() {
            const cards = document.getElementsByClassName("cards")
            for (let card of cards) {
                card.addEventListener("click", function () {
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

        function checkCardStatus(img1, img2) {
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
                    btnStart.classList.add('is-blinking');
                    btnStart.disabled = false
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
        btnStart.addEventListener("click", function () {
            btnStart.classList.remove('is-blinking')
            btnStart.disabled = true
            conTainer.classList.add('is-playing');

            let timeLeft = 60;
            matchedCards = 0;
            clearInterval(timerID);

            app.render();
            setupCardConditions();  

            timerID = setInterval(() => {
                timeLeft--;
                countdownBar.style.width = (timeLeft / 60) * 100 + '%';
                //THUA  
                if (timeLeft <= 0) {
                    clearInterval(timerID);
                    const allCards = $$('.cards');
                    allCards.forEach((card) => {
                        card.classList.add('is-locked')
                    })
                    btnStart.classList.add('is-blinking');
                    btnStart.disabled = false;
                    setTimeout(() => {
                        alert('Thua rồi!');
                        conTainer.classList.add('transit-animation');
                        conTainer.classList.remove('is-playing');
                    }, 500);
                }
            }, 1000);
        });
    },
    start: function () {
        this.render()
        this.handleEvents()
    }
}
app.start()


