import { Router } from "express";
import { addTranscription } from "../controllers/transcription.controller";

const router = Router();

router.post("/transcription", addTranscription);

export default router;
