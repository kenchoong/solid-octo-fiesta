import { retryFailures } from "./task1/index";
import { defaultArguments } from "./task2/index";
import { findAppointment } from "./task3/index";

// Function define in requirement
function createTargetFunction(succeedsOnAttempt: number) {
  let attempt = 0;
  return async () => {
    if (++attempt === succeedsOnAttempt) {
      return attempt;
    }
    throw Object.assign(new Error(`failure`), { attempt });
  };
}

// Task 1: Retry Failures
console.log("== Testing Task 1 ==");
const targetFunction1 = createTargetFunction(5); // Modify succeedsOnAttempt here
retryFailures(targetFunction1, 5) // Modify retry count here
  .then((result) => console.log("Result:", result))
  .catch((error) => console.error("Error:", error));

// Task 2: Default Arguments
console.log("== Testing Task 2 ==");
function add(a: any, b: any) {
  return a + b;
}
const newFunction = defaultArguments(add, { b: 9 }); // Modify defaults here
const result2 = newFunction(10); // Modify variable here
console.log("Result:", result2);

// Task 3: Find Appointment
console.log("== Testing Task 3 ==");

// Modify schedules here
const schedules = [
  [
    ["09:00", "11:30"],
    ["13:30", "16:00"],
    ["16:00", "17:30"],
    ["17:45", "19:00"],
  ],
  [
    ["09:15", "12:00"],
    ["14:00", "16:30"],
    ["17:00", "17:30"],
  ],
  [
    ["11:30", "12:15"],
    ["15:00", "16:30"],
    ["17:45", "19:00"],
  ],
];

// Modify duration here
let duration = 60;

const result3 = findAppointment(schedules, duration);
console.log("Result:", result3);
