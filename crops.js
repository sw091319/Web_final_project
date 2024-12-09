import { character } from './character.js';
const cropimg = new Image();
cropimg.src = './img/Objects/Basic_Plants.png';

export const crop = {
    img: cropimg,
    wheat_pack: [1, 1, 13, 14],
    wheat_seed: [16, 1, 13, 14],
    wheat_grow1: [32, 1, 13, 14],
    wheat_grow2: [48, 1, 13, 14],
    wheat_full: [64, 1, 13, 14],
    beat_pack: [1, 17, 13, 14],
    beat_seed: [16, 17, 13, 14],
    beat_grow1: [32, 17, 13, 14],
    beat_grow2: [48, 17, 13, 14],
    beat_full: [64, 17, 13, 14]
}

export function drawCrop({ctx}) {
    character.seeds.forEach(seed => {
        switch(seed.type) {
            case "wheat":
                if(seed.grow === 0) {
                    ctx.drawImage(crop.img, ...crop.wheat_seed, 10+(68*seed.x), 10+(68*seed.y), 68, 68);
                } else if(seed.grow === 1) {
                    ctx.drawImage(crop.img, ...crop.wheat_grow1, 10+(68*seed.x), 10+(68*seed.y), 68, 68);
                } else if(seed.grow === 2) {
                    ctx.drawImage(crop.img, ...crop.wheat_grow2, 10+(68*seed.x), 10+(68*seed.y), 68, 68);
                } else if(seed.grow === 3) {
                    ctx.drawImage(crop.img, ...crop.wheat_full, 10+(68*seed.x), 10+(68*seed.y), 68, 68);
                }
                break;
            case "beat":
                if(seed.grow === 0) {
                    ctx.drawImage(crop.img, ...crop.beat_seed, 10+(68*seed.x), 10+(68*seed.y), 68, 68);
                } else if(seed.grow === 1) {
                    ctx.drawImage(crop.img, ...crop.beat_grow1, 10+(68*seed.x), 10+(68*seed.y), 68, 68);
                } else if(seed.grow === 2) {
                    ctx.drawImage(crop.img, ...crop.beat_grow2, 10+(68*seed.x), 10+(68*seed.y), 68, 68);
                } else if(seed.grow === 3) {
                    ctx.drawImage(crop.img, ...crop.beat_full, 10+(68*seed.x), 10+(68*seed.y), 68, 68);
                }
                break;
        }
    });
}
