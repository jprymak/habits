const currentDate = new Date();
const habitStartedDate = new Date(2020, 9, 1);
class Month {
  constructor(monthNumber) {
    this.monthNumber = monthNumber;
    this.name;
    this.days;
  }

  verifyMonth() {
    switch (this.monthNumber) {
      case 0:
        this.name = "Styczeń";
        this.days = 31;
        break;
      case 2:
        this.name = "Marzec";
        this.days = 31;
        break;
      case 4:
        this.name = "Maj";
        this.days = 31;
        break;
      case 6:
        this.name = "Lipiec";
        this.days = 31;
        break;
      case 7:
        this.name = "Sierpień";
        this.days = 31;
        break;
      case 9:
        this.name = "Październik";
        this.days = 31;
        break;
      case 11:
        this.name = "Grudzień";
        this.days = 31;
        break;

      case 1:
        this.name = "Luty";
        this.days = 28;
        break;

      case 3:
        this.name = "Kwiecień";
        this.days = 30;
        break;
      case 5:
        this.name = "Czerwiec";
        this.days = 30;
        break;
      case 8:
        this.name = "Wrzesień";
        this.days = 30;
        break;
      case 10:
        this.name = "Listopad";
        this.days = 30;
        break;
    }
  }

  createContent() {
    this.verifyMonth();
    let content = "";
    for (let i = 1; i <= this.days; i++) {
      const date = new Date(2020, this.monthNumber, i);
      content += `<div class='day'>
        <p class='day__number'>${date.getDate()}</p>
        <p class='day__name'>${checkDayName(date.getDay())}</p>
        <button class="habit-status ${
          date > currentDate || date < habitStartedDate
            ? "habit-status--disabled"
            : ""
        }" ${
        date > currentDate || date < habitStartedDate ? "disabled" : ""
      }></button></div>`;
    }
    const month = document.createElement("div");
    month.classList.add("month");
    month.innerHTML = `
      <div class="month__info">
     <span class="month__name">${this.name}</span>
     <span class="month__habits">0/${this.days}</span>
     </div>
     <div class='month__days'>${content}</div>
      `;
    return month;
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

export { Month, currentDate };
