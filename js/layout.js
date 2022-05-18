export const colors = {
    default_pixels: ['#cccccc', '#fff'],
    
    noOpen: '#aaee33bb',
    open: '#ffc395e0', //ddc395e0
    hover: '#fff5',

    text: ['', '#5555ff', '#558855', 'red', 'brown', 'purple'],
    bombs: ['#db3236', '#008744', '#f4840d', '#ed44b5', '#48e6f1', '#f4c20d', '#b648f2', '#4885ed']
}; 


export function setInterfaz(ctx, szPixel, matriz){
    createRejilla(ctx, szPixel);
    setColorsByMatriz(ctx, szPixel, matriz);
}


export function createRejilla(ctx, szPixel){
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
export function setColorsByMatriz(ctx, szPixel, matriz){
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
                    const valPosition = row*10 + col;
                    ctx.fillStyle = colors.bombs[ Math.floor( valPosition % colors.bombs.length ) ];
                    afterActions = () => {
                        ctx.fillStyle = '#0005';

                        const img = new Image();
                        img.src = 'img/circle_alpha.png';
                        ctx.drawImage(img, col*x + 7, row*y + 7, x-14, y-14);

                        /*ctx.arc(col*x + x/2, row*y + y/2, x - (x*.75), 0, Math.PI*2)
                        ctx.fill();
                        ctx.closePath();*/
                    }
                break;

                case 'f':
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