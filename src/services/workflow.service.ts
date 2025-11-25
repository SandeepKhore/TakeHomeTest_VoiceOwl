import { Transcription } from "../models/transcription";

const transitions: Record<string, string[]> = {
  transcription: ["review"],
  review: ["approval"],
  approval: []
};

export const moveWorkflow= async (id: string, next: "review" | "approval") => {
  const doc = await Transcription.findById(id);
  if (!doc) throw new Error("Document not found");

  const allowedNextStates = transitions[doc.status];
  if (!allowedNextStates.includes(next)) {
    throw new Error(`Invalid transition: ${doc.status} → ${next}`);
  }

  doc.status = next;
  await doc.save();
  return doc;
}
