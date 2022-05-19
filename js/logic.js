//
export const defineMatriz = (cols, rows) => {
    const matriz = [];
    for(let i=0; i < rows; i++){
        matriz.push([]);
        for(let j=0; j < cols; j++){
            matriz[i].push(null);
        }
    }

    return matriz;
}


//
export const setValuesInPosition = (matriz, point) => {
    const {x,y} = point;
    const [minX, maxX, minY, maxY] = [
        x > 0 ? x-1 : 0,
        x >= matriz[0].length-1 ? matriz[0].length-1 : x+1,
        y > 0 ? y-1 : 0,
        y >= matriz.length-1 ? matriz.length-1 : y+1,
    ];

    if( matriz[y,x] != 'b' ){
        let bombs = 0;

        //busque cuantas bombas hay al su alrededor.
        for(let i = minY; i <= maxY; i++){
            for(let j = minX; j <= maxX; j++){
                if( matriz[i][j] == 'b' ) bombs++;
            }
        }

        matriz[y][x] = bombs;
        if(bombs == 0) {
            for(let i = minY; i <= maxY; i++){
                for(let j = minX; j <= maxX; j++){
                    if( !(i==y && j==x) && matriz[i][j] == null){
                        setValuesInPosition(matriz, {x:j, y:i});
                    }
                }
            }
        }
    }
}


/**
 * Genera aleatoriamente el aglomerado de bombas que existiran en una matriz.
 * @param { [ [] ] } matriz Matriz con los datos del tablero.
 * @param { number } bombs bombas a colocar.
 * @param { {x:int, y:int} } point Punto de referencia en donde NO deben existir bombas.
 */
export const setBombs = (matriz, bombs, point) => {
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
        else y++;
    }
}


export const debug = (dataMatriz) => {
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