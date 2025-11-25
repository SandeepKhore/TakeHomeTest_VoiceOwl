import { Transcription } from "../models/transcription";

export const transcriptionRepository = {
  async create(audioUrl: string, transcription: string) {
    return Transcription.create({ audioUrl, transcription });
  }
};
