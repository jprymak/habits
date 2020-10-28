// Import stylesheets
import "./style.css";
import {Month, currentDate } from "./Month.js";

import months from "./months.js";
import AppStorage from "./app-storage";
import HabitsRepository from "./habits-repository";
// Write Javascript code!

const storage = new AppStorage();
const repository = new HabitsRepository(storage, months);

const currentMonth = currentDate.getMonth();





const nextButton = document.querySelector(".nextBtn");
const previousButton = document.querySelector(".previousBtn");

repository.render()

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
      repository.months[monthIndex].days[dayIndex].maintained = true;
    } else {
      e.currentTarget.classList.remove("habit-status--maintained");
      e.currentTarget.classList.add("habit-status--broken");
      repository.months[monthIndex].days[dayIndex].maintained = false;
    }
    const habitMaintainedCount = repository.months[monthIndex].days.reduce((maintainedCount, day) => {
      if (day.maintained !== false) {
        maintainedCount += 1;
      }

      return maintainedCount;
    }, 0);
    repository.months[monthIndex].maintained = habitMaintainedCount;
    habitsStateToUpdate.innerHTML = `${habitMaintainedCount}/${repository.months[monthIndex].daysLength}`;
    repository.onChange();
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
