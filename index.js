// Import stylesheets
import "./style.css";
import Month from "./months.js";
// import { dates, january } from "./dates";

// Write Javascript code!

const calendar = document.querySelector(".calendar");
const nextButton = document.querySelector(".nextBtn");
const previousButton = document.querySelector(".previousBtn");

for (let i = 0; i <= 11; i++) {
  calendar.appendChild(new Month(i).createContent());
}

const calendarMonths = document.querySelectorAll(".month");

calendarMonths.forEach((month, index) => {
  if (index === 0 || index === 1 || index === 2) {
    month.classList.add("month--displayed");
  }
});

nextButton.addEventListener("click", displayNextMonth);
previousButton.addEventListener("click", displayPreviousMonth);

let visibleMonths = document.querySelectorAll(".month--displayed");

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
