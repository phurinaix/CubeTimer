var scramble = document.querySelector("#scramble");
var time = document.querySelector("#time");
var startButton = document.querySelector("#start");
var stopButton = document.querySelector("#stop");
var m = 0, s = 0, ms = 0;
var minutes = "", seconds = "", milliseconds = "";
var isPlay = false;
var game;

var notation = [
    ["R", "R\'", "R2"],
    ["U", "U\'", "U2"],
    ["L", "L\'", "L2"],
    ["D", "D\'", "D2"],
    ["F", "F\'", "F2"],
    ["B", "B\'", "B2"]
];

// window.onload = function () {
    scramble.innerHTML = randomScramble(20);
// }
window.addEventListener("keyup", function (event) {
    event.preventDefault();

    if (event.keyCode == 32) {
        if (isPlay == false) {
            startButton.click();
        } else {
            stopButton.click();
        }
    }
});

startButton.addEventListener("click", () => {
    if (isPlay == false) {
        m = s = ms = 0;
        minutes = seconds = milliseconds = "";
        game = setInterval(timer, 10);
        isPlay = true;
    }
});

stopButton.addEventListener("click", () => {
    if (isPlay == true) {
        scramble.innerHTML = randomScramble(20);
        clearInterval(game);
        isPlay = false;
    }
});

function randomScramble (length) {
    var scrambleText = "";
    var row, col, temp;
    for (let i = 0; i < length; i++) {
        row =  Math.floor(Math.random() * (notation.length - 1));
        // prevent getting duplicate similar notation
        temp = notation[row];
        notation[row] = notation[5];
        notation[5] = temp;

        col = Math.floor(Math.random() * notation[0].length);
        scrambleText += notation[row][col] + " ";
    }
    return scrambleText;
}

function timer () {
    ms += 1;
    if (ms == 100) {
        s++;
        ms = 0;
    }
    if (s == 60) {
        m++;
        s = 0;
    }
    milliseconds = (ms < 10 ? '0' + ms : ms);
    seconds = (s < 10 ? '0' + s : s);
    minutes = (m < 10 ? '0' + m : m);
    time.innerHTML = minutes + " : " + seconds + " : " + milliseconds;
}