import { Transcription, TranscriptionDoc } from "../models/transcription";

export const transcriptionRepository = {
  async create(audioUrl: string, transcription: string) {
    return Transcription.create({ audioUrl, transcription });
  },
  
  async findCreatedSince(since: Date): Promise<TranscriptionDoc[]> {
    return Transcription.find({
      createdAt: {
        $gt: since
      }
    })
    .sort({
      createdAt: -1
    })
  }
};
