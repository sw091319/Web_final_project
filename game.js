import { Draw,Keyboard, Mouse } from './System.js';
import { registerKeyboardActions } from './keyboard.js';
import { registerMouseActions } from './mouse.js';
import { drawGrass } from './grass.js';
import { move, drawCharacter, growSeeds, character } from './character.js';
import { drawGround } from './ground.js';
import { drawInventory, inventory } from './inventory.js';
import { drawCrop } from './crops.js';
import { drawUI } from './ui.js';
import { drawShopUnclick } from './shop.js';
import { resize } from './utils.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const draw = new Draw(ctx, canvas);
draw.register(drawGrass)
    .register(drawGround)
    .register(drawInventory)
    .register(drawUI)
    .register(drawCrop)
    .register(drawCharacter)
    .register(drawShopUnclick);
const keyboard = new Keyboard();
registerKeyboardActions(keyboard, draw);
const mouse = new Mouse(canvas);
registerMouseActions(mouse, draw);

window.addEventListener('resize',() => resize(canvas));
resize(canvas);

window.setInterval(()=>draw.draw(), 1000 / 60);
window.setInterval(move(canvas), 1000 / 60);
window.setInterval(growSeeds, 1000 / 60);

/**
 * 
 * @param {number} coin 
 * @param {[number,number]} param1 
 * @param {{x:number,y:number,type:string,grow:number}[]} farm
 */
export function setInitialValues(coin, [wheat,beat], farm){
    character.coin = coin;
    inventory.wheat = wheat;
    inventory.beat = beat;
    character.seeds = farm;
}

/**
 * 
 * @returns {[coin: number,[wheat: number,beat: number],farm: {x:number,y:number,type:string,grow:number}[]]}
 */
export function getValues(){
    return [character.coin, [inventory.wheat, inventory.beat], character.seeds];
}
