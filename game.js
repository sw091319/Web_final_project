import { drawGrass } from './grass.js';
import { move, drawCharacter, growSeeds } from './character.js';
import { drawGround } from './ground.js';
import { drawInventory } from './inventory.js';
import { drawCrop } from './crops.js';
import { keyboardActions } from './keyboard.js';
import { drawUI } from './ui.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight
    - document.getElementsByTagName('header')[0].clientHeight - 15;
}

window.addEventListener('resize', resize);
window.addEventListener('keydown', (e) => {
    keyboardActions.forEach(action => {
        if(e.key === action.key) {
            action.down();
        }
    });
});

window.addEventListener('keyup', (e) => {
    keyboardActions.forEach(action => {
        if(e.key === action.key) {
            action.up?.();
        }
    });
});

function init() {
    resize();
    window.setInterval(drawGame, 1000 / 60);
    window.setInterval(move(canvas), 1000 / 60);
    window.setInterval(growSeeds, 1000 / 60);
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrass({ctx, canvas});
    drawGround({ctx});
    drawInventory({ctx, canvas});
    drawUI({ctx});
    drawCrop({ctx});
    drawCharacter({ctx});
}

export const getLastWidthIndex = () => Math.floor((canvas.width - 88) / 68);
export const getLastHeightIndex = () => Math.floor((canvas.height - 88) / 68);

init();
