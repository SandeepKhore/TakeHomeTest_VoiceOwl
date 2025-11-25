// tests/transcription.test.ts
import request from "supertest";
import app from "../src/app";

describe("POST /v1/transcription", () => {
  it("returns ID", async () => {
    const res = await request(app)
      .post("/v1/transcription")
      .send({ audioUrl: "http://x.com/a.mp3" });

    expect(res.status).toBe(201);
    expect(res.body._id).toBeDefined();
  });
});

describe("GET /v1/transcriptions", () => {
  it("should return an array of transcriptions created in last 30 days", async () => {
    // create one transcription first
    await request(app)
      .post("/v1/transcription")
      .send({ audioUrl: "https://example.com/sample.mp3" });

    const res = await request(app).get("/v1/transcriptions");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    const item = res.body[0];
    expect(item.audioUrl).toBeDefined();
    expect(item.createdAt).toBeDefined();
  });
});

describe("POST /v1/azure-transcription", () => {
  it("should create a transcription sourced from azure", async () => {
    const res = await request(app)
      .post("/v1/azure-transcription")
      .send({ audioUrl: "https://example.com/test.wav" });

    expect(res.status).toBe(201);
    expect(res.body._id).toBeDefined();

    // Validate record in database
    const list = await request(app).get("/v1/transcriptions");
    const item = list.body.find((x: any) => x._id === res.body._id);

    console.log(item)
    expect(item).toBeDefined();
    expect(item.source).toBe("azure");
  });
});
