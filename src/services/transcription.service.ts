// Repositories
import { transcriptionRepository } from "../repositories/transcription.repository";

// Types
import { TranscriptionResult } from "../types/transcription.types";

// Utils
import { retry } from "../utils/retry";
import { downloadAudio } from "../utils/downloader";

export const processTranscription = async (audioUrl: string) => {
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

export async function getRecentTranscriptions(days = 30): Promise<TranscriptionResult[]> {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const records = await transcriptionRepository.findCreatedSince(since);

  return records.map((doc) => ({
    _id: doc._id.toString(),
    audioUrl: doc.audioUrl,
    transcription: doc.transcription,
    createdAt: doc.createdAt,
    source: doc.source,
    status: doc.status
  }));
}
