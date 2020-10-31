// Import stylesheets
import "./style.css";

import { currentDate } from "./Month.js";

import months from "./months.js";
import AppStorage from "./app-storage";
import HabitsRepository from "./habits-repository";
// Write Javascript code!
const storage = new AppStorage();
const repository = new HabitsRepository(storage, months);
const currentMonth = currentDate.getMonth();

const habitSelect = document.querySelector('.habit-picker__select');

repository.updateOptions(repository.habits);


const habitInput = document.querySelector(".habit-picker__input");
const selectedHabit = document.querySelector(".habit-picker__select");
const calendarContainer = document.querySelector(".calendar-container");
const calendar = document.querySelector(".calendar");
const habitConfirmBtn = document.querySelector(".habit-picker__button");
let chosenHabitName='';
calendarContainer.classList.add('calendar-container--hidden')

habitConfirmBtn.addEventListener("click", () => {
  
  if (habitInput.value !== "" && searchForName(habitInput.value)!==true) {
    repository.createNewHabit(habitInput.value);
    calendar.innerHTML='';
  chosenHabitName=habitInput.value;
  repository.render(chosenHabitName);
  applyInteraction();
  repository.onChange();
  habitSelect.value=repository.currentHabit.name;
  }
  habitInput.value = "";
});

if(repository.currentHabit!==null){
habitSelect.value=repository.currentHabit.name;
repository.render(repository.currentHabit.name);
applyInteraction()
}

habitSelect.addEventListener('change',onChosenHabit)


function applyInteraction(){
  const nextButton = document.querySelector(".nextBtn");
  const previousButton = document.querySelector(".previousBtn");
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
        repository.currentHabit.calendar[monthIndex].days[dayIndex].maintained = true;
      } else {
        e.currentTarget.classList.remove("habit-status--maintained");
        e.currentTarget.classList.add("habit-status--broken");
        repository.currentHabit.calendar[monthIndex].days[dayIndex].maintained = false;
      }
      const habitMaintainedCount = repository.currentHabit.calendar[monthIndex].days.reduce(
        (maintainedCount, day) => {
          if (day.maintained !== false) {
            maintainedCount += 1;
          }
  
          return maintainedCount;
        },
        0
      );
      repository.currentHabit.calendar[monthIndex].maintained = habitMaintainedCount;
      habitsStateToUpdate.innerHTML = `${habitMaintainedCount}/${repository.currentHabit.calendar[monthIndex].daysLength}`;
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
}

function searchForName(value){
  let isNameTaken = false
  let i=0;
  while(i<repository.habits.length){
    if(value===repository.habits[i].name){
      isNameTaken = true;
      break;
    } 
    i++
  }
  return isNameTaken;
}

function onChosenHabit(){
  calendar.innerHTML='';
  chosenHabitName=selectedHabit.value;
  repository.render(chosenHabitName);
  applyInteraction();
  repository.onChange();
}
