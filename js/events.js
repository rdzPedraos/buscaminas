const mousePos = { x:0, y:0 }

export function mouseMovement(ctx, sizePixel, color, event){
    //Size pixel:
    const [sizeX, sizeY] = [sizePixel.x, sizePixel.y];

    //Position windows to canvas:
    const pos = {
        x: event.clientX - ctx.canvas.offsetLeft,
        y: event.clientY - ctx.canvas.offsetTop
    }
    
    //Position in pixel:
    mousePos.x = Math.floor( pos.x / sizeX);
    mousePos.y = Math.floor( pos.y / sizeY);
    
    //Set in the position the color:
    ctx.fillStyle = color;
    ctx.fillRect(mousePos.x * sizeX, mousePos.y * sizeY, sizeX, sizeY);    
}