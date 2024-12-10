import { inventory } from "./inventory.js";
import { ingameUiLocation } from "./ui.js";

const shopimg = new Image();
shopimg.src = './img/Sprite sheets/Sprite sheet for Basic Pack.png';
export const shop = {
    img: shopimg,
    shopUnclick: [772, 99, 795-772, 124-99],
    shopClick: [804, 101, 827-804, 124-101]
}

export function drawShop({ctx, canvas}) {
    ctx.drawImage(shop.img, ...shop.shopUnclick, 10 + ingameUiLocation(canvas).coin_ui[2] + 10, 10, (795-772)*3, (124-99)*3);
    //ctx.drawImage(shop.img, ...shop.shopClick, 10 + ingameUiLocation(canvas).coin_ui[2] + 10, 12, (795-772)*3, (124-99)*3);
    ctx.font = "30px uifont";
}
