import { drawGrass } from './grass.js';
import { move, drawCharacter, growSeeds } from './character.js';
import { drawGround } from './ground.js';
import { drawInventory } from './inventory.js';
import { drawCrop } from './crops.js';
import { keyboardActions } from './keyboard.js';
import { drawUI, ingameUiLocation } from './ui.js';
import { shop, drawShop } from './shop.js';

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

let isShopClicked = false;
let shopOpen = false;
canvas.addEventListener('mousedown', (e) => {
    const x = e.clientX - canvas.getBoundingClientRect().left;
    const y = e.clientY - canvas.getBoundingClientRect().top;
    if (x > ingameUiLocation(canvas).shop_ui[0] && x < ingameUiLocation(canvas).shop_ui[0] + ingameUiLocation(canvas).shop_ui[2] && y > ingameUiLocation(canvas).shop_ui[1] && y < ingameUiLocation(canvas).shop_ui[1] + ingameUiLocation(canvas).shop_ui[3]) {
        isShopClicked = true;
        shopOpen = true;
    }
});
canvas.addEventListener('mouseup', (e) => {
    isShopClicked = false;
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
    //drawShop({ctx, canvas});
    if(isShopClicked) {
        ctx.drawImage(shop.img, ...shop.shopClick, 10 + ingameUiLocation(canvas).coin_ui[2] + 10, 12, (795-772)*3, (124-99)*3);
    }
    else {
        ctx.drawImage(shop.img, ...shop.shopUnclick, 10 + ingameUiLocation(canvas).coin_ui[2] + 10, 10, (795-772)*3, (124-99)*3);
    }
    drawCrop({ctx});
    drawCharacter({ctx});
}

export const getLastWidthIndex = () => Math.floor((canvas.width - 88) / 68);
export const getLastHeightIndex = () => Math.floor((canvas.height - 88) / 68);

init();
