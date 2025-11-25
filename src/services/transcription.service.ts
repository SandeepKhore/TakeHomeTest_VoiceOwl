import { transcriptionRepository } from "../repositories/transcription.repository";
import logger from "../utils/logger";

export async function processTranscription(audioUrl: string) {
  if (!audioUrl) throw new Error("audioUrl is required");

  // --- Mock audio download ---
  logger.log("Mock download:", audioUrl);

  // --- Mock transcription ---
  const dummyText = "transcribed text";

  // save to DB
  const record = await transcriptionRepository.create(audioUrl, dummyText);
  return record;
}
