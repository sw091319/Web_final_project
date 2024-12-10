import { character } from './character.js';
import { inventory } from './inventory.js';
import { getLastWidthIndex, getLastHeightIndex } from './game.js';
import { getCropLevel } from './crops.js';

export const keyboardActions = [
    {
        key: 'w',
        down: () => {
            character.up = true;
        },
        up: () => {
            character.up = false;
            character.laststate = "back";
        }
    },
    {
        key: 'a',
        down: () => {
            character.left = true;
        },
        up: () => {
            character.left = false;
            character.laststate = "left";
        }
    },
    {
        key: 's',
        down: () => {
            character.down = true;
        },
        up: () => {
            character.down = false;
            character.laststate = "front";
        }
    },
    {
        key: 'd',
        down: () => {
            character.right = true;
        },
        up: () => {
            character.right = false;
            character.laststate = "right";
        }
    },
    {
        key: ' ',
        down: () => {
            const lastWidthIndex = getLastWidthIndex();
            const lastHeightIndex = getLastHeightIndex();
            const characterWidthIndex = Math.floor((character.x + 34) / 68);
            const characterHeightIndex = Math.floor((character.y + 68) / 68);
            if (characterWidthIndex < 13 || characterWidthIndex > lastWidthIndex || characterHeightIndex < 1 || characterHeightIndex > lastHeightIndex) return;
            if (character.seeds.some(seed => seed.x === characterWidthIndex && seed.y === characterHeightIndex)) {
                const seed = character.seeds.find(seed => seed.x === characterWidthIndex && seed.y === characterHeightIndex);
                if (getCropLevel(seed.type, seed.grow) !== "full") return;
                character.seeds = character.seeds.filter(seed => seed.x !== characterWidthIndex || seed.y !== characterHeightIndex);
                return;
            }
            if(inventory.inventory_number === 1) {
                character.seeds.push({x: characterWidthIndex, y: characterHeightIndex, type: "wheat", grow: 0});
            }
            if(inventory.inventory_number === 2) {
                character.seeds.push({x: characterWidthIndex, y: characterHeightIndex, type: "beat", grow: 0});
            }
        }
    },
    {
        key: '1',
        down: () => {
            inventory.inventory_number = 1;
        }
    },
    {
        key: '2',
        down: () => {
            inventory.inventory_number = 2;
        }
    }
]
