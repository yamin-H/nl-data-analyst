const BASE_URL = process.env.NEXT_PUBLIC_API_URL

// types for what we send and receive
export interface UploadResponse {
  message: string
  session_id: string
  schema: {
    columns: string[]
    dtypes: Record<string, string>
    row_count: number
    sample_rows: Record<string, unknown>[]
  }
}

export interface QueryResponse {
  question: string
  sql: string
  results: Record<string, unknown>[]
  summary: string
  chart: string | null
  message: string
}

// upload a file to the backend
export async function uploadFile(file: File): Promise<UploadResponse> {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || "Upload failed")
  }

  return res.json()
}

// send a question to the backend
export async function queryData(
  question: string,
  sessionId: string
): Promise<QueryResponse> {
  const res = await fetch(`${BASE_URL}/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      session_id: sessionId
    })
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || "Query failed")
  }

  return res.json()
};