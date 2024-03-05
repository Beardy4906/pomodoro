const pomodoroButton = document.getElementById('pomodoroButton');
const shortBreakButton = document.getElementById('shortBreakButton');
const longBreakButton = document.getElementById('longBreakButton');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const timerDisplay = document.getElementById('timer');
const fullscreenButton = document.getElementById('fullscreen'); 

let interval;
let currentTimer = 'pomodoro';
let currentTimerDuration = 30 * 60;
let remainingTime = currentTimerDuration;
let startTime;
let elapsedTime = 0;
let isTimerRunning = false;

const timerDurations = {
    pomodoro: 30 * 60,
    shortBreak: 5 * 60,
    longBreak: 10 * 60
};

function startTimer(duration) {
    remainingTime = duration - elapsedTime;
    startTime = Date.now();
    interval = setInterval(function () {
        const now = Date.now();
        elapsedTime = Math.floor((now - startTime) / 1000);
        const timer = remainingTime - elapsedTime;

        if (timer <= 0) {
            clearInterval(interval);
            alert('Timer completed!');
            if (currentTimer === 'pomodoro') {
                pomodoroCount++;
                if (pomodoroCount >= 4) {
                    currentTimer = 'longBreak';
                    pomodoroCount = 0;
                } else {
                    currentTimer = 'shortBreak';
                }
            } else {
                currentTimer = 'pomodoro';
            }
            startTimer(timerDurations[currentTimer]);
        } else {
            displayTime(timer);
        }
    }, 1000);
}

function displayTime(duration) {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerDisplay.textContent = minutes + ':' + seconds;
}

function startTimerFor(timerType) {
    clearInterval(interval);
    currentTimer = timerType;
    currentTimerDuration = timerDurations[currentTimer];
    remainingTime = currentTimerDuration;
    elapsedTime = 0;
    displayTime(currentTimerDuration);
}

pomodoroButton.addEventListener('click', function () {
    if (!isTimerRunning) {
        startTimerFor('pomodoro');
        setActiveButton(pomodoroButton);
    }
});

shortBreakButton.addEventListener('click', function () {
    if (!isTimerRunning) {
        startTimerFor('shortBreak');
        setActiveButton(shortBreakButton);
    }
});

longBreakButton.addEventListener('click', function () {
    if (!isTimerRunning) {
        startTimerFor('longBreak');
        setActiveButton(longBreakButton);
    }
});

startPauseButton.addEventListener('click', function () {
    if (!isTimerRunning) {
        startTimer(currentTimerDuration);
        startPauseButton.textContent = 'Pause';
        isTimerRunning = true;
    } else {
        clearInterval(interval);
        elapsedTime += Math.floor((Date.now() - startTime) / 1000);
        startPauseButton.textContent = 'Start';
        isTimerRunning = false;
    }
});

resetButton.addEventListener('click', function () {
    clearInterval(interval);
    timerDisplay.textContent = '30:00';
    startPauseButton.textContent = 'Start';
    currentTimer = 'pomodoro';
    currentTimerDuration = timerDurations[currentTimer];
    remainingTime = currentTimerDuration;
    elapsedTime = 0;
    setActiveButton(pomodoroButton);
    isTimerRunning = false;
});

function setActiveButton(button) {
    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

fullscreenButton.addEventListener('click', function () {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
});

startTimerFor('pomodoro');
setActiveButton(pomodoroButton);
