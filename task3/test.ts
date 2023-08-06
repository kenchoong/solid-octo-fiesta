import { findAppointment } from "./index";

describe("findAppointment", () => {
  it("should find the earliest available appointment time", () => {
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
    const duration = 60;
    const result = findAppointment(schedules, duration);
    expect(result).toBe("12:15");
  });

  it("should return null if no suitable time is found", () => {
    const schedules = [
      [
        ["09:00", "11:30"],
        ["12:00", "19:00"],
      ],
      [
        ["09:00", "12:00"],
        ["13:00", "19:00"],
      ],
      [["09:00", "19:00"]],
    ];
    const duration = 60;
    const result = findAppointment(schedules, duration);
    expect(result).toBeNull();
  });

  it("should handle edge cases where the duration just fits", () => {
    const schedules = [
      [
        ["09:00", "10:00"],
        ["11:00", "19:00"],
      ],
      [
        ["09:00", "10:00"],
        ["11:00", "19:00"],
      ],
      [
        ["09:00", "10:00"],
        ["11:00", "19:00"],
      ],
    ];
    const duration = 60;
    const result = findAppointment(schedules, duration);
    expect(result).toBe("10:00");
  });
});
