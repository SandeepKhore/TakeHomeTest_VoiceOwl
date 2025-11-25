// src/routes/workflow.routes.ts
import { Router } from "express";
import { transition } from "../controllers/workflow.controller";

const router = Router();

router.patch("/workflow/:id", transition);

export default router;
