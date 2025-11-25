import { Router } from "express";
import { createTranscription, getTranscriptions } from "../controllers/transcription.controller";

const router = Router();

router.post("/transcription", createTranscription);

router.get('/transcriptions', getTranscriptions);

export default router;
