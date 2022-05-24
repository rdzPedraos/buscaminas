import { setInterfaz, eventHover } from './layout.js';
import { defineMatriz, setValuesInPosition, setBombs, debug, searchValInMatriz } from './logic.js';

//define globals variables
const
    difficult = document.getElementById('difficult'), //Div que contiene el canvas.
    div = document.getElementById('game'),          //Div que contiene el canvas.
    canvas = document.getElementById('canvas-game'),//Objeto html del Canvas.
    ctx = canvas.getContext('2d'),                  //Contexto del canvas.
    game = { start: false, failed: false };         //Info del juego.

var  
    sizeP,      //Tamaño de un pixel: {x:, y:}
    nBombers,   //Número de bombas en el tablero.
    dataMatriz; //Información de las posición del juego.
//------------------------


window.onload = () => {
    setDificut('easy');
    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('click', clickLeft);
    canvas.addEventListener('contextmenu', clickRight);

    difficult.addEventListener('change', (e) => {
        setDificut(e.path[0].value);
    });
}

const mouseMove = (ev) => {
    setInterfaz(ctx, sizeP, dataMatriz, game.failed);
    eventHover(ctx, sizeP, ev);
}



const clickLeft = (event) => {
    event.preventDefault();

    if( !game.failed ){
        //Position in pixel:
        const mousePosition = {
            x: Math.floor( (event.clientX - ctx.canvas.offsetLeft) / sizeP.x),
            y: Math.floor( (event.clientY - ctx.canvas.offsetTop) / sizeP.y)
        }

        if( !game.start ){
            setBombs(dataMatriz, nBombers, mousePosition);
            game.start = true;
        }
    
        const value = dataMatriz[mousePosition.y][mousePosition.x]
        if( value != 'fb' && value != 'f') setValuesInPosition(dataMatriz, mousePosition);
        
        if( value == 'b' ){
            game.failed = true;
            console.log('lose');
        }
        else if( !searchValInMatriz(null, dataMatriz) ){
            console.log('win');
        }
        
        setInterfaz(ctx, sizeP, dataMatriz, game.failed);
    }
}



const clickRight = (event) => {
    event.preventDefault();

    if( !game.failed && game.start ){
        //Position in pixel:
        const pos = {
            x: Math.floor( (event.clientX - ctx.canvas.offsetLeft) / sizeP.x),
            y: Math.floor( (event.clientY - ctx.canvas.offsetTop) / sizeP.y)
        }

        let value = dataMatriz[pos.y][pos.x];
        switch( value ){
            case null: value = 'f'; break;
            case 'f': value = null; break;

            case 'b': value = 'fb'; break;
            case 'fb': value = 'b'; break;
        }
        dataMatriz[pos.y][pos.x] = value;

        setInterfaz(ctx, sizeP, dataMatriz, game.failed);
    }
}


//--- Others configs:
/**
 * Setea dificultades e inciia un nuevo juego, con las variables globales.
 * @param { string } dificult dificultad del juego = 'easy', 'medium', 'hard'
 */
 const setDificut = (dificult) => {
    let nPix = null;
    switch( dificult ){
        case 'easy':
            nBombers = 10;
            nPix = {cols: 10, rows: 8};
            sizeP = {x: 45, y: 45};
        break;

        case 'medium':
            nBombers = 40;
            nPix = {cols: 18, rows: 14};
            sizeP = {x: 35, y: 35};
        break;

        case 'hard':
            nBombers = 99;
            nPix = {cols:24, rows:21};
            sizeP = {x:30, y:30};
        break;
    }

    if( nPix != null ){
        game.start = false;
        game.failed = false;

        dataMatriz = defineMatriz(nPix.rows, nPix.cols);
        resizeScreen(nPix.rows, nPix.cols);
        setInterfaz(ctx, sizeP, dataMatriz, game.failed);
    }
}

/**
 * Redimensiona el canvas y los divs, considerando la variable del tamño de pixel.
 * @param {int} cols
 * @param {int} rows 
 */
const resizeScreen = (rows, cols) => {
    const [width, height] = [
        sizeP.x * cols,
        sizeP.y * rows
    ];

    div.style.height = height+'px';
    div.style.width = width+'px';

    canvas.height = height;
    canvas.width = width;
}