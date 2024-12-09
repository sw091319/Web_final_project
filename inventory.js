import { crop } from "./crops.js";
const inventoryimg = new Image();
inventoryimg.src = './img/emojis-free/emoji style ui/inventory_Light_example_with_slots.png';

export const inventory = {
    img: inventoryimg,
    inventory_number: 1,
    inventory: [3, 1, 343, 92]
}

export function drawInventory({ctx, canvas}) {
    ctx.drawImage(inventory.img, ...inventory.inventory, 10, canvas.height-184, 686, 184);
    ctx.drawImage(crop.img, ...crop.wheat_pack, 34, canvas.height-115, 58, 58);
    ctx.drawImage(crop.img, ...crop.beat_pack, 34+96, canvas.height-115, 58, 58);
    switch(inventory.inventory_number) {
        case 1:
            ctx.fillStyle = "rgba(255, 100, 40, 0.25)";
            ctx.fillRect(34, canvas.height-115, 64, 64);
            break;
        case 2:
            ctx.fillStyle = "rgba(255, 100, 40, 0.25)";
            ctx.fillRect(34+96, canvas.height-115, 64, 64);
            break;
    }
}
