

class HabitsRepository{
    constructor(storage, months){
        this.storage=storage
        this.months = storage.get('CALENDAR') || months;
        
    }

    onChange(){
        this.storage.set('CALENDAR', this.months)
    }

    getAll(){
        return this.months;
    }
}

export default HabitsRepository;