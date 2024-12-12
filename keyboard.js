import { character } from './character.js';
import { inventory } from './inventory.js';
import { getLastWidthIndex, getLastHeightIndex } from './utils.js';
import { getCropLevel } from './crops.js';

export const registerKeyboardActions = (keyboard, draw) => {
    keyboard.register('w',()=>true,()=>character.up = true,()=>character.up = false);
    keyboard.register('a',()=>true,()=>character.left = true,()=>character.left = false);
    keyboard.register('s',()=>true,()=>character.down = true,()=>character.down = false);
    keyboard.register('d',()=>true,()=>character.right = true,()=>character.right = false);
    keyboard.register('1',()=>true,()=>inventory.inventory_index = 0);
    keyboard.register('2',()=>true,()=>inventory.inventory_index = 1);

    const isCharacterInFarm = () => {
        const lastWidthIndex = getLastWidthIndex(draw.canvas);
        const lastHeightIndex = getLastHeightIndex(draw.canvas);
        const characterWidthIndex = Math.floor((character.x + 34) / 68);
        const characterHeightIndex = Math.floor((character.y + 68) / 68);
        if(characterWidthIndex < 13 || characterWidthIndex > lastWidthIndex) return false;
        if(characterHeightIndex < 1 || characterHeightIndex > lastHeightIndex) return false;
        return true;
    }
    const getSeed = () => {
        const characterWidthIndex = Math.floor((character.x + 34) / 68);
        const characterHeightIndex = Math.floor((character.y + 68) / 68);
        return character.seeds.find(seed => seed.x === characterWidthIndex && seed.y === characterHeightIndex);
    }
    keyboard.register({
        key: ' ',
        condition: () => {
            if(!isCharacterInFarm()) return false;
            const seed = getSeed();
            if(!seed) return false;
            return getCropLevel(seed.type, seed.grow) === "full"
        },
        down: () => {
            const seed = getSeed();
            character.seeds = character.seeds.filter(item => item !== seed);
            if(seed.type === "wheat") return character.coin += 2;
            if(seed.type === "beat") return character.coin += 5;
        },
    });

    keyboard.register({
        key: ' ',
        condition: () => {
            if(!isCharacterInFarm()) return false;
            if(getSeed()) return false;
            return inventory.inventory_index === 0 && inventory.wheat > 0;
        },
        down: () => {
            const characterWidthIndex = Math.floor((character.x + 34) / 68);
            const characterHeightIndex = Math.floor((character.y + 68) / 68);
            character.seeds.push({x: characterWidthIndex, y: characterHeightIndex, type: "wheat", grow: 0});
            inventory.wheat--;
        }
    });

    keyboard.register({
        key: ' ',
        condition: () => {
            if(!isCharacterInFarm()) return false;
            if(getSeed()) return false;
            return inventory.inventory_index === 1 && inventory.beat > 0;
        },
        down: () => {
            const characterWidthIndex = Math.floor((character.x + 34) / 68);
            const characterHeightIndex = Math.floor((character.y + 68) / 68);
            character.seeds.push({x: characterWidthIndex, y: characterHeightIndex, type: "beat", grow: 0});
            inventory.beat--;
        }
    });
}
