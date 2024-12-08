import { grass } from './grass.js';
import { character } from './character.js';
import { ground } from './ground.js';
import { inventory } from './inventory.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight
    - document.getElementsByTagName('header')[0].clientHeight - 15;
}

window.addEventListener('resize', resize);
window.addEventListener('keydown', (e) => {
    if(e.key === 'w') {
        character.up = true;
    }
    if(e.key === 'a') {
        character.left = true;
    }
    if(e.key === 's') {
        character.down = true;
    }
    if(e.key === 'd') {
        character.right = true;
    }
    if(e.key === 'space') {
        character.use_item = true;
    }
});
window.addEventListener('keyup', (e) => {
    if(e.key === 'w') {
        character.up = false;
        character.laststate = "back";
    }
    if(e.key === 'a') {
        character.left = false;
        character.laststate = "left";
    }
    if(e.key === 's') {
        character.down = false;
        character.laststate = "front";
    }
    if(e.key === 'd') {
        character.right = false;
        character.laststate = "right";
    }
});

function init() {
    resize();
    window.setInterval(drawGame, 1000 / 60);
    window.setInterval(move, 1000 / 60);
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrass();
    drawGround();
    drawInventory();
    drawCharacter();
    
}

function drawGrass() {
    function getHorizontal(x) {
        if(x === 0) return "left";
        if(10+(30*x) >= canvas.width-30) return "right";
        return "center";
    }
    
    function getVertical(y) {
        if(y === 0) return "Top";
        if(10+(30*y) >= canvas.height-30) return "Bottom";
        return "Middle";
    }

    for(let i = 0; 10 + 30*i < canvas.width; i++) {
        for(let j = 0; 10 + 30*j < canvas.height; j++) {
            ctx.drawImage(grass.img, ...grass[getHorizontal(i) + getVertical(j)], 10+(30*i), 10+(30*j), 30, 30);
        }
    }
}

function drawGround() {
    function getHorizontal(x) {
        if(x === 900/68) return "left";
        if(10+(68*x) >= canvas.width-136) return "right";
        return "center";
    }

    function getVertical(y) {
        if(y === 50/68) return "Top";
        if(10+(68*y) >= canvas.height-136) return "Bottom";
        return "Middle";
    }

    for(let i = 900/68; 10 + 68*i < canvas.width - 68; i++) {
        for(let j = 50/68; 10 + 68*j < canvas.height-68; j++) {
            ctx.drawImage(ground.img, ...ground[getHorizontal(i) + getVertical(j)], 10+(68*i), 10+(68*j), 68, 68);
            if (character.x+34 > 10+(68*i) && character.x+34 < 10+(68*i)+68 && character.y+68 > 10+(68*j) && character.y+68 < 10+(68*j)+68) {
                ctx.fillStyle = "rgba(80, 80, 255, 0.3)";
                ctx.fillRect(10+(68*i), 10+(68*j), 68, 68);
            }
        }
    }

}
function drawInventory() {
    ctx.drawImage(inventory.img, ...inventory.inventory, 10, canvas.height-184, 686, 184);
}

function move() {
    if(character.left) {
        if (character. x > 700 || (character.x > 20 && character.y < canvas.height - 255)) {
            character.x -= 4;
        }
    }
    if(character.right) {
        if (character.x < canvas.width - 75) {
            character.x += 4;
        }
    }
    if(character.up) {
        if (character.y > 20) {
            character.y -= 4;
        }
    }
    if(character.down) {
        if (character.y < canvas.height - 255 || (character. x > 650 && character.y < canvas.height - 80)) {
            character.y += 4;
        }
    }
}

function drawCharacter() {
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
    return;

}

init();
