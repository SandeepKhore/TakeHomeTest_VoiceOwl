export async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 500
): Promise<T> {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      console.log(`Retry ${i + 1}/${retries} failed`);
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }

  throw lastError;
}
