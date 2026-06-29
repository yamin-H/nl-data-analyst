"use client"

import { useState } from "react"
import { queryData } from "../services/api"
import { useSessionStore } from "../store/sessionStore"

interface Message {
  question: string
  sql: string
  results: Record<string, unknown>[]
  summary: string
  chart: string | null
}

export default function ChatBox() {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const sessionId = useSessionStore((state) => state.sessionId)

  async function handleAsk() {
    if (!question.trim() || !sessionId) return

    setLoading(true)
    setError(null)

    try {
      const data = await queryData(question, sessionId)
      setMessages((prev) => [...prev, {
        question: data.question,
        sql: data.sql,
        results: data.results,
        summary: data.summary,
        chart: data.chart
      }])
      setQuestion("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Query failed")
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleAsk()
  }

    return (
        <div className="mt-8">

            {/* messages list */}
            <div className="space-y-6 mb-6">
                {messages.map((msg, index) => (
                    <div key={index} className="border border-gray-700 rounded-xl p-6 space-y-4">

                        {/* question */}
                        <p className="text-blue-400 font-medium">
                            Q: {msg.question}
                        </p>

                        {/* summary */}
                        <p className="text-gray-200">{msg.summary}</p>

                        {/* chart */}
                        {msg.chart && (
                            <img
                                src={`data:image/png;base64,${msg.chart}`}
                                alt="Chart"
                                className="rounded-lg w-full"
                            />
                        )}

                        {/* results table */}
                        {msg.results.length > 0 && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead>
                                        <tr className="border-b border-gray-700">
                                            {Object.keys(msg.results[0]).map((col) => (
                                                <th key={col} className="py-2 pr-4 text-gray-400 font-medium">
                                                    {col}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {msg.results.slice(0, 10).map((row, i) => (
                                            <tr key={i} className="border-b border-gray-800">
                                                {Object.values(row).map((val, j) => (
                                                    <td key={j} className="py-2 pr-4 text-gray-300">
                                                        {String(val)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* sql */}
                        <details className="text-sm">
                            <summary className="text-gray-500 cursor-pointer hover:text-gray-300">
                                View SQL Query
                            </summary>
                            <pre className="mt-2 bg-gray-900 p-3 rounded-lg text-green-400 overflow-x-auto">
                                {msg.sql}
                            </pre>
                        </details>

                    </div>
                ))}
            </div>

            {/* input box */}
            <div className="flex gap-3">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a question about your data..."
                    className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={handleAsk}
                    disabled={loading || !question.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                    {loading ? "Thinking..." : "Ask"}
                </button>
            </div>

            {error && (
                <p className="text-red-400 mt-3 text-sm">{error}</p>
            )}

        </div>
    );
}