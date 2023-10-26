let isRunning = false;
let startTime = 0;
let endTime = 0;
let lapStartTime = 0;
let lapEndTime = 0;
const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('lapsList');
let lapCount = 1;

function startStop() {
    if (!isRunning) {
        isRunning = true;
        startStopButton.textContent = 'Stop';
        if (lapStartTime === 0) {
            lapStartTime = Date.now();
        }
        startTime = Date.now() - (endTime > 0 ? (endTime - startTime) : 0);
        interval = setInterval(updateTime, 10);
    } else {
        isRunning = false;
        startStopButton.textContent = 'Start';
        clearInterval(interval);
        endTime = Date.now();
        if (lapStartTime > 0) {
            lapEndTime = Date.now();
        }
    }
}

function reset() {
    isRunning = false;
    startStopButton.textContent = 'Start';
    clearInterval(interval);
    startTime = 0;
    endTime = 0;
    display.textContent = '00:00:00';
    lapStartTime = 0;
    lapEndTime = 0;
    lapsList.innerHTML = '';
    lapCount = 1;
}

function updateTime() {
    const currentTime = isRunning ? Date.now() - startTime : endTime - startTime;
    const formattedTime = formatTime(currentTime);
    display.textContent = formattedTime;
}

function formatTime(ms) {
    const date = new Date(ms);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - lapStartTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsList.appendChild(lapItem);
        lapCount++;
        lapStartTime = Date.now();
    }
}

reset(); // Initialize the display

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);
