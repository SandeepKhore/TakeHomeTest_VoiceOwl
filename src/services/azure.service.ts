// Repositories
import { transcriptionRepository }  from "../repositories/transcription.repository";

// Utils
import { downloadAudio } from "../utils/downloader";

export async function azureTranscribe(audioUrl: string) {
  await downloadAudio(audioUrl);

  //  Real implementation idea mentioned below to avoid blocking memory
  const azureText = "azure mocked transcription";

  const doc = await transcriptionRepository.create(audioUrl, azureText);

  return doc._id;
}

/**
 * NOTES:
 * Stream-based version
 * This avoids memory bloat for large files.
 */
/*
import https from "https";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
const pushStream = sdk.AudioInputStream.createPushStream();
https.get(audioUrl, (res) => {
  res.on("data", chunk => pushStream.write(chunk));
  res.on("end", () => pushStream.close());
});
*/