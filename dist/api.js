export async function fetchHeroesData() {
    try {
        const response = await fetch('https://api.opendota.com/api/heroStats');
        if (!response.ok) {
            throw new Error("CAN'T GET DATA");
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("Error:", error);
        alert("Network error");
        return [];
    }
}
//# sourceMappingURL=api.js.map