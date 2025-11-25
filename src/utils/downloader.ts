export async function downloadAudio(url: string): Promise<string> {
  // Fail if random below 0.3 to simulate network connection broken
  const failed = Math.random() < 0.3;
  if (failed) {
    throw new Error("Audio download failed");
  }

  // Return fake local path
  return `local-cache/${Date.now()}.mp3`;
}
