import { Transcription, TranscriptionDoc } from "../models/transcription";

export const transcriptionRepository = {
  async create(audioUrl: string, transcription: string, source: string = 'internal') {
    return Transcription.create({ audioUrl, transcription, source });
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
