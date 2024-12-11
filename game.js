import { drawGrass } from './grass.js';
import { move, drawCharacter, growSeeds, character } from './character.js';
import { drawGround } from './ground.js';
import { drawInventory, inventory } from './inventory.js';
import { drawCrop } from './crops.js';
import { keyboardActions } from './keyboard.js';
import { drawUI, ingameUiLocation } from './ui.js';
import { shopIcon, drawShop } from './shop.js';

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
let iswheatbuy = false;
let isbeatbuy = false;
const shopDoc = document.getElementById('shop');

canvas.addEventListener('mousedown', (e) => {
    const x = e.clientX - canvas.getBoundingClientRect().left;
    const y = e.clientY - canvas.getBoundingClientRect().top;
    if (x > ingameUiLocation(canvas).shop_ui[0] && x < ingameUiLocation(canvas).shop_ui[0] + ingameUiLocation(canvas).shop_ui[2] && y > ingameUiLocation(canvas).shop_ui[1] && y < ingameUiLocation(canvas).shop_ui[1] + ingameUiLocation(canvas).shop_ui[3]) {
        isShopClicked = !isShopClicked;
    }
    if (x> 480 && x < 480 + shopIcon.buyUnclick[2] && y > 234 && y < 234 + shopIcon.buyUnclick[3]*2) {
        iswheatbuy = true;
        character.coin -= 1;
        inventory.wheat += 1;
    }
    if (x> 480 && x < 480 + shopIcon.buyUnclick[2] && y > 234 + 253-95 && y < 234 + 253-95 + shopIcon.buyUnclick[3]*2) {
        isbeatbuy = true;
        character.coin -= 2;
        inventory.beat += 1;
    }
});

canvas.addEventListener('mouseup', (e) => {
    iswheatbuy = false;
    isbeatbuy = false;
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
    if(isShopClicked) {
        ctx.drawImage(shopIcon.img, ...shopIcon.shopClick, 10 + ingameUiLocation(canvas).coin_ui[2] + 10, 12, (795-772)*3, (124-99)*3);
        drawShop({ctx, canvas});
        if (iswheatbuy) {
            ctx.drawImage(shopIcon.img, ...shopIcon.buyClick, 480, 234, shopIcon.buyClick[2], shopIcon.buyClick[3]*2);
        }
        else{
            ctx.drawImage(shopIcon.img, ...shopIcon.buyUnclick, 480, 234, shopIcon.buyUnclick[2], shopIcon.buyUnclick[3]*2);
        }
        if (isbeatbuy) {
            ctx.drawImage(shopIcon.img, ...shopIcon.buyClick, 480, 234 + 253-95, shopIcon.buyClick[2], shopIcon.buyClick[3]*2);
        }
        else{
            ctx.drawImage(shopIcon.img, ...shopIcon.buyUnclick, 480, 234 + 253-95, shopIcon.buyUnclick[2], shopIcon.buyUnclick[3]*2);
        }
        ctx.font = "30px uifont";
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillText("Buy", 480 + 23, 234 + 39);
        ctx.fillText("Buy", 480 + 23, 234 + 39 + 253-95);

    }
    else {
        ctx.drawImage(shopIcon.img, ...shopIcon.shopUnclick, 10 + ingameUiLocation(canvas).coin_ui[2] + 10, 10, (795-772)*3, (124-99)*3);
    }
}

export const getLastWidthIndex = () => Math.floor((canvas.width - 88) / 68);
export const getLastHeightIndex = () => Math.floor((canvas.height - 88) / 68);

init();
