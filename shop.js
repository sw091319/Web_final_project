import { crop } from "./crops.js";
import { ingameUiLocation } from "./ui.js";

const shopimg = new Image();
shopimg.src = './img/Sprite sheets/Sprite sheet for Basic Pack.png';
export const shopIcon = {
    img: shopimg,
    shopUnclick: [772, 99, 795-772, 124-99],
    shopClick: [804, 101, 827-804, 124-101],
    coin : [627, 97, 636 - 627, 110 - 97],
    buyUnclick: [162, 177, 253-162, 205-177],
    buyClick: [259, 179, 349-259, 205 - 179]
}
export const isShopOpen = {value: false};

const shopBackgroundimg = new Image();
shopBackgroundimg.src = './img/Sprite sheets/Setting menu.png';
const shopDialogimg = new Image();
shopDialogimg.src = './img/Sprite sheets/Dialogue UI/Premade dialog box small.png';
const shopEmojiimg = new Image();
shopEmojiimg.src = './img/Sprite sheets/Dialogue UI/Emotes/Teemo Basic emote animations sprite sheet.png';

export const shopBackground = {
    backgroundimg: shopBackgroundimg,
    background: [138, 12, 245-138, 134-12],
    dialogimg: shopDialogimg,
    dialog: [2, 1, 173-2, 62-1],
    emojiimg: shopEmojiimg,
    emoji: [4, 33, 28-4, 64-33]

}

export function drawShop({ctx, canvas}) {
    ctx.drawImage(shopBackground.backgroundimg, ...shopBackground.background, ingameUiLocation(canvas).shop_ui[0], ingameUiLocation(canvas).shop_ui[1] + ingameUiLocation(canvas).shop_ui[3] + 20 , shopBackground.background[2]*4, shopBackground.background[3]*4.5);

    //Shop Text
    ctx.font = "40px uifont";
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillText("Shop", ingameUiLocation(canvas).shop_ui[0] + 175, ingameUiLocation(canvas).shop_ui[1] + ingameUiLocation(canvas).shop_ui[3] + 80);

    //wheatPack
    ctx.drawImage(shopBackground.dialogimg, ...shopBackground.dialog, ingameUiLocation(canvas).shop_ui[0] + 15, ingameUiLocation(canvas).shop_ui[1] + ingameUiLocation(canvas).shop_ui[3] + 95, shopBackground.dialog[2]*2.35, shopBackground.dialog[3]*2.35);
    ctx.drawImage(crop.img, ...crop.wheat_pack, ingameUiLocation(canvas).shop_ui[0] + 51, 214, crop.wheat_pack[2]*5, crop.wheat_pack[3]*5);
    ctx.drawImage(shopIcon.img, ...shopIcon.coin, 350, 242, shopIcon.coin[2]*3, shopIcon.coin[3]*3);
    ctx.fillText(1, 350 + 40, 242 + 35)

    //beatPack
    ctx.drawImage(shopBackground.dialogimg, ...shopBackground.dialog, ingameUiLocation(canvas).shop_ui[0] + 15, ingameUiLocation(canvas).shop_ui[1] + ingameUiLocation(canvas).shop_ui[3] + 253, shopBackground.dialog[2]*2.35, shopBackground.dialog[3]*2.35);
    ctx.drawImage(crop.img, ...crop.beat_pack, ingameUiLocation(canvas).shop_ui[0] + 51, 214 + 253-95, crop.beat_pack[2]*5, crop.beat_pack[3]*5);
    ctx.drawImage(shopIcon.img, ...shopIcon.coin, 350, 242 + 253-95, shopIcon.coin[2]*3, shopIcon.coin[3]*3);
    ctx.fillText(2, 350 + 40, 242 + 253-95 + 35)

    //Dialog
    ctx.drawImage(shopBackground.dialogimg, ...shopBackground.dialog, ingameUiLocation(canvas).shop_ui[0] + 15, 495, shopBackground.dialog[2]*2.35, shopBackground.dialog[3]*2.35);
    ctx.drawImage(shopBackground.emojiimg, ...shopBackground.emoji, ingameUiLocation(canvas).shop_ui[0] + 15 + 13*2.35, 495 + 13*2.35, shopBackground.emoji[2]*3.2, shopBackground.emoji[3]*2.5);
    ctx.font = "30px uifont";
    ctx.fillText("Comming Soon...", 360, 590)
}

export function drawShopClicked({ctx, canvas}) {
    ctx.drawImage(shopIcon.img, ...shopIcon.shopClick, 10 + ingameUiLocation(canvas).coin_ui[2] + 10, 12, (795-772)*3, (124-99)*3);
}

export function drawShopUnclick({ctx, canvas}) {
    ctx.drawImage(shopIcon.img, ...shopIcon.shopUnclick, 10 + ingameUiLocation(canvas).coin_ui[2] + 10, 10, (795-772)*3, (124-99)*3);
}

export function drawWheatClicked({ctx, canvas}) {
    ctx.drawImage(shopIcon.img, ...shopIcon.buyClick, 480, 234, shopIcon.buyClick[2], shopIcon.buyClick[3]*2);
    ctx.font = "30px uifont";
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillText("Buy", 480 + 23, 234 + 39);
}

export function drawBeatClicked({ctx, canvas}) {
    ctx.drawImage(shopIcon.img, ...shopIcon.buyClick, 480, 234 + 253-95, shopIcon.buyClick[2], shopIcon.buyClick[3]*2);
    ctx.font = "30px uifont";
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillText("Buy", 480 + 23, 234 + 39 + 253-95);
}

export function drawWheatUnclick({ctx, canvas}) {
    ctx.drawImage(shopIcon.img, ...shopIcon.buyUnclick, 480, 234, shopIcon.buyUnclick[2], shopIcon.buyUnclick[3]*2);
    ctx.font = "30px uifont";
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillText("Buy", 480 + 23, 234 + 39);
}

export function drawBeatUnclick({ctx, canvas}) {
    ctx.drawImage(shopIcon.img, ...shopIcon.buyUnclick, 480, 234 + 253-95, shopIcon.buyUnclick[2], shopIcon.buyUnclick[3]*2);
    ctx.font = "30px uifont";
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillText("Buy", 480 + 23, 234 + 39 + 253-95);
}
