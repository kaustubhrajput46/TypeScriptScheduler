import {Employee} from "./employee";

export class Shift {
    private static readonly MIN_EMPLOYEES = 2;

    private day: string;
    private type: string; // "Morning", "Afternoon", "Evening"
    private assignedEmployees: Employee[] = [];

    constructor(day: string, type: string) {
        this.day = day;
        this.type = type;
    }

    public isFull(): boolean {
        return this.assignedEmployees.length >= Shift.MIN_EMPLOYEES;
    }

    public hasMinimumStaff(): boolean {
        return this.assignedEmployees.length >= Shift.MIN_EMPLOYEES;
    }

    public addEmployee(employee: Employee): boolean {
        if (employee.canWork(this.day)) {
            this.assignedEmployees.push(employee);
            employee.assignToDay(this.day);
            return true;
        }
        return false;
    }

    public getDay(): string {
        return this.day;
    }

    public getType(): string {
        return this.type;
    }

    public getAssignedEmployees(): Employee[] {
        return [...this.assignedEmployees];
    }

    public getCurrentStaffCount(): number {
        return this.assignedEmployees.length;
    }
}