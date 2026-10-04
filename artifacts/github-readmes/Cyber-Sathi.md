# CyberSathi AI

<p align="center">
  <strong>Offline, on-device cybersecurity analyzer powered by local Gemma (via Ollama)</strong>
</p>

<p align="center">
  Analyzes <strong>SMS messages</strong>, <strong>emails</strong>, <strong>screenshots</strong>, <strong>QR codes</strong>, and <strong>URLs</strong> for scams, phishing, malware, and fraud — in English, Urdu, or Roman Urdu.
</p>

<p align="center">
  <strong>No cloud LLM is used for detection.</strong> Everything runs locally after initial setup.
</p>

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Backend | FastAPI (Python 3.11+) |
| Local LLM runtime | Ollama (`gemma:2b` model, local REST API) |
| Database | SQLite via SQLAlchemy (local file, no server) |
| QR decode | Client-side (`jsqr`), offline, no external service |
| Deployment | Local-first; localhost only for hackathon demo |

## Features

- **Message / SMS Analyzer** — Paste any suspicious text message for multi-factor scam detection
- **Email Analyzer** — Detect phishing, fake sender domains, malware links, OTP requests, and social engineering
- **Screenshot Analyzer** — Upload any suspicious screenshot for visual + text analysis
- **QR / URL Analyzer** — Scan QR codes offline or paste any link for domain analysis and blocklist checks
- **History** — All scans persist locally in SQLite; review past analyses anytime
- **Multi-language** — Full support for English, Urdu, and Roman Urdu
- **Offline-first** — Works without internet after initial setup

## Prerequisites

- Python 3.11+
- Node.js 18+
- [Ollama](https://ollama.com) installed and running
- Gemma model pulled locally: `ollama pull gemma:2b`

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/cybersathi-ai.git
cd cybersathi-ai
```

### 2. Backend Setup

```bash
cd backend
python -m venv .venv
# PowerShell:
.\.venv\Scripts\Activate.ps1
# Or Command Prompt:
.\.venv\Scripts\activate.bat
# Or Git Bash / WSL:
source .venv/Scripts/activate

pip install -r requirements.txt
copy .env.example .env
```

Run the backend:

```bash
cd backend
# PowerShell:
..\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
# Or with activated venv:
python -m uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser. Vite proxies `/api` requests to the FastAPI backend at `http://127.0.0.1:8000`.

## Project Structure

```
backend/
  app/
    main.py                 — FastAPI entry, CORS, /api/health
    analyzer.py             — multi-factor analysis pipeline (Gemma + deterministic)
    deterministic_checks.py — rule-based linguistic/sender/url/malware/OTP checks
    ollama_client.py        — local Ollama REST client
    schemas.py              — B4 response contract
    models.py               — SQLAlchemy Scan + BlocklistEntry
    database.py             — SQLite session factory
    config.py               — env-based settings
    blocklist.py            — offline scam-domain blocklist (50+ entries)
    routers/
      analyze.py            — /api/analyze/{message,email,screenshot,url,qr}
      history.py            — GET/DELETE /api/history
  requirements.txt
  .env.example
  run_phase2_test.py       — standalone analyzer test
  cybersathi.db             — local SQLite file (created on first run)

frontend/
  src/
    components/
      MessageAnalyzer.jsx
      EmailAnalyzer.jsx
      ScreenshotAnalyzer.jsx
      QRAnalyzer.jsx
      HistoryList.jsx
      RiskFactorBreakdown.jsx
      VerdictBadge.jsx
      LanguageToggle.jsx
      LoadingSpinner.jsx
    context/
      LanguageContext.jsx   — en / ur / roman-ur
    api/
      client.js            — fetch wrappers for all backend endpoints
    App.jsx
    main.jsx
    index.css
  public/
    manifest.json          — PWA manifest
    sw.js                  — service worker for offline caching
```

## How It Works

1. **Deterministic checks** run first: rule-based detection of urgency language, fear tactics, too-good-to-be-true offers, authority impersonation, typosquatting, suspicious TLDs, malware patterns, OTP requests, and more
2. **Gemma synthesis** receives those findings and produces a structured JSON verdict with weighted factors
3. **Post-processing** calibrates scores, guards against model hallucinations, and ensures output language matches the user's selection
4. **Result** is saved to local SQLite and returned with the full multi-factor breakdown

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Confirms backend + local Ollama/Gemma availability |
| POST | `/api/analyze/message` | Multi-factor message/SMS analysis |
| POST | `/api/analyze/email` | Multi-factor email analysis |
| POST | `/api/analyze/screenshot` | Multi-factor screenshot analysis |
| POST | `/api/analyze/url` | Multi-factor URL/link analysis |
| POST | `/api/analyze/qr` | QR image entry point (decoded client-side) |
| GET | `/api/history` | Retrieve past scans |
| DELETE | `/api/history` | Clear history |

## Analysis Response Contract

```json
{
  "verdict": "Safe | Suspicious | Scam",
  "composite_risk_score": 0,
  "confidence": 0,
  "factors": [
    { "category": "linguistic", "finding": "string", "risk_contribution": "low|medium|high" }
  ],
  "reasoning_summary": "2-3 sentence plain-language explanation",
  "language": "en | ur | roman-ur"
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Ollama](https://ollama.com) for local LLM runtime
- [Gemma](https://ai.google.dev/gemma) by Google for the local model
- [FastAPI](https://fastapi.tiangolo.com) for the backend framework
- [React](https://react.dev) + [Vite](https://vitejs.dev) + [Tailwind CSS](https://tailwindcss.com) for the frontend

