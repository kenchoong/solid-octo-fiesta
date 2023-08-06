// convert "hh:mm" to minutes value
// start time default 9am as stated in requirement
function getMinutes(time: string, startTime: string = "09:00"): number {
  const [hours, minutes] = time.split(":").map(Number);
  const [startHours] = startTime.split(":").map(Number);
  return (hours - startHours) * 60 + minutes;
}

// convert minutes value to "hh:mm"
// start time default 9am as stated in requirement
function convertToTime(
  minutesValue: number,
  startTime: string = "09:00"
): string {
  const [startHours] = startTime.split(":").map(Number);
  const hours = Math.floor(minutesValue / 60) + startHours;
  const minutes = minutesValue % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}

function isSlotAvailable(
  availabilities: number[][][],
  i: number,
  duration: number
): boolean {
  return availabilities.every((schedule) =>
    schedule.some(([start, end]) => start <= i && end >= i + duration)
  );
}

/**
 *
 * @param schedule: string[][] // 2 dimension string array
 * @param workingStart
 * @param workingEnd
 * @param duration
 * @returns availableSlots []
 */
const findAvailability = (
  schedule: string[][],
  workingStart: number,
  workingEnd: number,
  duration: number
): number[][] => {
  let availableSlots = [];

  // initialize a variable
  // original is the start of working hours
  let lastEnd = workingStart;

  schedule.forEach(([start, end]) => {
    const startMinutes = getMinutes(start);
    const endMinutes = getMinutes(end);
    // if start minutes and the last end more than duration
    // this is 1 available slot
    // store it inside the array
    if (startMinutes - lastEnd >= duration) {
      availableSlots.push([lastEnd, startMinutes]);
    }
    // update the lastEnd variable
    // the slot end minutes, then start the process again
    lastEnd = endMinutes;
  });

  // after loop all the schedule
  // check with the lastEnd (the time that end in loop)
  // if between last end and workingEnd hours still enough time
  // then insert another slot as well
  if (workingEnd - lastEnd >= duration) {
    availableSlots.push([lastEnd, workingEnd]);
  }

  return availableSlots;
};

/**
 *
 * @param schedules: string[][][]
 * 3 dimensional array, 1 array, 3 person,
 *  each 1 array, each array multiple timeslot
 *  Sample data 
    let schedules = [
        [
            ["09:00", "11:30"],  // person 1
            ["13:30", "16:00"],
            ["16:00", "17:30"],
            ["17:45", "19:00"],
        ],
        [
            ["09:15", "12:00"], // person 2
            ["14:00", "16:30"],
            ["17:00", "17:30"],
        ],
        [
            ["11:30", "12:15"], // person 3 
            ["15:00", "16:30"],
            ["17:45", "19:00"],
        ],
    ];
 * @param duration: number
 * @returns null | string (format = hh:mm)
 */
export function findAppointment(
  schedules: string[][][],
  duration: number
): string | null {
  // Convert working hours to minutes
  const workingStart = getMinutes("09:00");
  const workingEnd = getMinutes("19:00");

  // Find available slots for each person
  const availabilities = schedules.map((item) =>
    findAvailability(item, workingStart, workingEnd, duration)
  );

  // Find common availability
  for (let i = workingStart; i <= workingEnd - duration; i++) {
    if (isSlotAvailable(availabilities, i, duration)) {
      return convertToTime(i);
    }
  }

  // No suitable time found
  return null;
}
