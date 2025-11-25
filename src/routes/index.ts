import { Express } from 'express';
import TranscriptionRoutes from './transcription.routes';
import WorkFlowRoutes from './workflow.routes';

export default function(app: Express) {
  app.use('/v1/', [
    TranscriptionRoutes,
    WorkFlowRoutes,
  ]);
}