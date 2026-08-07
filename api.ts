export interface HeroCard {
    name: string;
    image: string;
}

export interface HeroApi {
    localized_name: string;
    img: string;
}

export async function fetchHeroesData(): Promise<HeroApi[]> {
    try {
        const response = await fetch('https://api.opendota.com/api/heroStats');

        if (!response.ok) {
            throw new Error("CAN'T GET DATA");
        }

        const data: HeroApi[] = await response.json();
        return data;
    } catch (error) {
        console.log("Error:", error);
        alert("Network error");
        return [];
    }
}