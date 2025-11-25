import { transcriptionRepository } from "../repositories/transcription.repository";
import { retry } from "../utils/retry";
import { downloadAudio } from "../utils/downloader";
import logger from "../utils/logger";

export async function processTranscription(audioUrl: string) {
  if (!audioUrl) throw new Error("audioUrl is required");

  // --- Retry download ---
  const audioPath = await retry(
    () => downloadAudio(audioUrl),
    3,   // max attempts
    500  // delay in ms
  );

  // --- Mock transcription ---
  const dummyText = "transcribed text";

  // save to DB
  const record = await transcriptionRepository.create(audioUrl, dummyText);
  return record;
}
