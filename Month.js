import Day from "./day.js";

const currentDate = new Date();

class Month {
  constructor(monthNumber, name, days, maintained, daysLength) {
    this.monthNumber = monthNumber;
    this.name = name;
    this.daysLength = daysLength;
    this.verifyMonth();
    this.days = days || this.createDays();

    this.maintained = maintained || 0;
  }

  verifyMonth() {
    switch (this.monthNumber) {
      case 0:
        this.name = "Styczeń";
        this.daysLength = 31;
        break;
      case 2:
        this.name = "Marzec";
        this.daysLength = 31;
        break;
      case 4:
        this.name = "Maj";
        this.daysLength = 31;
        break;
      case 6:
        this.name = "Lipiec";
        this.daysLength = 31;
        break;
      case 7:
        this.name = "Sierpień";
        this.daysLength = 31;
        break;
      case 9:
        this.name = "Październik";
        this.daysLength = 31;
        break;
      case 11:
        this.name = "Grudzień";
        this.daysLength = 31;
        break;

      case 1:
        this.name = "Luty";
        this.daysLength = 28;
        break;

      case 3:
        this.name = "Kwiecień";
        this.daysLength = 30;
        break;
      case 5:
        this.name = "Czerwiec";
        this.daysLength = 30;
        break;
      case 8:
        this.name = "Wrzesień";
        this.daysLength = 30;
        break;
      case 10:
        this.name = "Listopad";
        this.daysLength = 30;
        break;
    }
  }

  createContent() {
    let content = "";

    this.days.forEach((day) => {
      content += new Day(
        this.monthNumber,
        day.dayNumber,
        day.maintained
      ).createContent();
    });

    const month = document.createElement("div");
    month.classList.add("month");
    month.innerHTML = `
      <div class="month__info">
     <span class="month__name">${this.name}</span>
     <span class="month__habits">${this.maintained}/${this.daysLength}</span>
     </div>
     <div class='month__days'>${content}</div>
      `;
    return month;
  }

  createDays() {
    const createdDays = [];
    for (let i = 1; i <= this.daysLength; i++) {
      createdDays.push(new Day(this.monthNumber, i));
    }
    return createdDays;
  }
}
console.log(new Month(0))
export { Month, currentDate };
