import { Month } from "./Month";

class HabitsRepository {
  constructor(storage, months) {
    this.habits = [];
    this.storage = storage;
    this.months = storage.get("CALENDAR") || months;
  }

  render() {
    const calendar = document.querySelector(".calendar");

    for (let i = 0; i <= 11; i++) {
      const { name, days, maintained, daysLength } = this.months[i];

      calendar.appendChild(
        new Month(i, name, days, maintained, daysLength).createContent()
      );
    }
  }

  onChange() {
    this.storage.set("CALENDAR", this.months);
  }

  getAll() {
    return this.months;
  }
}

export default HabitsRepository;
