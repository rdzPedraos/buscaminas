window.onload = () => {
    const canv = document.getElementById('buscaminas');
    if( canv.getContext ){
        createRejilla(canv);

        const ctx = canv.getContext('2d');
        /*createCanvas( ctx );
        createTriangle( ctx )
        createHappyFace( ctx ); */
        createCircles(ctx);
    }
};


function createCanvas(ctx){
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect (10, 10, 50, 50);

    ctx.fillStyle = "rgba(0, 0, 200, 0.5)"; //Color de figura
    ctx.fillRect (30, 30, 50, 50); //Generar figura
}

function createHappyFace(ctx){
    ctx.fillStyle = 'black';
    ctx.beginPath();

    ctx.arc(50,160, 40, 0, Math.PI*2);
    
    ctx.moveTo(40, 150);
    ctx.arc(35,150, 5, 0, Math.PI*2);

    ctx.moveTo(70, 150);
    ctx.arc(65,150, 5, 0, Math.PI*2);

    ctx.moveTo( 80, 160);
    ctx.arc(50,160, 30, 0, Math.PI);

    ctx.stroke();
}


function createTriangle(ctx){
    ctx.fillStyle = 'orange';
    ctx.beginPath(); //Decimos que crearemos una forma:
    ctx.moveTo(90,50);   //Movemos al lugar donde queremos empezar la forma:
    ctx.lineTo(120,75);
    ctx.lineTo(120,25);
    ctx.closePath(); //Cerramos la figura
    
    ctx.moveTo(160, 50);
    ctx.lineTo(130, 75);
    ctx.lineTo(130, 25);
    ctx.closePath(); //Cerramos la figura

    //ctx.stroke();
    ctx.fill();         //Cualquier forma abierta es cerrada automaticamente
}


function createRejilla(canvas){
    const tamPixel = 10,
        sizeW = canvas.width,
        sizeH = canvas.height,
        ctx = canvas.getContext('2d');
    let color = 'dfdfdf';
    
    for(let i=0; i < sizeW; i += tamPixel){
        for(let j=0; j < sizeH; j += tamPixel){
            color = color == 'dfdfdf' ? 'efeaea' : 'dfdfdf'
            
            ctx.fillStyle = '#'+color;
            ctx.fillRect(j,i,tamPixel,tamPixel);
        }
    }
}


function createCircles(ctx){
    ctx.fillStyle = 'black';
    for(var i=0;i<4;i++){
        for(var j=0;j<3;j++){
            ctx.beginPath();
            var x              = 30+j*50;               // Coordenada x
            var y              = 30+i*50;               // Coordenada y
            var radius         = 20;                    // Radio del arco
            var startAngle     = 0;                     // Punto inicial del círculo
            var endAngle       = Math.PI+(Math.PI*j)/2; // Punto final del círculo
            var anticlockwise  = i%2 != 0; // Sentido de las manecillas del reloj y contrario a ellas

            ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

            if (i>1){
                ctx.fill();
            } else {
                ctx.stroke();
            }
        }
    }
}