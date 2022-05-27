import { setInterfaz, eventHover } from './layout.js';
import { defineMatriz, setValuesInPosition, setBombs, debug, searchValInMatriz } from './logic.js';
import { offTimer, onTimer, resetTimer } from './timer.js';

//define globals variables
const
    btn_playGame = document.getElementById('btn-newGame'),
    difficult = document.getElementById('difficult'), //Div que contiene el canvas.
    span_flags = document.getElementById('n-flags'),
    timer = document.getElementById('timer'),

    div = document.getElementById('game'),          //Div que contiene el canvas.
    canvas = document.getElementById('canvas-game'),//Objeto html del Canvas.
    ctx = canvas.getContext('2d'),                  //Contexto del canvas.
    game = { start: false, failed: false, init: false };         //Info del juego.

var  
    sizeP,      //Tamaño de un pixel: {x:, y:}
    nBombers,   //Número de bombas en el tablero.
    dataMatriz; //Información de las posición del juego.
//------------------------


window.onload = () => {
    setDificut( difficult.value );
    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('click', clickLeft);
    canvas.addEventListener('contextmenu', clickRight);

    difficult.addEventListener('change', (e) => {
        setDificut(e.path[0].value);
    });

    btn_playGame.addEventListener('click', (e) => {
        e.preventDefault();
        setDificut(difficult.value);
        document.getElementById('screen').style.display = 'none';
    });
}

const mouseMove = (ev) => {
    setInterfaz(ctx, sizeP, dataMatriz, game.failed);
    eventHover(ctx, sizeP, ev);
}



const clickLeft = (event) => {
    event.preventDefault();

    if( game.start ){
        //Position in pixel:
        const mousePosition = {
            x: Math.floor( (event.clientX - ctx.canvas.offsetLeft) / sizeP.x),
            y: Math.floor( (event.clientY - ctx.canvas.offsetTop) / sizeP.y)
        }

        if( !game.init ){
            setBombs(dataMatriz, nBombers, mousePosition);
            onTimer(timer);
            game.failed = false;
            game.init = true;
        }
    
        const value = dataMatriz[mousePosition.y][mousePosition.x];
        if( value != 'fb' && value != 'f') setValuesInPosition(dataMatriz, mousePosition);
        
        if( value == 'b' ){
            game.failed = true;
            setScreen(false);
        }
        else if( !searchValInMatriz(null, dataMatriz) ){
            setScreen(true);
        }
        
        setInterfaz(ctx, sizeP, dataMatriz, game.failed);
    }
}



const clickRight = (event) => {
    event.preventDefault();

    if( game.start ){
        //Position in pixel:
        const pos = {
            x: Math.floor( (event.clientX - ctx.canvas.offsetLeft) / sizeP.x),
            y: Math.floor( (event.clientY - ctx.canvas.offsetTop) / sizeP.y)
        }

        let value = dataMatriz[pos.y][pos.x];

        const flagsNow = parseInt(span_flags.innerHTML);
        span_flags.innerHTML = value == 'f' || value == 'fb' 
            ? flagsNow + 1
            : flagsNow - 1;

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


const setScreen = (win) => {
    game.start = false;

    const 
        time = offTimer(timer).format,
        url = win ? '../img/win_screen.png' : '../img/lose_screen.png',
        text = win ? 'Volver a jugar' : 'Intentar de nuevo',
        icon = win ? 'fa-solid fa-computer-mouse' : 'fa-solid fa-arrow-rotate-right';

    document.getElementById('screen-timer').innerHTML = time;
    document.getElementById('screen-text').innerHTML = text;
    document.getElementById('screen-btn_icon').className = icon;
    document.getElementById('screen-img').style.backgroundImage = 'url(' + url + ')';
    document.getElementById('screen').style.display = 'flex';
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
        game.start = true;
        game.init = false;
        game.failed = false;

        span_flags.innerHTML = nBombers;
        resetTimer(timer);
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