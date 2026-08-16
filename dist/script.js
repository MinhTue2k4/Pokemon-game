import { fetchHeroesData } from './api.js';
import { game } from './game.js';
import { handleEvents, showGameMessage } from './user-interface.js';
async function start() {
    try {
        const data = await fetchHeroesData();
        game.all_Heroes_Data = data;
        handleEvents();
    }
    catch (error) {
        console.error(error);
        showGameMessage("Unable to download game's data. Please check your Internet connection and reload page");
    }
}
start();
//# sourceMappingURL=script.js.map