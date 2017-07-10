export class Timestamp{
    public name: string;
    public description: string;
    public categories: string[];
    public startHour: number;
    public startMinute: number;
    public endHour: number;
    public endMinute: number;
    public day: number;
    public month: number;
    public year: number;
    
    constructor (name: string, 
    description: string, 
    categories: string[],
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number,
    day: number,
    month: number,
    year: number){
        this.name = name;
        this.description = description;
        this.categories = categories;
        this.startHour = startHour;
        this.startMinute = startMinute;
        this.endHour = endHour;
        this.endMinute = endMinute;
        this.day = day;
        this.month = month;
        this.year = year;
    }
} 