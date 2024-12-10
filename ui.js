const uiimg = new Image();
uiimg.src = './img/Sprite sheets/Sprite sheet for Basic Pack.png';
export const ui = {
    img: uiimg,
    coin: [599, 155, 36, 18]
}

export function drawUI({ctx}) {
    ctx.drawImage(ui.img, ...ui.coin, 10, 10, 36*4.5, 18*4.5);
    ctx.font = "50px uifont";
    ctx.fillSytle = "rgba(0, 0, 0, 1)";
    ctx.fillText("100", 75, 65);

}
