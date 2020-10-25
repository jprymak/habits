// Import stylesheets
import "./style.css";
import { currentDate } from "./Month.js";
import months from "./months.js";
// Write Javascript code!
const currentMonth = currentDate.getMonth();

const calendar = document.querySelector(".calendar");
const nextButton = document.querySelector(".nextBtn");
const previousButton = document.querySelector(".previousBtn");

for (let i = 0; i <= 11; i++) {
  calendar.appendChild(months[i].createContent());
}

const calendarMonths = Array.from(document.querySelectorAll(".month"));

calendarMonths.forEach((month, index) => {
  if (
    index === currentMonth - 1 ||
    index === currentMonth ||
    index === currentMonth + 1
  ) {
    month.classList.add("month--displayed");
  }
});

nextButton.addEventListener("click", displayNextMonth);
previousButton.addEventListener("click", displayPreviousMonth);

let visibleMonths = document.querySelectorAll(".month--displayed");
const habitStatus = document.querySelectorAll(".habit-status");

habitStatus.forEach((status) =>
  status.addEventListener("click", (e) => {
    const monthToUpdate = e.currentTarget.closest(".month");
    const habitsStateToUpdate = monthToUpdate.querySelector(".month__habits");
    const currentDay = e.currentTarget.closest(".day");
    const monthIndex = calendarMonths.indexOf(monthToUpdate);
    const daysList = Array.from(monthToUpdate.querySelectorAll(".day"));
    const dayIndex = daysList.indexOf(currentDay);

    if (e.currentTarget.classList.contains("habit-status--broken")) {
      e.currentTarget.classList.remove("habit-status--broken");
      e.currentTarget.classList.add("habit-status--maintained");
      months[monthIndex].days[dayIndex].maintained = true;
    } else {
      e.currentTarget.classList.remove("habit-status--maintained");
      e.currentTarget.classList.add("habit-status--broken");
      months[monthIndex].days[dayIndex].maintained = false;
    }
    const habitMaintainedCount = months[monthIndex].days.reduce((maintainedCount, day) => {
      if (day.maintained !== false) {
        maintainedCount += 1;
      }

      return maintainedCount;
    }, 0);

    habitsStateToUpdate.innerHTML = `${habitMaintainedCount}/${months[monthIndex].daysLength}`;
  })
);

function displayNextMonth() {
  if (visibleMonths[2].querySelector(".month__name").innerHTML === "Grudzień")
    return;
  visibleMonths[0].classList.remove("month--displayed");

  if (visibleMonths[2].nextElementSibling) {
    visibleMonths[2].nextElementSibling.classList.add("month--displayed");
  }

  visibleMonths = document.querySelectorAll(".month--displayed");
}

function displayPreviousMonth() {
  if (visibleMonths[0].querySelector(".month__name").innerHTML === "Styczeń")
    return;
  visibleMonths[2].classList.remove("month--displayed");

  if (visibleMonths[0].previousElementSibling) {
    visibleMonths[0].previousElementSibling.classList.add("month--displayed");
  }

  visibleMonths = document.querySelectorAll(".month--displayed");
}
