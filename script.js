// - Time bar 
//      Time start: Click vào cards 
//      Time End: Game over 
// - Cards:  flipped (2) 
//      True: opacity 100% => flipped more 
// 	-> all TRUE == WIN: Game over (win)
// False: reset last index 

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const timeBar = $('.timer-bar')
const conTainer = $('.container')

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
        //x2 rows 
        let double_the_Heroes = this.heroes.concat(this.heroes);
        // sort() + random() ??
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
        //click vào card và giữ mở
        the1 = null;
        the2 = null;
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
                    the1 = null;
                    the2 = null;
                }
            })
        }
        function checkCardStatus(img1, img2) {
            let heroImg1 = img1.querySelector('.hero')
            let heroImg2 = img2.querySelector('.hero')

            let heroThe1 = heroImg1.getAttribute('src')
            let heroThe2 = heroImg2.getAttribute('src')

            if (heroThe1 === heroThe2) {
                // alert('OK');
            } else {
                // alert('NO');

                setTimeout(function () {
                    img1.classList.remove('open-focus');
                    img2.classList.remove('open-focus');
                }, 800);
            }
        }
    },
    start: function () {
        this.render()
        this.handleEvents()
    }
}
app.start()
