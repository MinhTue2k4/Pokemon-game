export interface HeroCard {
    name: string;
    image: string;
}
export interface HeroApi {
    localized_name: string;
    img: string;
}
export declare function fetchHeroesData(): Promise<HeroApi[]>;
//# sourceMappingURL=api.d.ts.map