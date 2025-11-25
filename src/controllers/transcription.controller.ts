import { Request, Response } from "express";
import { processTranscription } from "../services/transcription.service";
import logger from "../utils/logger";

export async function createTranscription(req: Request, res: Response) {
  try {
    const record = await processTranscription(req.body.audioUrl);
    res.status(201).json({ _id: record._id });
  } catch (err: any) {
    logger.error('Create transcription failed', err)
    res.status(400).json({ error: err.message });
  }
}
