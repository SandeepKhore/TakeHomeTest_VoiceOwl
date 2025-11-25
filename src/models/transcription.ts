import { Schema, model } from "mongoose";

const transcriptionSchema = new Schema({
  audioUrl: { 
    type: String, 
    required: true
   },
  transcription: { 
    type: String, 
    required: true 
  },
}, {
  timestamps: true
});

export const Transcription = model("Transcription", transcriptionSchema);
