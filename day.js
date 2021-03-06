const currentDate = new Date();
currentDate.setHours(0)
currentDate.setMinutes(0)
currentDate.setSeconds(0)

class Day {
  constructor(monthNumber, number, startingDate, maintained) {
    this.dayNumber = number;
    this.monthNumber = monthNumber;
    this.maintained = maintained || false;
    this.startingDate = startingDate;
  }
  createContent() {
    const date = new Date(2020, this.monthNumber, this.dayNumber);
    
    return `
        <div class="day">
        <p class='day__number'>${date.getDate()}</p>
        <p class='day__name'>${checkDayName(date.getDay())}</p>
        <button class="habit-status ${
          date > currentDate || date < this.startingDate
            ? "habit-status--disabled"
            : (this.maintained===true ? "habit-status--maintained" : "habit-status--broken")
        }" ${
      date > currentDate || date < this.startingDate ? "disabled" : ""
    }></button></div>  
        `;
  }
}

function checkDayName(day) {
  switch (day) {
    case 0:
      return "nd";
    case 1:
      return "pon";
    case 2:
      return "wt";
    case 3:
      return "śr";
    case 4:
      return "czw";
    case 5:
      return "pt";
    case 6:
      return "sob";
  }
}

export default Day;
