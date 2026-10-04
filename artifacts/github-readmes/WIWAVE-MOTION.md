<div align="center">

# 📡 WiWave Motion

### Turn any Windows laptop into a Wi-Fi sensing instrument.

**Live signal monitoring · Multi-link fusion · CSI research pipeline · 3D Observatory**

[![Verify WiWave](https://github.com/tatheer583/WIWAVE-MOTION/actions/workflows/verify.yml/badge.svg)](https://github.com/tatheer583/WIWAVE-MOTION/actions/workflows/verify.yml)
![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?logo=python&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Windows-0078D6?logo=windows11&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r160-black?logo=threedotjs&logoColor=white)

**Every environment leaves a fingerprint on its Wi-Fi. WiWave reads it — live, locally, and honestly.**

</div>

---

## 🔍 What is WiWave?

**WiWave is an open-source WiFi radar and WiFi sensing application for Windows.** It turns the Wi-Fi radio already inside your laptop into a motion sensor — no cameras, no wearables, no extra hardware required. If you have ever searched for *"WiFi as a radar"*, *"WiFi motion detection"*, *"detect motion with WiFi"*, *"WiFi human presence detection"*, or *"device-free sensing"*, this project is a working, honest, local-first answer you can run in minutes.

Under the hood WiWave performs real-time **RSSI motion detection** (received signal strength, ~10 samples/second, from the Windows Native Wi-Fi API) and includes a complete research pipeline for **CSI sensing** (Channel State Information) using a $5–10 **ESP32 CSI receiver**. It was built as a truthful alternative to the fake "WiFi radar" demos floating around the internet: every capability flag, label and chart says exactly what the radio can and cannot measure.

**Use it as:** a WiFi radar dashboard · a wireless sensing research workbench · a room activity monitor · an ESP32 CSI data collector · a privacy-first alternative to cameras (it never records images or identifies anyone).

## 📸 See it live

| Live Monitor — real hardware | CSI Subcarrier Waterfall | 3D Observatory |
| --- | --- | --- |
| ![WiFi motion detection dashboard showing live RSSI, neighbor access point links, spectral analysis and the event journal on real Windows hardware](assets/readme-live-monitor.png) | ![ESP32 CSI channel state information subcarrier amplitude waterfall heatmap](assets/readme-csi-waterfall.png) | ![WiFi sensing 3D observatory room visualization with simulated multi-person tracking](assets/readme-observatory-demo.png) |
| Your laptop's actual Wi-Fi adapter, ~10 readings/second | Subcarrier-level CSI view (demo data shown; real with an ESP32) | Explorable room scene with 12 scenarios |

▶ **[Watch the demo video](assets/demo_video.mp4)**

> The screenshots above are unedited captures of the running application.
> The Observatory demo figures are **simulated scenarios** — clearly badged as such in the UI.
> The Live Monitor shows genuine measurements from the developer's laptop.

---

## ✨ What makes it different

- 🔬 **Multi-link sensing** — most tools watch one link. WiWave tracks your router **plus visible neighbor access points** as independent environment channels, with fusion logic that resists single-channel noise.
- 📊 **Spectral engine** — a rolling 30-second Welch analysis breaks the signal into slow / mid / fast oscillation bands with dominant-frequency and entropy statistics.
- 🗒️ **Event journal** — every sustained signal change is captured with its **before-and-after context** (up to 30 s each side), stored locally, reviewable with sparklines, exportable.
- 🌊 **CSI waterfall** — connect an ESP32 and watch 52-subcarrier channel data paint itself as a live heatmap.
- 🧪 **Labelled trial lab** — collect CSI trials tagged with room conditions (`empty_room`, `person_moving`, `fan_interference`…), then analyze per-label statistics and per-subcarrier separation **inside the app**.
- 🏠 **Local-first** — SQLite storage, no cloud, no accounts. Recordings and trials never leave your machine unless you export them.
- 🎛️ **3D Observatory** — orbit camera, 12 scenarios, 6 style presets, bloom post-processing, saved preferences.
- 🤝 **Radically honest UI** — capability flags, source provenance, and data-age badges everywhere. When the app doesn't know something, it says so. **No fake "radar" claims anywhere.**

## 🚀 Quick start (Windows)

```powershell
git clone https://github.com/tatheer583/WIWAVE-MOTION.git
cd WIWAVE-MOTION
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
cd frontend; npm ci; npm run build; cd ..
.\scripts\start-live.ps1
```

Open **http://127.0.0.1:8000** and watch for the **LIVE WI-FI** badge. Stay quiet for the first ~20 seconds while the room baseline is learned.

- **Live Monitor** (detailed charts, links, spectral view, event journal): `/monitor.html`
- **Workspace → Operations**: calibrate, record, replay
- **Try it without hardware**: set `SIMULATION_MODE=true`, or `WIWAVE_SOURCE=csi_simulation` for the CSI demo

## 🔌 Two hardware paths

| | Laptop mode | ESP32 CSI mode |
| --- | --- | --- |
| **Hardware** | Any Windows PC with Wi-Fi | + a $5–10 ESP32 board |
| **Measures** | RSSI across your link + neighbor links | Full CSI amplitudes across 52+ subcarriers |
| **Unlocks** | Baseline change detection, multi-link fusion, spectral view, event journal | CSI waterfall, labelled trials, trial analysis, real motion research |
| **Setup** | Zero — it's the default | ~30 min, [full hardware guide](docs/HARDWARE_GUIDE.md) |

The CSI pipeline (serial parser, trial collection, analysis) is fully implemented and unit-tested; it activates the moment a flashed ESP32 is connected.

## 🧠 How the sensing works

```
Native WLAN API (wlanapi.dll)          ESP32 serial (Espressif CSV)
        │  ~10 Hz per-link RSSI                │  CSI I/Q → amplitudes
        ▼                                      ▼
  ChangeDetector ── median/MAD baseline · 2 s window · hysteresis trigger/release
        │            per-channel z-scores · primary + neighbor fusion
        ▼
  SpectralAnalyzer ── Welch PSD on a uniform 10 Hz grid (30 s window)
        │
        ▼
  Event journal ── pre/post ring buffers ── SQLite ── UI + JSONL/CSV export
        │
        ▼
  WebSocket (10 Hz) + polling fallback ── React Live Monitor + 3D Observatory
```

The detector uses robust statistics (median + MAD, not mean/std), requires changes to **sustain** (~0.6 s) before triggering and stay **quiet** (2 s) before releasing, auto-resets when the link or channel changes, and fuses multiple links so one noisy channel cannot trigger alone.

## 📡 API

| Route | Purpose |
| --- | --- |
| `GET /api/health` | Service and sensor health, source, sample age, read rate |
| `GET /api/poll` | Latest snapshot incl. links, spectral stats, CSI preview |
| `WS /ws/radar` | Live snapshots, up to 10 Hz |
| `POST /api/calibrate` | Restart quiet-room calibration |
| `POST /session/start` · `POST /session/stop` | Start/stop a local recording |
| `GET /sessions` · `GET /session/{id}/export` · `GET /session/{id}/frames` | List, export CSV, replay |
| `GET /api/events` · `GET /api/events/{id}` · `DELETE /api/events/{id}` | Event journal |
| `GET /api/alerts` · `POST /api/alerts` | Optional local toast alerts |
| `GET /api/csi/trials` (+ `/start`, `/stop`, `/label`, `/export`, `DELETE`) | Labelled CSI trials |
| `GET /api/csi/trials/{id}/analysis` | Per-label statistics & separation |
| `GET /api/capabilities` | What the active source can and cannot do |

## 📚 Documentation

- [Hardware guide: ESP32 CSI receiver](docs/HARDWARE_GUIDE.md) — what to buy, flashing, troubleshooting
- [Live sensing & room-trial guide](docs/LIVE_SENSING_GUIDE.md)
- [Research: evidence and design decisions](docs/REALTIME_RESEARCH.md)
- [Datasets & model integration](docs/DATASETS_AND_MODELS.md)
- [API reference](docs/API_REFERENCE.md) · [Deployment](docs/DEPLOYMENT_GUIDE.md) · [User guide](docs/USER_GUIDE.md)
- [Current status](docs/PROJECT_STATUS.md) · [RuView feature parity](docs/RUVIEW_PARITY.md)

## 🗺️ Roadmap

- [ ] Physical ESP32 hardware validation of the full CSI path
- [ ] Train a first motion-vs-quiet model on collected labelled trials
- [ ] Linux/macOS native sources (Windows is implemented)
- [ ] Multiple receiver nodes for triangulation research

## ❓ FAQ — the questions everyone asks about WiFi radar

**Can Wi-Fi really work as a radar?**
Partly. Wi-Fi motion detection is real and actively researched (IEEE 802.11bf standardizes it), but consumer Wi-Fi hardware exposes only coarse measurements. WiWave extracts the maximum honest signal from them: multi-link RSSI fusion, spectral analysis, and calibrated change detection — while a $5 ESP32 unlocks true CSI-grade sensing research.

**Can Wi-Fi detect a person through walls?**
Not reliably with laptop hardware, and WiWave does not claim to. Research systems (RF-Pose, RSSI/CSI arrays) need engineered setups and trained models. What your laptop *can* do — today, with this app — is detect that the radio environment changed, and show you exactly how much it can be trusted.

**Does this identify people or record video?**
No. There is no camera, no microphone, no identity inference, and no data leaves your machine. That's the point: motion *evidence* without surveillance.

**What hardware do I need?**
None to start — any Windows laptop with Wi-Fi works in full mode. Add an ESP32 board (~$5–10) for the CSI research features. See the [hardware guide](docs/HARDWARE_GUIDE.md).

**Is this like commercial WiFi presence detection?**
Commercial products (mesh-router motion features, occupancy sensors) use multiple coordinated nodes and proprietary models. WiWave is the open, single-device version: real measurements, visible internals, and zero marketing fog about what the numbers mean.

## ⚠️ What WiWave does **not** do

*Read this before trusting it with anything important — this section is a feature of the project, not a disclaimer we hid.*

- **It does not detect, count, locate, or identify people.** RSSI is one number per link; untrained CSI amplitudes are not a classifier. The app reports *signal changes*, and a signal change can be a person, a door, a fan, interference, or nothing.
- The change score is a **statistic, not a probability** that anyone is present.
- Neighbor-link telemetry refreshes on the **driver's scan cadence** — it is environmental context, not per-sample motion evidence.
- The "read rate" is how often the driver is polled, **not** the radio's independent measurement rate.
- Observatory figures, demo scenarios, and the CSI demo source are **synthetic**, and are always labeled as such in the UI.
- No trained human-detection model exists in this repository. Historical prototypes under [`archive/`](archive/README.md) were validated only against synthetic signals and are not part of the live system.
- Not a security or safety system. Don't use it as one.

<sub>Observatory rendering adapted from [RuView](https://github.com/ruvnet/RuView) (MIT) — see [provenance](frontend/observatory/PROVENANCE.md).</sub>

