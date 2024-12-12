import { character } from './character.js';
import { inventory } from './inventory.js';
import { drawBeatClicked, drawShopClicked, drawWheatClicked,
    drawBeatUnclick, drawWheatUnclick, drawShopUnclick,
    drawShop, isShopOpen, shopIcon } from './shop.js';
import { Mouse } from './System.js';
import { ingameUiLocation } from './ui.js';

export const registerMouseActions = (mouse, draw) => {
    mouse.register({
        condition: (x,y) => true,
        up: () => {
            if(isShopOpen.value){
                draw.unRegister(drawWheatClicked);
                draw.unRegister(drawBeatClicked);
                draw.register(drawWheatUnclick);
                draw.register(drawBeatUnclick);
                return;
            }
            draw.unRegister(drawShopClicked);
            draw.register(drawShopUnclick);
        }
    });
    mouse.register({
        condition: (x,y) => Mouse.isInRect(x, y, ingameUiLocation(draw.canvas).shop_ui),
        down: () => {
            if(isShopOpen.value) return;
            draw.register(drawShopClicked)
            draw.unRegister(drawShopUnclick);
        },
        click: () => {
            if(isShopOpen.value) {
                draw.unRegister(drawShop);
                draw.unRegister(drawShopClicked);
                draw.unRegister(drawWheatUnclick);
                draw.unRegister(drawBeatUnclick);
                draw.register(drawShopUnclick);
                isShopOpen.value = false;
                return;
            }
            draw.register(drawShop);
            draw.register(drawBeatUnclick);
            draw.register(drawWheatUnclick);
            draw.register(drawShopClicked);
            draw.unRegister(drawShopUnclick);
            isShopOpen.value = true;
        }
    });
    mouse.register({
        condition: (x,y) => Mouse.isInRect(x, y, [480, 234, shopIcon.buyUnclick[2],shopIcon.buyUnclick[3]*2]) && isShopOpen.value,
        down: () => {
            draw.register(drawWheatClicked);
            draw.unRegister(drawWheatUnclick);
        },
        click: () => {
            if(character.coin < 1) return;
            character.coin -= 1;
            inventory.wheat += 1;
        }
    });
    mouse.register({
        condition: (x,y) => Mouse.isInRect(x, y, [480, 234 + 253-95, shopIcon.buyUnclick[2],shopIcon.buyUnclick[3]*2]) && isShopOpen.value,
        down: () => {
            draw.register(drawBeatClicked);
            draw.unRegister(drawBeatUnclick);
        },
        click: () => {
            if(character.coin < 2) return;
            character.coin -= 2;
            inventory.beat += 1;
        }
    });
}
