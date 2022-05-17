import {initLayout, createRejilla} from './layout.js';

//define globals variables
var sizeP,
    canvas,
    div, 
    ctx;
//------------------------

window.onload = () => {
    sizeP = {
        x: 30,
        y: 30
    };
    
    div = document.getElementById('game');
    canvas = document.getElementById('canvas-game');
    ctx = canvas.getContext('2d');

    //createRejilla(canvas, sizeP);
    resize(15,10);
}


//------------ functions

const resize = (nX, nY) => {
    const [width, height] = [
        sizeP.x * nX,
        sizeP.y * nY
    ];

    div.style.height = height+'px';
    div.style.width = width+'px';

    canvas.height = height;
    canvas.width = width;

    createRejilla(canvas, sizeP);
}
//--------------------------------;