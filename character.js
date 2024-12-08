import { getLastWidthIndex, getLastHeightIndex } from './game.js';
const characterimg = new Image();
characterimg.src = './img/Characters/Basic Charakter Spritesheet.png';

export const character = {
    up : false,
    down : false,
    left : false,
    right : false,
    x : 50,
    y : 50,
    laststate : "front",
    tick : 0,
    seeds: [],
    img: characterimg,
    front_basic1: [16, 15, 17, 17],
    front_basic2: [64, 15, 17, 17],
    front_move1: [112, 15, 17, 17],
    front_move2: [160, 15, 17, 17],
    back_basic1: [16, 63, 17, 17],
    back_basic2: [64, 63, 17, 17],
    back_move1: [112, 63, 17, 17],
    back_move2: [160, 63, 17, 17],
    left_basic1: [16, 111, 17, 17],
    left_basic2: [64, 111, 17, 17],
    left_move1: [112, 111, 17, 17],
    left_move2: [160, 111, 17, 17],
    right_basic1: [16, 159, 17, 17],
    right_basic2: [64, 159, 17, 17],
    right_move1: [112, 159, 17, 17],
    right_move2: [160, 159, 17, 17]
}

export const move = (canvas) => () => {
    if(character.left) {
        character.x -= 4;
        //왼쪽 끝에 도달한 경우
        if(character.x < 20) character.x = 20;
        //인벤토리에 겹치는 경우
        if(character.y > canvas.height - 250 && character.x < 700) character.x = 700;
    }
    if(character.right) {
        character.x += 4;
        if (character.x > canvas.width - 75) character.x = canvas.width - 75;
    }
    if(character.up) {
        character.y -= 4;
        if(character.y < 20) character.y = 20;
    }
    if(character.down) {
        character.y += 4;
        if(character.y > canvas.height - 80) character.y = canvas.height - 80;
        if(character.x < 650 && character.y > canvas.height - 255) character.y = canvas.height - 255;
    }
}

export function drawCharacter({ctx}) {
    character.tick=(character.tick+1)%50;

    function getDirection() {
        if(character.up) return "back_move";
        if(character.down) return "front_move";
        if(character.left) return "left_move";
        if(character.right) return "right_move";
        return character.laststate + "_basic";
    }

    if (character.tick < 25) {
        ctx.drawImage(character.img, ...character[getDirection()+"1"], character.x, character.y, 68, 68);
    } else {
        ctx.drawImage(character.img, ...character[getDirection()+"2"], character.x, character.y, 68, 68);
    }

    const lastWidthIndex = getLastWidthIndex();
    const lastHeightIndex = getLastHeightIndex();
    const characterWidthIndex = Math.floor((character.x + 34) / 68);
    const characterHeightIndex = Math.floor((character.y + 68) / 68);
    if (characterWidthIndex >= 13 && characterWidthIndex <= lastWidthIndex && characterHeightIndex >= 1 && characterHeightIndex <= lastHeightIndex) {
        ctx.fillStyle = "rgba(80, 80, 255, 0.3)";
        ctx.fillRect(10+(68*characterWidthIndex), 10+(68*characterHeightIndex), 68, 68);
    }
}
