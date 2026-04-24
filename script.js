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
        //-50 to 50% 
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
        the1 = null;
        the2 = null;

        let timerID = null;
        matchedCards = 0;
        totalPairs = this.heroes.length;

        const cards = document.getElementsByClassName("cards")
        for (let card of cards) {
            card.addEventListener("click", function () {
                if (this === the1 || the1 !== null && the2 !== null) {
                    return;
                }
                this.classList.add('open-focus')
                if (the1 === null) {
                    the1 = this;
                } else {
                    the2 = this;
                    checkCardStatus(the1, the2);
                    setTimeout(function () {
                        the1 = null;
                        the2 = null;
                    }, 500)
                }
            })
        }
        function checkCardStatus(img1, img2) {
            let heroImg1 = img1.querySelector('.hero')
            let heroImg2 = img2.querySelector('.hero')

            let heroThe1 = heroImg1.getAttribute('src')
            let heroThe2 = heroImg2.getAttribute('src')

            if (heroThe1 === heroThe2) {
                matchedCards++;
                if (matchedCards == totalPairs) {
                    clearInterval(timerID)
                    setTimeout(()=>{
                        alert('Winner!')
                    }, 500)
                }
            } else {
                setTimeout(function () {
                    img1.classList.remove('open-focus');
                    img2.classList.remove('open-focus');
                }, 800);
            }
        }
        //Time bar 
        btnStart.addEventListener("click", function () {
            conTainer.style.opacity = '100'
            let timeLeft = 60
            clearInterval(timerID)

            timerID = setInterval(() => {
                timeLeft--
                countdownBar.style.width = (timeLeft / 60) * 100 + '%'

                if (timeLeft <= 0) {
                    clearInterval(timerID)
                    alert('gg')
                }
            }, 1000);
        })
    },
    start: function () {
        this.render()
        this.handleEvents()
    }
}
app.start()
