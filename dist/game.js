export const game = {
    all_Heroes_Data: [],
    heroes_Data_In_Use: [],
    createDeck: function () {
        // pick all random heroes
        const shuffledAllHeroes = [...this.all_Heroes_Data].sort(() => Math.random() - 0.5);
        // pick 10 random heroes
        const random10Heroes = shuffledAllHeroes.slice(0, 10);
        this.heroes_Data_In_Use = random10Heroes.map((hero) => {
            return {
                name: hero.localized_name,
                image: 'https://cdn.steamstatic.com' + hero.img,
            };
        });
        // x2 vitamin C  
        const doubleTheHeroes = this.heroes_Data_In_Use.concat(this.heroes_Data_In_Use);
        // Xáo lần cuối cùng
        // doubleTheHeroes.sort(() => Math.random() - 0.5);
        return doubleTheHeroes;
    },
};
//# sourceMappingURL=game.js.map