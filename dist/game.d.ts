import type { HeroApi, HeroCard } from './api.js';
export interface GameState {
    all_Heroes_Data: HeroApi[];
    heroes_Data_In_Use: HeroCard[];
    createDeck(): HeroCard[];
}
export declare const game: GameState;
//# sourceMappingURL=game.d.ts.map