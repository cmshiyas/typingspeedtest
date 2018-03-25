const textWrapper = document.querySelector(".test-wrapper");
const textArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
leadingZero = time => {
   return  time <=9 ? "0"+time: time; 
}

// Run a standard minute/second/hundredths timer:
runTimer = () => {
    let currentTime = leadingZero(timer[0])+ ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]) ;
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor((timer[3] - (timer[1]*100) - (timer[0] * 6000) ));

}

// Match the text entered with the provided text on the page:


// Start the timer:
start = () => {
    let textEnteredLength = textArea.value.length;
    if (textEnteredLength === 0 && !timerRunning ){
        timerRunning = true;
       interval = setInterval(runTimer, 10);
    }
}

spellCheck = () => {
    let textEntered = textArea.value;
    let originTextMatch = originText.substr(0,textEntered.length);

    if (textEntered == originText ){
        textWrapper.style.borderColor = "#429890";
        clearInterval(interval);
    } else if (  textEntered == originTextMatch){
        textWrapper.style.borderColor  = "#65CCF3";
    } else {
        textWrapper.style.borderColor  = "#E95D0F";
    }
}

// Reset everything:
reset = () => {
    clearInterval(interval);
    interval = null;
    timer = [ 0,0,0,0];
    timerRunning = false;
    textArea.value = "";
    theTimer.innerHTML = "00:00:00";
    textWrapper.style.borderColor = "grey";
    
}

// Event listeners for keyboard input and the reset button:
textArea.addEventListener("keypress", start, false);
textArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);