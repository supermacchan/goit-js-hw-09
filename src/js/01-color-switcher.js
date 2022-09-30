const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let colorSwitcherId;

startBtn.addEventListener('click', startColorSwitch);
stopBtn.addEventListener('click', stopColorSwitch);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startColorSwitch(event) {
    colorSwitcherId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    event.target.disabled = true;
    stopBtn.disabled = false;
}

function stopColorSwitch(event) {
    clearInterval(colorSwitcherId);
    event.target.disabled = true;
    startBtn.disabled = false;
}
