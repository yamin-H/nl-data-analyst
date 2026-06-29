"use client"

import { useSessionStore } from "./store/sessionStore"
import FileUpload from "./components/FileUpload"
import ChatBox from "./components/ChatBox"

export default function Home() {
  const sessionId = useSessionStore((state) => state.sessionId)

    return (
        <main className="min-h-screen bg-gray-950 text-white p-8">
            <div className="max-w-3xl mx-auto">

                {/* header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">NL Data Analyst</h1>
                    <p className="text-gray-400">
                        Upload a CSV or Excel file and ask questions in plain English
                    </p>
                </div>

                {/* upload section */}
                <FileUpload />

                {/* chat section — only appears after file upload */}
                {sessionId && (
                    <div className="mt-8">
                        <div className="border-t border-gray-800 pt-8">
                            <h2 className="text-lg font-semibold text-gray-300 mb-4">
                                Ask a question about your data
                            </h2>
                            <ChatBox />
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}