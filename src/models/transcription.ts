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
  },
  status: {
      type: String,
      enum: ["transcription", "review", "approval"],
      default: "transcription",
  },
}, {
  timestamps: true
});

transcriptionSchema.index({ createdAt: 1 });

export type TranscriptionDoc = {
  _id: ObjectId,
  audioUrl: string
  transcription: string,
  source: string,
  status: string
  createdAt: Date
}

export const Transcription = model<TranscriptionDoc>("Transcription", transcriptionSchema);
