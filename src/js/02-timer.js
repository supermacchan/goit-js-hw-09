import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      const selectedDate = selectedDates[0];
      if (selectedDate.getTime() < options.defaultDate.getTime()) {
        startBtn.disabled = true;
        Notiflix.Notify.failure("Please choose a date in the future");
      } else {
        startBtn.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);


