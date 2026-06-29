import { create } from "zustand"

interface SessionState {
  sessionId: string | null
  schema: {
    columns: string[]
    dtypes: Record<string, string>
    row_count: number
    sample_rows: Record<string, unknown>[]
  } | null
  setSession: (sessionId: string, schema: SessionState["schema"]) => void
  clearSession: () => void
};

export const useSessionStore = create<SessionState>((set) => ({
    sessionId: null,
    schema: null,

    setSession: (sessionId, schema) => set({
        sessionId,
        schema
    }),

    clearSession: () => set({
        sessionId: null,
        schema: null
    })
}));