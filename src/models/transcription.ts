import { Schema, model, InferSchemaType, ObjectId } from "mongoose";

const transcriptionSchema = new Schema({
  audioUrl: {
    type: String,
    required: true
  },
  transcription: {
    type: String,
    required: true
  },
  source: {
    type: String
  }
}, {
  timestamps: true
});

transcriptionSchema.index({ createdAt: 1 });

export type TranscriptionDoc = {
  _id: ObjectId,
  audioUrl: string
  transcription: string,
  source: string,
  createdAt: Date
}

export const Transcription = model<TranscriptionDoc>("Transcription", transcriptionSchema);
