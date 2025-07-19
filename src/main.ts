import {Employee} from "./employee";
import {ScheduleManager} from "./schedule-manager";

function main(): void {
    const manager = new ScheduleManager();

    const employees = [
        new Employee('John'),
        new Employee('Mary'),
        new Employee('Peter'),
        new Employee('Sarah'),
        new Employee('Mike'),
        new Employee('Lisa'),
        new Employee('David'),
        new Employee('Emma')
    ];

    for (const emp of employees) {
        addEmployeePreferences(emp);
        manager.addEmployee(emp);
    }

    // Generate and print schedule
    manager.generateSchedule();
    manager.printSchedule();
}

function addEmployeePreferences(emp: Employee): void {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const shifts = ['Morning', 'Afternoon', 'Evening'];

    // Ensure each employee has preferences for all days
    for (const day of days) {
        // Add all shifts with different priorities
        let priority = 3;
        for (const shift of shifts) {
            emp.addPreference(day, shift, priority--);
        }
    }
}

// Run the application
main();