import { character } from "./character.js";
const uiimg = new Image();
uiimg.src = './img/Sprite sheets/Sprite sheet for Basic Pack.png';
export const ui = {
    img: uiimg,
    coin: [599, 155, 36, 18]
}

export const ingameUiLocation = (canvas) => ({
    inventory_ui : [10, canvas.height-184, 686, 184],
    coin_ui : [10, 10, 36*4.5, 18*4.5,],
    shop_ui : [10 + 36*4.5 + 10, 10, (795-772)*3, (124-99)*3]
});

export function drawUI({ctx}) {
    ctx.drawImage(ui.img, ...ui.coin, 10, 10, 36*4.5, 18*4.5);
    ctx.font = "50px uifont";
    ctx.fillStyle = "rgba(144, 98, 93, 0.8)";
    ctx.fillText(character.coin, 75, 65);

}
