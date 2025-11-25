import { Request, Response } from "express";
import { CreateTranscriptionRequest, CreateTranscriptionResponse } from "../types/transcription.types";
import { processTranscription } from "../services/transcription.service";
import logger from "../utils/logger";

export async function createTranscription(req: Request<{}, {}, CreateTranscriptionRequest>, res: Response) {
  try {
    const record = await processTranscription(req.body.audioUrl);

    const response: CreateTranscriptionResponse = { _id: record._id.toString() }
    res.status(201).json(response);
  } catch (err: any) {
    logger.error('Create transcription failed', err)
    res.status(400).json({ error: err.message });
  }
}
