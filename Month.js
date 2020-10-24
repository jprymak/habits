import Day from "./day.js";

const currentDate = new Date();

class Month {
  constructor(monthNumber) {
    this.monthNumber = monthNumber;
    this.verifyMonth();
    this.name;
    this.days;
    this.maintained = 0;
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
    let content = "";

    for (let i = 1; i <= this.days; i++) {
      content += new Day(this.monthNumber, i).createContent();
    }

    const month = document.createElement("div");
    month.classList.add("month");
    month.innerHTML = `
      <div class="month__info">
     <span class="month__name">${this.name}</span>
     <span class="month__habits">${this.maintained}/${this.days}</span>
     </div>
     <div class='month__days'>${content}</div>
      `;
    return month;
  }
}

export { Month, currentDate };
