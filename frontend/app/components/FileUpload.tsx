"use client"

import { useRef, useState } from "react"
import { uploadFile } from "../services/api"
import { useSessionStore } from "../store/sessionStore"

export default function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const setSession = useSessionStore((state) => state.setSession)
  const schema = useSessionStore((state) => state.schema)

  async function handleFile(file: File) {
    setError(null)
    setUploading(true)

    try {
      const data = await uploadFile(file)
      setSession(data.session_id, data.schema)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  };

  // if file already uploaded show schema preview
  if (schema) {
    return (
      <div className="border border-green-500 rounded-xl p-6 bg-green-950/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-green-400 font-semibold text-lg">
            ✅ File Uploaded Successfully
          </h2>
          <button
            onClick={() => useSessionStore.getState().clearSession()}
            className="text-sm text-gray-400 hover:text-white underline"
          >
            Upload new file
          </button>
        </div>
        <div className="text-sm text-gray-300 space-y-1">
          <p><span className="text-gray-500">Rows:</span> {schema.row_count}</p>
          <p><span className="text-gray-500">Columns:</span> {schema.columns.join(", ")}</p>
        </div>
      </div>
    )
  }

    return (
        <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-gray-600 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-950/10 transition-all"
        >
            <input
                ref={inputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleInputChange}
                className="hidden"
            />

            {uploading ? (
                <p className="text-blue-400 text-lg">Uploading and reading file...</p>
            ) : (
                <>
                    <p className="text-gray-300 text-lg mb-2">
                        Drop your CSV or Excel file here
                    </p>
                    <p className="text-gray-500 text-sm">
                        or click to browse
                    </p>
                </>
            )}

            {error && (
                <p className="text-red-400 mt-4 text-sm">{error}</p>
            )}
        </div>
    );
}