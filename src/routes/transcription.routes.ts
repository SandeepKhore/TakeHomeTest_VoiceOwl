import { Router } from "express";
import { 
  createTranscription,
  getTranscriptions,
  azureTranscribe,
} from "../controllers/transcription.controller";

const router = Router();

router.post("/transcription", createTranscription);

router.get('/transcriptions', getTranscriptions);

router.post("/azure-transcription", azureTranscribe);


export default router;
