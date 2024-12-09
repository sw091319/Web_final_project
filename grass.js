const grassimg = new Image();
grassimg.src = './img/Tilesets/Grass.png';

export const grass = {
    img: grassimg,
    leftTop: [2, 2, 15, 15],
    centerTop: [17, 2, 15, 15],
    rightTop: [32, 2, 15, 15],
    leftMiddle: [2, 17, 15, 15],
    centerMiddle: [17, 17, 15, 15],
    rightMiddle: [32, 17, 15, 15],
    leftBottom: [2, 32, 15, 15],
    centerBottom: [17, 32, 15, 15],
    rightBottom: [32, 32, 15, 15]
}

export function drawGrass({ctx, canvas}) {
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
