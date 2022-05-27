let timer;
let seconds;

export const onTimer = (obj) => {
    resetTimer(obj);

    timer = setInterval( ()=>{
        seconds++;
        obj.innerHTML = formatTime(seconds);
    }, 1000);
}

export const resetTimer = (obj) => {
    clearInterval(timer);
    obj.innerHTML = formatTime(0);
    
    const history = seconds;
    seconds = 0;
    return {
        seconds: history,
        format: formatTime(history)
    };
}

export const offTimer = () => {
    clearInterval(timer);
    return {
        seconds,
        format: formatTime(seconds)
    };;
}



/**
 * Formatea una fecha en formato mm:ss
 * @param { int } timeInS número de segundos transcurridos.
 * @returns {string} hora en formato mm:ss
 */
const formatTime = (timeInS) => {
    const setZero = (value) => value < 10 ? '0'+value : value;
    let minutes = Math.trunc(timeInS / 60),
        seconds = timeInS % 60;

    return setZero(minutes)+':'+setZero(seconds);
}