import { crop } from "./crops.js";
const inventoryimg = new Image();
inventoryimg.src = './img/emojis-free/emoji style ui/inventory_Light_example_with_slots.png';

export const inventory = {
    img: inventoryimg,
    inventory_index: 0,
    inventory: [3, 1, 343, 92],
    wheat: 10,
    beat: 10
}

export function drawInventory({ctx, canvas}) {
    ctx.drawImage(inventory.img, ...inventory.inventory, 10, canvas.height-184, 686, 184);
    ctx.drawImage(crop.img, ...crop.wheat_pack, 34, canvas.height-115, 58, 58);
    ctx.drawImage(crop.img, ...crop.beat_pack, 34+96, canvas.height-115, 58, 58);
    ctx.fillStyle = "rgba(255, 100, 40, 0.25)";
    ctx.fillRect(34+96*inventory.inventory_index, canvas.height-115, 64, 64);
    ctx.font = "20px uifont";
    ctx.fillStyle = "rgba(144, 98, 93, 0.8)";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeText(1, 34, canvas.height-100);
    ctx.fillText(1, 34, canvas.height-100);
    ctx.strokeText(2, 34+96, canvas.height-100);
    ctx.fillText(2, 34+96, canvas.height-100);
    ctx.fillText(inventory.wheat, 97-10*inventory.wheat.toString().length, canvas.height-20);
    ctx.fillText(inventory.beat, 97-10*inventory.beat.toString().length + 96, canvas.height-20);
}
