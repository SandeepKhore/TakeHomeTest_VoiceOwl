import { Express } from 'express';
import TranscriptionRoutes from './transcription.routes';

export default function(app: Express) {
  app.use('/v1/', [
    TranscriptionRoutes
  ]);
}