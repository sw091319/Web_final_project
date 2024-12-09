const characterimg = new Image();
characterimg.src = './img/Characters/Basic Charakter Spritesheet.png';

export const character = {
    up : false,
    down : false,
    left : false,
    right : false,
    use_item : false,
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

