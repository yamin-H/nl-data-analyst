# 🧠 NL Data Analyst

An AI-powered full stack application that lets anyone analyze data using plain English — no SQL knowledge required. Upload a CSV or Excel file, ask questions naturally, and get back charts, summaries, and insights instantly.

---

## 🚀 Live Demo

🌐 **[Live App](https://your-app.vercel.app)** &nbsp;|&nbsp; 🎥 **[Demo Video](https://your-loom-link.com)**

> Replace these links after deployment

---

## ✨ Features

- **Natural Language Querying** — Ask questions in plain English, get SQL generated automatically
- **File Upload** — Supports CSV and Excel (.xlsx, .xls) files with drag and drop
- **AI Summaries** — Every result explained in simple, human-friendly language
- **Auto Charts** — Matplotlib generates visualizations automatically based on your data
- **Session Management** — Each user's data is isolated and remembered across queries
- **Schema Preview** — See your column names and data types before asking questions
- **SQL Transparency** — Every generated SQL query is visible and inspectable
- **Error Handling** — Clean error messages throughout the entire pipeline

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **FastAPI** | REST API framework |
| **LangChain** | LLM orchestration and prompt management |
| **Groq (LLaMA 3 70B)** | LLM for SQL generation and summarization |
| **Pandas** | File parsing and DataFrame management |
| **Pandasql** | Running SQL queries on Pandas DataFrames |
| **Matplotlib** | Server-side chart generation |
| **Pydantic** | Request and response validation |

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type safety throughout |
| **Tailwind CSS** | Utility-first styling |
| **Zustand** | Lightweight global state management |

---

## 🏗️ Architecture

```
User
 │
 ▼
Next.js Frontend (Vercel)
 │
 │  REST API calls
 ▼
FastAPI Backend (Render)
 │
 ├── Pandas          → reads and stores uploaded file
 ├── LangChain       → builds prompts and chains
 ├── Groq LLM        → generates SQL + human summary
 ├── Pandasql        → executes SQL on real data
 └── Matplotlib      → generates chart as base64 PNG
```

---

## 📁 Project Structure

```
nl-data-analyst/
├── backend/
│   ├── app/
│   │   ├── main.py                  # FastAPI app entry point
│   │   ├── api/
│   │   │   └── routes/
│   │   │       ├── upload.py        # POST /api/upload
│   │   │       └── query.py         # POST /api/query
│   │   ├── core/
│   │   │   ├── config.py            # Centralized env config (Pydantic)
│   │   │   └── session.py           # In-memory session management
│   │   ├── services/
│   │   │   ├── file_parser.py       # Pandas file reading + schema extraction
│   │   │   ├── sql_generator.py     # LangChain + Groq SQL generation
│   │   │   ├── query_executor.py    # Pandasql query execution
│   │   │   ├── summarizer.py        # LLM result summarization
│   │   │   └── chart_generator.py   # Matplotlib chart generation
│   │   ├── models/
│   │   │   ├── request.py           # Pydantic request models
│   │   │   └── response.py          # Pydantic response models
│   │   └── utils/
│   └── requirements.txt
│
└── frontend/
    ├── app/
    │   ├── page.tsx                 # Main app page
    │   ├── layout.tsx
    │   ├── components/
    │   │   ├── FileUpload.tsx       # Drag and drop file upload
    │   │   └── ChatBox.tsx          # Chat interface + results display
    │   ├── services/
    │   │   └── api.ts               # All backend API calls
    │   └── store/
    │       └── sessionStore.ts      # Zustand global session store
    ├── .env.local.example
    └── package.json
```

---

## ⚙️ How It Works

```
1. User uploads a CSV or Excel file
2. Pandas reads the file and extracts schema (columns, types, sample rows)
3. Schema is stored in server memory tied to a unique session ID
4. User types a question in plain English
5. LangChain builds a prompt combining schema + question
6. Groq LLM (LLaMA 3 70B) generates a precise SQL query
7. Pandasql executes the SQL against the real DataFrame
8. LLM summarizes the results in plain English
9. Matplotlib generates a chart if data is visual
10. Frontend displays summary + chart + table + SQL together
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Groq API key (free at [console.groq.com](https://console.groq.com))

---

### Backend Setup

```bash
# clone the repo
git clone https://github.com/YOUR_USERNAME/nl-data-analyst.git
cd nl-data-analyst/backend

# create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# install dependencies
pip install -r requirements.txt

# create .env file
cp .env.example .env
# add your GROQ_API_KEY to .env

# run the server
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

---

### Frontend Setup

```bash
cd ../frontend

# install dependencies
npm install

# create .env.local
cp .env.local.example .env.local
# set NEXT_PUBLIC_API_URL=http://localhost:8000/api

# run the dev server
npm run dev
```

Frontend runs at `http://localhost:3000`

---

## 🌐 Deployment

| Service | Platform | 
|---|---|
| Frontend | Vercel |
| Backend | Render |

### Environment Variables

**Backend (Render):**
```
GROQ_API_KEY=your_key_here
ENVIRONMENT=production
APP_NAME=NL Data Analyst
```

**Frontend (Vercel):**
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

---

## 📸 Screenshots

> Add screenshots here after deployment

---

## 🔮 Future Improvements

- Multi-turn conversation memory across questions
- PostgreSQL / MySQL direct database connection
- PDF report export of analysis results
- Anomaly detection and automatic insights
- Support for multiple file uploads per session

---

## 👨‍💻 Author

Built by **[Your Name](https://github.com/YOUR_USERNAME)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://linkedin.com/in/your-profile)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black)](https://github.com/YOUR_USERNAME)

---

## 📄 License

MIT License — feel free to use this project for learning or as inspiration.