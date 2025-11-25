import { Request, Response } from "express";
import { moveWorkflow } from "../services/workflow.service";

export const transition = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { next } = req.body; // review or approval

    const doc = await moveWorkflow(id, next);
    res.json(doc);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
