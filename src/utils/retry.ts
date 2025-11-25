export async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 500,
  backoff = false
): Promise<T> {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      console.log(`Retry ${i + 1}/${retries} failed`);

      let delay = delayMs;
      if (backoff) {
      // Exponential backoff
        delay = delayMs * Math.pow(2, i);
      }

      await new Promise((res) => setTimeout(res, delay));
    }
  }

  throw lastError;
}
