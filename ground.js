import { getLastWidthIndex, getLastHeightIndex } from './utils.js';
const groundimg = new Image();
groundimg.src = './img/Tilesets/Tilled_Dirt.png';

export const ground = {
    img: groundimg,
    leftTop: [3, 3, 14, 14],
    centerTop: [17, 3, 14, 14],
    rightTop: [31, 3, 14, 14],
    leftMiddle: [3, 17, 14, 14],
    centerMiddle: [17, 17, 14, 14],
    rightMiddle: [31, 17, 14, 14],
    leftBottom: [3, 31, 14, 14],
    centerBottom: [17, 31, 14, 14],
    rightBottom: [31, 31, 14, 14]
}

export function drawGround({ctx, canvas}) {
    const lastWidthIndex = getLastWidthIndex(canvas);
    const lastHeightIndex = getLastHeightIndex(canvas);
    function getHorizontal(x) {
        if(x === 13) return "left";
        if(x === lastWidthIndex) return "right";
        return "center";
    }

    function getVertical(y) {
        if(y === 1) return "Top";
        if(y === lastHeightIndex) return "Bottom";
        return "Middle";
    }

    for(let i = 13; i<=lastWidthIndex; i++) {
        for(let j = 1; j<=lastHeightIndex; j++) {
            ctx.drawImage(ground.img, ...ground[getHorizontal(i) + getVertical(j)], 10+(68*i), 10+(68*j), 68, 68);
        }
    }
}
