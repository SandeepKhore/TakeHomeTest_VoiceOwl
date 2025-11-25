// tests/transcription.test.ts
import request from "supertest";
import app from "../src/app";

describe("POST /transcription", () => {
  it("returns ID", async () => {
    const res = await request(app)
      .post("/v1/transcription")
      .send({ audioUrl: "http://x.com/a.mp3" });

    expect(res.status).toBe(200);
    expect(res.body._id).toBeDefined();
  });
});
