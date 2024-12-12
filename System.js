export class Draw{
    constructor(ctx, canvas){
        this.ctx = ctx;
        this.canvas = canvas;
        this.drawFunctionList = [];
    }

    /**
     * @param func {({ctx, canvas}) => void}
     */
    register(func){
        this.drawFunctionList.push(func);
        return this;
    }

    unRegister(func){
        this.drawFunctionList = this.drawFunctionList.filter(f => f !== func);
        return this;
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(){
        this.clear();
        this.drawFunctionList.forEach(func => func({ctx: this.ctx, canvas: this.canvas}));
    }
}

export class Keyboard{
    constructor(){
        this.keyboardActions = [];
        this.apply();
    }

    /**
     * @param key {string|{key: string, condition: () => boolean, down: () => void, up: () => void}}
     * @param condition {() => boolean}
     * @param down {() => void}
     * @param up {() => void}
     */
    register(key, condition, down, up){
        if(typeof key === 'object'){
            this.keyboardActions.push(key);
            return;
        }
        this.keyboardActions.push({key, condition, down, up});
    }

    apply(){
        document.addEventListener('keydown', (e) => {
            this.keyboardActions.filter(action => action.key === e.key&& action.condition()).forEach(action => action.down?.());
        });

        document.addEventListener('keyup', (e) => {
            this.keyboardActions.filter(action => action.key === e.key&& action.condition()).forEach(action => action.up?.());
        });
    }
}

export class Mouse{
    constructor(canvas){
        this.canvas = canvas;
        this.mouseActions = [];
        this.apply();
    }

    static isInRect(x, y, rect){
        return x > rect[0] && x < rect[0] + rect[2] && y > rect[1] && y < rect[1] + rect[3];
    }

    register(action){
        this.mouseActions.push(action);
    }

    apply(){
        this.canvas.addEventListener('mousedown', (e) => {
            const x = e.clientX - this.canvas.getBoundingClientRect().left;
            const y = e.clientY - this.canvas.getBoundingClientRect().top;
            this.mouseActions.filter(action => action.condition(x, y)).forEach(action => action.down?.());
        });

        this.canvas.addEventListener('mouseup', (e) => {
            const x = e.clientX - this.canvas.getBoundingClientRect().left;
            const y = e.clientY - this.canvas.getBoundingClientRect().top;
            this.mouseActions.filter(action => action.condition(x, y)).forEach(action => action.up?.());
        });

        this.canvas.addEventListener('click', (e) => {
            const x = e.clientX - this.canvas.getBoundingClientRect().left;
            const y = e.clientY - this.canvas.getBoundingClientRect().top;
            this.mouseActions.filter(action => action.condition(x, y)).forEach(action => action.click?.());
        });
    }
}
