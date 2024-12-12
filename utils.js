export const getLastWidthIndex = (canvas) => Math.floor((canvas.width - 88) / 68);
export const getLastHeightIndex = (canvas) => Math.floor((canvas.height - 88) / 68);
export function resize(canvas) {
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight
    - document.getElementsByTagName('header')[0].clientHeight - 15;
}
