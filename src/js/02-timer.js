import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let selectedDate;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);

      selectedDate = selectedDates[0];

      if (selectedDate < options.defaultDate) {
        startBtn.disabled = true;
        Notiflix.Notify.failure("Please choose a date in the future");
        } else {
        startBtn.disabled = false;
        }
  },
};

flatpickr("#datetime-picker", options);


startBtn.addEventListener('click', handleStartCountdown);

function handleStartCountdown(event) {
    let timeRemaining = selectedDate - options.defaultDate;

    showRemainingTime(timeRemaining);

    const countdownID = setInterval(() => {
        timeRemaining -= 1000;
        showRemainingTime(timeRemaining);

        if (timeRemaining < 1000) {
          clearInterval(countdownID);
        }
    }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function showRemainingTime(timeRemaining) {
    const daysRemaining = convertMs(timeRemaining).days;
    const hoursRemaining = convertMs(timeRemaining).hours;
    const minutesRemaining = convertMs(timeRemaining).minutes;
    const secondsRemaining = convertMs(timeRemaining).seconds;

    days.textContent = addLeadingZero(daysRemaining);
    hours.textContent = addLeadingZero(hoursRemaining);
    minutes.textContent = addLeadingZero(minutesRemaining);
    seconds.textContent = addLeadingZero(secondsRemaining);
}