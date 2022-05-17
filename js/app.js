import { createRejilla, colors as colorPixel } from './layout.js';
import { mouseMovement } from './events.js';

//define globals variables
var sizeP,      //Tamaño de un pixel: {x:, y:}
    div,        //Div que contiene el canvas.
    canvas,     //Objeto html del Canvas.
    ctx;        //Contexto del canvas.
//------------------------

window.onload = () => {
    sizeP = { x: 50, y: 50 };
    
    div = document.getElementById('game');
    canvas = document.getElementById('canvas-game');
    ctx = canvas.getContext('2d');

    resizeScreen( 10, 8 );

    canvas.addEventListener('mousemove', (ev) => {
        resizeScreen( 10, 8 );
        mouseMovement(ctx, sizeP, colorPixel.hover, ev);
    });
}


//------------ functions
const resizeScreen = (cols, rows) => {
    const [width, height] = [
        sizeP.x * cols,
        sizeP.y * rows
    ];

    div.style.height = height+'px';
    div.style.width = width+'px';

    canvas.height = height;
    canvas.width = width;

    createRejilla(canvas, sizeP);
}


//--------------------------------;