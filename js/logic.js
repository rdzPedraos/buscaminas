/**
 * Genera una matriz que contiene de tamaño [rows][cols]
 * @param { int } rows Número de filas (cuadros en el eje y) que tendrá
 * @param { int } cols Número de columnas (cuadros en el eje x) que tendrá
 * @returns { null[][] } matriz vacia.
 */
export const defineMatriz = (rows, cols) => {
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
 * Función para el juego del buscaminas.
 * Depende de lo que contenga en la matriz esa posición, procede a resolver sus posiciones
 * aledañas.
 * @param { int[][] } matriz 
 * @param { { x: int, y: int} } point 
 */
export const setValuesInPosition = (matriz, point) => {
    const {x,y} = point;
    const [minX, maxX, minY, maxY] = [
        x > 0 ? x-1 : 0,
        x >= matriz[0].length-1 ? matriz[0].length-1 : x+1,
        y > 0 ? y-1 : 0,
        y >= matriz.length-1 ? matriz.length-1 : y+1,
    ];

    if( matriz[y][x] != 'b' ){
        let bombs = 0;

        //busque cuantas bombas hay al su alrededor.
        for(let i = minY; i <= maxY; i++){
            for(let j = minX; j <= maxX; j++){
                const val = matriz[i][j];
                if( val == 'b' || val == 'fb' ) bombs++;
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
 * @param { string[][] } matriz Matriz con los datos del tablero.
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

export const searchValInMatriz = (val, matriz) => {
    let i=0, size = matriz.length;
    while( i < size && !matriz[i].includes(val) ) i++;
    return i < size;
}

export const debug = (matriz) => {
    for(let i=1; i < 4; i++){
        for(let j=1; j<4; j++){
            matriz[i][j] =  (i-1)*3 + (j-1);
        }
    }
    matriz[4][1] = 6;
}