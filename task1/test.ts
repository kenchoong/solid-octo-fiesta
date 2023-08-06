import { retryFailures } from "./index";

describe("retryFailures", () => {
  it("should succeed if the target function succeeds", async () => {
    const targetFunction = async () => "success";
    const result = await retryFailures(targetFunction, 3);
    expect(result).toBe("success");
  });

  it("should retry the target function the specified number of times", async () => {
    let attempt = 0;
    const targetFunction = async () => {
      attempt++;
      if (attempt < 3) {
        throw new Error("failure");
      }
      return "success";
    };
    const result = await retryFailures(targetFunction, 3);
    expect(result).toBe("success");
    expect(attempt).toBe(3);
  });

  it("should throw an error if the target function fails more times than allowed retries", async () => {
    const targetFunction = async () => {
      throw new Error("failure");
    };
    await expect(retryFailures(targetFunction, 2)).rejects.toThrow("failure");
  });

  it("should not retry if retries are set to 0", async () => {
    let attempt = 0;
    const targetFunction = async () => {
      attempt++;
      throw new Error("failure");
    };
    await expect(retryFailures(targetFunction, 0)).rejects.toThrow("failure");
    expect(attempt).toBe(1);
  });
});
