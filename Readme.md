
# Employee Scheduler TypeScript

A TypeScript-based employee scheduling system that automatically generates weekly schedules while balancing workloads and managing staffing constraints.

## Features

- **Automated Schedule Generation**: Creates weekly schedules for 7 days with morning, afternoon, and evening shifts
- **Workload Balancing**: Ensures fair distribution of shifts among employees (max 5 days per employee)
- **Constraint Management**: Prevents scheduling conflicts and manages minimum staffing requirements
- **Smart Warnings**: Alerts when minimum staffing levels cannot be met
- **Flexible Architecture**: Easy to extend and modify for different scheduling needs

## Prerequisites

- Node.js (version 22.x or higher recommended)
- npm package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd employee-scheduler-ts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development Mode
Run the application directly with TypeScript:
```
bash
npm run dev
```
### Production Build
1. Build the application:
   ```bash
   npm run build
   ```

2. Run the compiled JavaScript:
   ```bash
   npm start
   ```

### Other Commands
- **Watch mode** (auto-rebuild on changes):
  ```bash
  npm run watch
  ```

- **Clean build directory**:
  ```bash
  npm run clean
  ```

## How It Works

The scheduler operates with the following constraints:
- **21 shifts per week** (7 days × 3 shifts per day)
- **Minimum 2 employees per shift** (preferred staffing level)
- **Maximum 5 working days per employee** (work-life balance)
- **No employee works multiple shifts on the same day**

### Sample Output
```

=== WEEKLY SCHEDULE ===

=== Monday ===
Morning   : Peter Mary (2 employees)
Afternoon : David Emma (2 employees)
Evening   : Mike Sarah (2 employees)

...

=== EMPLOYEE WORKLOAD SUMMARY ===
John: 5 days assigned
Mary: 5 days assigned
Peter: 5 days assigned
...
```
## Architecture

The application consists of several key components:

- **Employee**: Manages individual employee data, availability, and assignments
- **Shift**: Represents individual shifts with staffing requirements
- **ScheduleManager**: Core scheduling logic and constraint management
- **Main**: Application entry point and employee setup

## Technical Details

- **Language**: TypeScript 5.0.0
- **Target**: ES2020
- **Module System**: CommonJS
- **Build Output**: `dist/` directory
- **Source Maps**: Enabled for debugging

## Configuration

The scheduler is currently configured for:
- 8 employees
- 7 days per week
- 3 shifts per day (Morning, Afternoon, Evening)
- Maximum 5 working days per employee

These parameters can be modified in the source code to fit different organizational needs.

## Known Limitations

Due to mathematical constraints (8 employees × 5 days = 40 employee-days vs. 21 shifts × 2 employees = 42 required slots), some shifts may be understaffed. The system will warn about these situations.

## License

MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For issues or questions, please create an issue in the project repository.

