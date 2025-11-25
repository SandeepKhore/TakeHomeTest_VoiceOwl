# VoiceOwl Backend — Developer Evaluation Task
Node.js + TypeScript backend service for audio transcription storage and retrieval.
Implements required API endpoints, MongoDB storage, Azure STT mock integration, and scalability strategy.

## Tech Stack
- Node.js + TypeScript
- Express.js
- MongoDB + Mongoose
- ts-jest + Jest (tests)
- Dotenv for environment variables

## Project Structure
The project follows a Clean modular backend structure using:
```text
Controller → Service → Repository → Model
```
This keeps responsibilities isolated and makes scaling, testing, and refactoring easy.

```text
TakeHomeTest_VoiceOwl/
├─ src/
│  ├─ config/
│  │   └─ db.ts
│  ├─ models/
│  │   └─ transcription.ts
│  ├─ repositories/
│  │   └─ transcription.repository.ts
│  ├─ services/
│  │   ├─ transcription.service.ts
│  │   └─ azure.service.ts
│  ├─ controllers/
│  │   └─ transcription.controller.ts
│  ├─ routes/
│  │   ├─ index.ts
│  │   └─ transcription.routes.ts
│  ├─ utils/
│  │   ├─ downloadAudio.ts
│  │   ├─ logger.ts
│  │   └─ retry.ts
│  ├─ index.ts
│  └─ app.ts
├─ tests/
│   └─ transcription.test.ts
├─ .env
├─ .gitignore
├─ jest.config.ts
├─ package.json
├─ tsconfig.json
└─ README.md
```
---
## Part 1 — Backend API
Endpoint: POST /transcription
Creates a mock transcription record.
Request:
```json
{
  "audioUrl": "https://example.com/test.mp3"
}
```
Process:
1. Download audio (mocked)
2. Extract mock text ("transcribed text")
3. Save to MongoDB
4. Return _id
Response:
```json
{ "id": "65fb413be8..." }
```
---
## Part 2 - MongoDB Query: Fetch Last 30 Days
Endpoint: GET /transcriptions
Returns all documents created in the last 30 days.
Logic:
- Compute sinceDate = today - 30 days
- Query:
```ts
Transcription.find({ createdAt: { $gte: sinceDate } });
```
Index Strategy
Since most queries fetch recent data, we create an index on createdAt:
```ts
db.transcriptions.createIndex({ createdAt: 1 });
```
### Why ascending (1)?
- Our dataset grows chronologically (old → new).
- Range scans like >= sinceDate are sequential on the B-tree
- Better cache locality & fewer page faults at scale

### Scaling to 100M+ records
- TTL Index
- Archive strategy
Move >90-day records to:
- Archive collection
- Data lake (S3/BigQuery/Redshift)

---
## Part 3 - Scalability & System Design
Below is what I would do to scale the transcription service to 10k+ concurrent requests.
1. Horizontal Scaling
- Containerize (Docker)
- Deploy multiple replicas
- Use LoadBalancer
Process flow:
```text
Client → LB → API replicas → queue → workers
```
This decouples request load from processing cost.

2. Async Processing
Avoid doing transcription in-request.
Flow:
```text
POST /transcription → enqueue → respond immediately
Worker → download → STT → store result
```
Use:
- Redis Queue (BullMQ)
- RabbitMQ
This prevents blocking and allows linear scale-out.

3. DB Optimization
Indexing
- `{ createdAt: 1 }` for time range
Sharding (MongoDB Atlas)
Shard key:
```ts
{ createdAt: 1 }
```

4. Caching
Level 1
In-memory (Node):
- Recently fetched items
- Batched GET calls
Level 2
Redis:
- GET /transcriptions cached for minute-level TTL

5. Autoscaling
Example:
- If queue > 500 messages → add workers
- If CPU > 70% → add API replicas

6. Observability
- Prometheus metrics
- NewRelic
