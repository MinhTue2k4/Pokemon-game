import { fetchHeroesData } from './api.js';
import { game } from './game.js';
import { handleEvents } from './user-interface.js';
async function start() {
    try {
        const data = await fetchHeroesData();
        game.all_Heroes_Data = data;
        handleEvents();
    }
    catch (error) {
        console.error('Failed to start game:', error);
    }
}
start();
//# sourceMappingURL=script.js.map