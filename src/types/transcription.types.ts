import { ObjectId } from "mongoose";

// HTTP Request Body
export interface CreateTranscriptionRequest {
  audioUrl: string;
}

// HTTP Response (controller → client)
export interface CreateTranscriptionResponse {
  _id: string;
}

export interface TranscriptionResult {
  _id: string,
  audioUrl: string,
  transcription: string,
  createdAt: Date
}