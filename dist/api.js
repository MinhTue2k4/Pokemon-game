export async function fetchHeroesData() {
    const response = await fetch('https://api.opendota.com/api/heroStats');
    if (!response.ok) {
        throw new Error("CAN'T GET DATA");
    }
    const data = await response.json();
    return data;
}
//# sourceMappingURL=api.js.map