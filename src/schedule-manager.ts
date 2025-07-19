import {Shift} from "./shift";
import {Employee} from "./employee";

interface ShiftSlot {
    day: string;
    shiftType: string;
    shift: Shift;
    slotNumber: number;
}

export class ScheduleManager {
    private static readonly DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    private static readonly SHIFT_TYPES = ['Morning', 'Afternoon', 'Evening'];

    private employees: Employee[] = [];
    private weekSchedule: Map<string, Map<string, Shift>> = new Map();

    constructor() {
        this.initializeSchedule();
    }

    private initializeSchedule(): void {
        for (const day of ScheduleManager.DAYS) {
            const dailyShifts = new Map<string, Shift>();
            for (const type of ScheduleManager.SHIFT_TYPES) {
                dailyShifts.set(type, new Shift(day, type));
            }
            this.weekSchedule.set(day, dailyShifts);
        }
    }

    public addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }

    public generateSchedule(): void {
        // Reset all assignments
        this.resetEmployeeAssignments();

        // Use a more balanced approach
        this.assignEmployeesBalanced();

        // Fill any remaining understaffed shifts
        this.fillUnderstaffedShifts();
    }

    private resetEmployeeAssignments(): void {
        for (const emp of this.employees) {
            emp.reset();
        }
    }

    private assignEmployeesBalanced(): void {
        // Create a list of all shifts that need staffing
        const allShifts: ShiftSlot[] = [];

        for (const day of ScheduleManager.DAYS) {
            for (const shiftType of ScheduleManager.SHIFT_TYPES) {
                const shift = this.weekSchedule.get(day)!.get(shiftType)!;
                // Each shift needs 2 employees, so create 2 slots
                allShifts.push({ day, shiftType, shift, slotNumber: 1 });
                allShifts.push({ day, shiftType, shift, slotNumber: 2 });
            }
        }

        // Shuffle to randomize assignment order
        this.shuffleArray(allShifts);

        // Sort employees by current workload (ascending)
        for (const slot of allShifts) {
            const availableEmployees = this.employees
                .filter(emp => emp.canWork(slot.day))
                .filter(emp => emp.getAssignedDays() < 5)
                .sort((a, b) => a.getAssignedDays() - b.getAssignedDays());

            if (availableEmployees.length > 0) {
                const selected = this.selectBestEmployee(availableEmployees, slot);
                if (selected !== null) {
                    slot.shift.addEmployee(selected);
                }
            }
        }
    }

    private selectBestEmployee(candidates: Employee[], slot: ShiftSlot): Employee | null {
        // Prefer employees with fewer assigned days
        return candidates.reduce((best, current) =>
            current.getAssignedDays() < best.getAssignedDays() ? current : best
        );
    }

    private fillUnderstaffedShifts(): void {
        for (const day of ScheduleManager.DAYS) {
            for (const shiftType of ScheduleManager.SHIFT_TYPES) {
                const shift = this.weekSchedule.get(day)!.get(shiftType)!;
                while (!shift.hasMinimumStaff()) {
                    const availableEmp = this.findAvailableEmployee(day);
                    if (availableEmp === null) {
                        console.log(`Warning: Unable to meet minimum staffing for ${day} ${shiftType}`);
                        break;
                    }
                    shift.addEmployee(availableEmp);
                }
            }
        }
    }

    private findAvailableEmployee(day: string): Employee | null {
        return this.employees
            .filter(emp => emp.canWork(day))
            .filter(emp => emp.getAssignedDays() < 5)
            .reduce((best, current) => {
                if (best === null) return current;
                return current.getAssignedDays() < best.getAssignedDays() ? current : best;
            }, null as Employee | null);
    }

    public printSchedule(): void {
        console.log('\n=== WEEKLY SCHEDULE ===');
        for (const day of ScheduleManager.DAYS) {
            console.log(`\n=== ${day} ===`);
            const shifts = this.weekSchedule.get(day)!;
            for (const type of ScheduleManager.SHIFT_TYPES) {
                const shift = shifts.get(type)!;
                const employees = shift.getAssignedEmployees();
                const employeeNames = employees.map(e => e.getName()).join(' ');

                if (employees.length === 0) {
                    console.log(`${type.padEnd(10)}: No employees assigned`);
                } else {
                    console.log(`${type.padEnd(10)}: ${employeeNames} (${employees.length} employees)`);
                }
            }
        }

        // Print employee workload summary
        this.printWorkloadSummary();
    }

    private printWorkloadSummary(): void {
        console.log('\n=== EMPLOYEE WORKLOAD SUMMARY ===');
        for (const emp of this.employees) {
            console.log(`${emp.getName()}: ${emp.getAssignedDays()} days assigned`);
        }
    }

    private shuffleArray<T>(array: T[]): void {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}