// HTTP Request Body
export interface CreateTranscriptionRequest {
  audioUrl: string;
}

// HTTP Response (controller → client)
export interface CreateTranscriptionResponse {
  _id: string;
}