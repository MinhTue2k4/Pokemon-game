import type { HeroApi, HeroCard } from './api.js';

export interface GameState {
    all_Heroes_Data: HeroApi[];
    heroes_Data_In_Use: HeroCard[];
    render(...)...//hmm..???
}

export const game: GameState = {
    all_Heroes_Data: [],
    heroes_Data_In_Use: [],
    render: function (conTainer: HTMLDivElement) {
        // pick hero phase
        this.all_Heroes_Data.sort(() => Math.random() - 0.5);
        const random10Heroes = this.all_Heroes_Data.slice(0, 10);
        this.heroes_Data_In_Use = random10Heroes.map(hero => {
            return {
                name: hero.localized_name,
                image: 'https://cdn.steamstatic.com' + hero.img,
            };
        });

        // x2 array of hero  
        let double_the_Heroes = this.heroes_Data_In_Use.concat(this.heroes_Data_In_Use);
        
        // random -50 to 50%
        double_the_Heroes.sort(function () {
            return Math.random() - 0.5;
        });

        const htmls = double_the_Heroes.map(defineHero);
        function defineHero(hero: HeroCard) {
            return `
                <div class="cards">
                    <img src="./assets/cover.jpg" class="cover">
                    <img src="${hero.image}" class="hero">
                </div>
            `;
        }

        conTainer.innerHTML = `<div class="row"> ${htmls.join('')} </div>`;
    }
};