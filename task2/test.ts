import { defaultArguments } from "./index";

// Example function for testing
function add(a: number, b: number) {
  return a + b;
}

describe("defaultArguments", () => {
  it("should apply default arguments", () => {
    const addWithDefaultB = defaultArguments(add, { b: 9 });
    expect(addWithDefaultB(10)).toBe(19);
  });

  it("should use provided arguments over defaults", () => {
    const addWithDefaultB = defaultArguments(add, { b: 9 });
    expect(addWithDefaultB(10, 7)).toBe(17);
  });

  it("should handle missing defaults", () => {
    const addWithDefaultB = defaultArguments(add, {});
    expect(addWithDefaultB(10)).toBeNaN(); // No default for 'b', so result is NaN
  });

  it("should allow repeated calls to change defaults", () => {
    const addWithDefaults = defaultArguments(add, { b: 9, a: 2 });
    expect(addWithDefaults()).toBe(11); // a=2, b=9

    const addWithNewDefaults = defaultArguments(addWithDefaults, { a: 5 });
    expect(addWithNewDefaults()).toBe(14); // a=5, b=9 (inherited from previous defaults)
  });
});
