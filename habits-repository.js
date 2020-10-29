import { Month } from "./Month";
import { v4 as uuidv4 } from 'uuid';
class HabitsRepository {
  constructor(storage, months) {
    this.habits = storage.get("HABITS") || [];
    this.storage = storage;
    this.currentHabit = null;
  }

  createNewHabit(name) {
    const calendar = [];
    const id = uuidv4();
    for (let i = 0; i <= 11; i++) {
        calendar.push(new Month(i))
    }
    const newHabit = { id, name, calendar };
    this.habits.push(newHabit);
    this.updateOptions(this.habits)
  }

  render(chosenHabitName) {
    for(let i=0;i<this.habits.length;i++){
      if(this.habits[i].name===chosenHabitName){
        this.currentHabit=this.habits[i];
        break;
      }
      
    }
    console.log(this.currentHabit)
    const calendarContainer = document.querySelector(".calendar-container");
    const calendar = document.querySelector(".calendar");

    calendarContainer.classList.remove('calendar-container--hidden')

    for (let i = 0; i <= 11; i++) {
      const { name, days, maintained, daysLength } = this.currentHabit.calendar[i];

      calendar.appendChild(
        new Month(i, name, days, maintained, daysLength).createContent()
      );
    }
  }

  onChange() {
    this.storage.set("HABITS", this.habits);
  }

  getAll() {
    return this.months;
  }

  updateOptions(habits){
    const selectForm = document.querySelector(".habit-picker__select");
    selectForm.innerHTML='';
    habits.forEach(habit=>{
        const option = document.createElement('option')
        option.value = habit.name;
        option.innerHTML = habit.name;
        selectForm.appendChild(option)
        this.onChange()
    })
  }
}

export default HabitsRepository;
