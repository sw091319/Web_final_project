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

export function getCropLevel(type,grow) {
    const coefficient = type === "wheat" ? 1 : 1.5;
    if(grow < 60*5*coefficient) return "seed";
    if(grow < 60*10*coefficient) return "grow1";
    if(grow < 60*15*coefficient) return "grow2";
    return "full";
}

export function drawCrop({ctx}) {
    character.seeds.forEach(seed => {
        ctx.drawImage(crop.img, ...crop[seed.type+"_"+getCropLevel(seed.type,seed.grow)], 10+(68*seed.x), 10+(68*seed.y), 68, 68);
    });
}
