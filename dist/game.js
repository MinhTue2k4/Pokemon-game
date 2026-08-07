render: function () {
    // pick hero phase
    this.all_Heroes_Data.sort(() => Math.random() - 0.5);
    const random10Heroes = this.all_Heroes_Data.slice(0, 10);
    this.heroes_Data_In_Use = random10Heroes.map(hero => {
        return {
            name: hero.localized_name,
            image: 'https://cdn.steamstatic.com' + hero.img,
        };
    });
    //x2 array of hero  
    let double_the_Heroes = this.heroes_Data_In_Use.concat(this.heroes_Data_In_Use);
    // random -50 to 50%
    double_the_Heroes.sort(function () {
        return Math.random() - 0.5;
    });
    const htmls = double_the_Heroes.map(defineHero);
    function defineHero(hero) {
        return `
                <div class="cards">
                    <img src="./assets/cover.jpg" class="cover">
                    <img src="${hero.image}" class="hero">
                </div>
            `;
    }
    conTainer.innerHTML = `<div class="row"> ${htmls.join('')} </div>`;
}
handleEvents: function () {
    let the1 = null;
    let the2 = null;
    let timerID;
    let matchedCards = 0;
    let totalPairs = this.heroes_Data_In_Use.length;
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
}
export {};
//# sourceMappingURL=game.js.map