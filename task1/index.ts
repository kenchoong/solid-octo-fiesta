export async function retryFailures<T>(
  fn: () => Promise<T>,
  retries: number
): Promise<T> {
  try {
    // Attempt to call the target function
    return await fn();
  } catch (error) {
    // If the maximum number of retries is reached, throw the last error
    if (retries <= 1) {
      throw error;
    }
    // Otherwise, retry calling the target function with decerease the retry
    return retryFailures(fn, retries - 1);
  }
}
