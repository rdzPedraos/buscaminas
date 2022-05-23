//Colores usados en el juego:
export const colors = {
    default_pixels: ['#aaa', '#ccc'],
    
    noOpen: '#ae3b',
    open: '#ffba9588', //ddc395e0
    hover: '#fff4',

    text: ['', '#2a7bcc', '#388e3c', '#d32f2f', '#7b1fa2', '#fd9006', '#5af', 'black', 'black'],
    bombs: ['#db3236', '#008744', '#f4840d', '#ed44b5', '#48e6f1', '#f4c20d', '#b648f2', '#4885ed']
}; 


/**
 * 
 * @param {*} ctx 
 * @param {*} sizePixel 
 * @param {*} event 
 */
export function eventHover(ctx, sizePixel, event){
    //Size pixel:
    const [sizeX, sizeY] = [sizePixel.x, sizePixel.y];

    //Position windows to canvas:
    const pos = {
        x: event.clientX - ctx.canvas.offsetLeft,
        y: event.clientY - ctx.canvas.offsetTop
    }

    //Position in pixel:
    const
        mousePosX = Math.floor( pos.x / sizeX),
        mousePosY = Math.floor( pos.y / sizeY);

    //Set in the position the color:
    ctx.fillStyle = colors.hover;
    ctx.fillRect(mousePosX * sizeX, mousePosY * sizeY, sizeX, sizeY);    
}


/**
 * Setea la interfaz del contexto canvas.
 * @param { Object } ctx Contexto canvas.
 * @param { {x:int, y:int} } szPixel Tamaño de un pixel
 * @param { string[][] } matriz Matriz que contiene información referente para imprimir.
 * @param { boolean } showBombers Si es true, se imprimirán las bombas que tenga matriz.
 */
export function setInterfaz(ctx, szPixel, matriz, showBombers){
    createRejilla(ctx, szPixel);
    setColorsByMatriz(ctx, szPixel, matriz, showBombers);
}


function createRejilla(ctx, szPixel){
    const 
        colorBoxes = colors.default_pixels,
        nCols = Math.floor(ctx.canvas.width / szPixel.x),
        nRows = Math.floor(ctx.canvas.height / szPixel.y);
    let color;

    for(let row=0; row < nRows; row++ ){
        //start color interleaved
        color = row % 2 ? colorBoxes[0] : colorBoxes[1];

        for(let col=0; col < nCols; col++ ){
            color = color == colorBoxes[0] ? colorBoxes[1] : colorBoxes[0];

            ctx.fillStyle = color;
            ctx.fillRect(col*szPixel.x, row*szPixel.y, szPixel.x, szPixel.y);
        }
    }
}


/**
 * Imprime en el canvas una rejilla que contiene una cuadricula con las dimensiones dadas.
 * @param {HTMLObjectElement} ctx Objeto canvas referido al html.
 * @param { {x:int, y:int} } szPixel Objeto con las medidas que tendrá un pixel en x y y.
 */
function setColorsByMatriz(ctx, szPixel, matriz, showBombers){
    //Tamaño de fuente que tendrá en mi canvas los números, relativo al tamaño del pixel:
    const fontSize = szPixel.y - szPixel.y*0.18;
    //Color del texto: [array con colores]
    const colorText = colors.text;
    //Tipografia:
    ctx.font = 'bold '+fontSize + "px Times New Roman";
    //Alineación
    ctx.textAlign = "center";
    
    for(let row=0; row < matriz.length; row++){
        for(let col=0; col < matriz[0].length; col++){
            const value = matriz[row][col];
            //Tamaño de un pixel:
            const [x, y] = [szPixel.x, szPixel.y];
            let afterActions = ()=>{};

            switch(value){
                case null:
                    ctx.fillStyle = colors.noOpen;
                break;

                case 'b':
                    if( showBombers ){
                        const valPosition = row*10 + col;
                        ctx.fillStyle = colors.bombs[ Math.floor( valPosition % colors.bombs.length ) ];
                        afterActions = () => {
                            ctx.fillStyle = '#0005';
    
                            const img = new Image();
                            img.src = 'img/circle_alpha.png';
                            ctx.drawImage(img, col*x + y/4, row*y + y/4, x/2, y/2);
                        }
                    }
                    else ctx.fillStyle = colors.noOpen;
                break;

                case 'f':
                case 'fb':
                    ctx.fillStyle = colors.noOpen;

                    afterActions = () => {
                        const img = new Image();
                        img.src = 'img/flag.png';
                        ctx.drawImage(img, col*x + 5, row*y + 5, x-10, y-10);
                    }
                break;

                default:
                    ctx.fillStyle = colors.open;

                    afterActions = () => {
                        if( typeof value == 'number' && value != 0){
                            ctx.fillStyle = colorText[value];
                            ctx.fillText(value, col*x + x/2, row*y + y/2 + szPixel.y*.3);
                        }
                    }
            }

            ctx.fillRect(col*x, row*y, x, y);
            afterActions();
        }
    }
}