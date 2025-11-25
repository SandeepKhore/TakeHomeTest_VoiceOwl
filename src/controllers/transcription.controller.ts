import { Request, Response } from "express";
import { CreateTranscriptionRequest, CreateTranscriptionResponse } from "../types/transcription.types";
import { processTranscription, getRecentTranscriptions } from "../services/transcription.service";
import logger from "../utils/logger";

export const createTranscription = async (req: Request<{}, {}, CreateTranscriptionRequest>, res: Response) => {
  try {
    const record = await processTranscription(req.body.audioUrl);

    const response: CreateTranscriptionResponse = { _id: record._id.toString() }
    res.status(201).json(response);
  } catch (err: any) {
    logger.error('Create transcription failed', err)
    res.status(400).json({ error: err.message });
  }
}

export const getTranscriptions = async (req: Request, res: Response) => {
  try {
    const records = await getRecentTranscriptions();

    res.status(200).json(records);
  } catch (err: any) {
    logger.error('Get transcriptions failed', err)
    res.status(400).json({ error: err.message });
  }
}
