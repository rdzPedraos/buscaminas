import { setInterfaz, eventHover } from './layout.js';
import {  } from './events.js';

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
    const nPixels = { cols: 10, rows: 8};
    sizeP = { x: 60, y: 60 };
    
    div = document.getElementById('game');
    canvas = document.getElementById('canvas-game');
    ctx = canvas.getContext('2d');
    dataMatriz = defineMatriz(nPixels.cols, nPixels.rows);
    
    resizeScreen(nPixels.cols, nPixels.rows);
    setInterfaz(ctx, sizeP, dataMatriz);
    
    setBombs(dataMatriz, 10, {x:2, y:1});

    canvas.addEventListener('mousemove', (ev) => {
        setInterfaz(ctx, sizeP, dataMatriz);
        eventHover(ctx, sizeP, ev);
    });

    canvas.addEventListener('click', (ev)=>{
        
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


/**
 * Genera aleatoriamente el aglomerado de bombas que existiran en una matriz.
 * @param { [ [] ] } matriz Matriz con los datos del tablero.
 * @param { number } bombs bombas a colocar.
 * @param { {x:int, y:int} } point Punto de referencia en donde NO deben existir bombas.
 */
const setBombs = (matriz, bombs, point) => {
    const 
        numRows = matriz.length, 
        numCols = matriz[0].length,
        probability = 1/10,
        [px, py] = [point.x, point.y];
    if( bombs > (numRows * numCols) - 9 ) throw new Error ('Demasiadas bombas para una cuadricula de '+numCols+'x'+numRows);

    let x, y=0;
    //Mientras todas las bombas no hayan sido colocadas:
    while( bombs > 0 ){
        x = 0;

        //Recorra y mientras este sea menor al número de columnas, y las bombas no hayan sido dadas en su totalidad.
        while( x < numCols && bombs > 0 ){
            if( 
                //Mientras la posición no esté dentro de un rango de 1 cuadrito a la redonda de point
                //y el valor probabilistico sea el esperado, guarde la bomba, y eliminela de las necesarias.
                !(
                    Math.abs(px - x) <= 1 && 
                    Math.abs(py - y) <= 1
                ) &&
                Math.random() <= probability
            ){
                matriz[y][x] = 'b';
                bombs--;
            }
            x++;
        }

        
        if( y+1 == numRows) y=0;
        else y++
    }
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