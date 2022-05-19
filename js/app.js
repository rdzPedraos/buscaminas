import { setInterfaz, eventHover } from './layout.js';
import { defineMatriz, setValuesInPosition, setBombs } from './logic.js';

//define globals variables
var sizeP,      //Tamaño de un pixel: {x:, y:}
    div,        //Div que contiene el canvas.
    canvas,     //Objeto html del Canvas.
    ctx,        //Contexto del canvas.
    dataMatriz,
    game = {started: false, failed: false}
//------------------------

window.onload = () => {
    const nPixels = { cols: 10, rows: 8};
    sizeP = { x: 50, y: 50 };
    
    div = document.getElementById('game');
    canvas = document.getElementById('canvas-game');
    ctx = canvas.getContext('2d');
    dataMatriz = defineMatriz(nPixels.cols, nPixels.rows);
    
    resizeScreen(nPixels.cols, nPixels.rows);
    setInterfaz(ctx, sizeP, dataMatriz);
    
    

    canvas.addEventListener('mousemove', (ev) => {
        setInterfaz(ctx, sizeP, dataMatriz);
        eventHover(ctx, sizeP, ev);
    });

    canvas.addEventListener('click', (event)=>{
        //Position in pixel:
        const mousePosition = {
            x: Math.floor( (event.clientX - ctx.canvas.offsetLeft) / sizeP.x),
            y: Math.floor( (event.clientY - ctx.canvas.offsetTop) / sizeP.y)
        }

        if( !game.started ){
            setBombs(dataMatriz, 10, mousePosition);
            game.started = true;
        } 
        setValuesInPosition(dataMatriz, mousePosition);
        setInterfaz(ctx, sizeP, dataMatriz);
    })
}


export const resizeScreen = (cols, rows, ) => {
    const [width, height] = [
        sizeP.x * cols,
        sizeP.y * rows
    ];

    div.style.height = height+'px';
    div.style.width = width+'px';

    canvas.height = height;
    canvas.width = width;
}