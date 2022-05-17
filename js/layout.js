export const colors = {
    0: '#aad751', 
    1: '#a2d149', 
    hover: '#bfe07d'
}; 


/**
 * Imprime en el canvas una rejilla que contiene una cuadricula con las dimensiones dadas.
 * @param {HTMLObjectElement} cv Objeto canvas referido al html.
 * @param { {x:int, y:int} } szPixel Objeto con las medidas que tendrá un pixel en x y y.
 */
export function createRejilla(cv, szPixel){
    const 
        ctx = cv.getContext('2d'),
        nCols = Math.floor(cv.width / szPixel.x),
        nRows = Math.floor(cv.height / szPixel.y);
    let color;

    for(let row=0; row < nRows; row++ ){
        //start color interleaved
        color = row % 2 ? colors[0] : colors[1];

        for(let col=0; col < nCols; col++ ){
            color = color == colors[0] ? colors[1] : colors[0];

            ctx.fillStyle = color;
            ctx.fillRect(col*szPixel.x, row*szPixel.y, szPixel.x, szPixel.y);
        }
    }
}