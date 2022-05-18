import { setInterfaz, colors as colorPixel } from './layout.js';
import { mouseMovement } from './events.js';

//define globals variables
var sizeP,      //Tamaño de un pixel: {x:, y:}
    div,        //Div que contiene el canvas.
    canvas,     //Objeto html del Canvas.
    ctx,        //Contexto del canvas.
    dataMatriz,
    start = false,
    failed = false
//------------------------

window.onload = () => {
    const nPixels = { cols: 20, rows: 18};
    sizeP = { x: 40, y: 40 };
    
    div = document.getElementById('game');
    canvas = document.getElementById('canvas-game');
    ctx = canvas.getContext('2d');
    dataMatriz = defineMatriz(nPixels.cols, nPixels.rows);

    resizeScreen(nPixels.cols, nPixels.rows);
    setInterfaz(ctx, sizeP, dataMatriz);

    canvas.addEventListener('mousemove', (ev) => {
        setInterfaz(ctx, sizeP, dataMatriz);
        mouseMovement(ctx, sizeP, colorPixel.hover, ev);
    });

    canvas.addEventListener('click', (ev)=>{
        console.log(ev);
    })
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
}

const defineMatriz = (cols, rows) => {
    const matriz = [];
    for(let i=0; i < rows; i++){
        matriz.push([]);
        for(let j=0; j < cols; j++){
            matriz[i].push(null);
        }
    }

    return matriz;
}
//--------------------------------;




const debug = (dataMatriz) => {
    dataMatriz[1][2] = 1;
    dataMatriz[1][3] = 2;
    dataMatriz[1][4] = 0;

    dataMatriz[2][3] = 3;
    dataMatriz[2][4] = 4;
    dataMatriz[2][6] = 'b';
    dataMatriz[2][7] = 'b';
    dataMatriz[2][8] = 'f';
    dataMatriz[2][9] = 5;

    dataMatriz[3][6] = 'b';
    dataMatriz[3][7] = 'b';

    dataMatriz[4][6] = 'b';
    dataMatriz[4][7] = 'b';
}