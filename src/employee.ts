export class Employee {
    private name: string;
    private assignedShiftDays: Set<string> = new Set();
    private shiftPriorities: Map<string, Map<string, number>> = new Map();
    private assignedDays: number = 0;

    constructor(name: string) {
        this.name = name;
    }

    public addPreference(day: string, shift: string, priority: number): void {
        if (!this.shiftPriorities.has(day)) {
            this.shiftPriorities.set(day, new Map());
        }
        this.shiftPriorities.get(day)!.set(shift, priority);
    }

    public canWork(day: string): boolean {
        return !this.assignedShiftDays.has(day) && this.assignedDays < 5;
    }

    public assignToDay(day: string): void {
        this.assignedShiftDays.add(day);
        this.assignedDays++;
    }

    public reset(): void {
        this.assignedShiftDays.clear();
        this.assignedDays = 0;
    }

    public getPreferencesForDay(day: string): Map<string, number> {
        return this.shiftPriorities.get(day) || new Map();
    }

    public incrementAssignedDays(): void {
        this.assignedDays++;
    }

    public getAssignedDays(): number {
        return this.assignedDays;
    }

    public getName(): string {
        return this.name;
    }
}