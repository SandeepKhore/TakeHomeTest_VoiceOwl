import { Router } from "express";
import { createTranscription } from "../controllers/transcription.controller";

const router = Router();

router.post("/transcription", createTranscription);

export default router;
