<div align="center">
  <img src="https://raw.githubusercontent.com/tatheer583/Medi-Connect-/main/mobile/assets/icons/app_icon.png" width="120" alt="MediConnect Logo" onerror="this.src='https://img.icons8.com/fluent/120/000000/stethoscope.png'"/>
  
  <h1>🏥 MediConnect Smart</h1>
  
  <p><strong>Next-Generation Healthcare Management Platform Powered by AI</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" alt="Flutter" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=Appwrite&logoColor=white" alt="Appwrite" />
    <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  </p>

  <p>
    <a href="#about">About</a> •
    <a href="#key-features">Features</a> •
    <a href="#architecture--tech-stack">Tech Stack</a> •
    <a href="#getting-started">Installation</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## 📖 About

**MediConnect Smart** is a comprehensive, AI-driven healthcare platform designed to bridge the communication and workflow gap between patients, medical professionals, and clinics. Built with modern, scalable technologies such as **Flutter** for cross-platform mobile experiences and **Node.js/TypeScript** for robust backend APIs, the platform leverages **Appwrite** for seamless backend-as-a-service (BaaS) and **OpenAI** for intelligent medical assistance.

Whether it's booking appointments seamlessly, accessing digital prescriptions, receiving localized medication reminders, or utilizing AI-generated patient summaries before a consultation, MediConnect brings the entire healthcare ecosystem into a single, intuitive application.

---

## ✨ Key Features

### 🧑‍⚕️ For Patients
* **Smart Booking System:** Search for doctors by name, specialty, or clinic, and book appointments instantly in real-time.
* **Digital Health Records:** Securely access, view, and download digital prescriptions (PDF format) and integrated lab results.
* **Intelligent Reminders:** Set up automated, localized push notifications for daily medications and upcoming appointments.
* **Direct Communication:** Secure, real-time messaging with assigned healthcare providers.
* **AI Medical Assistant:** Leverage AI capabilities for preliminary queries and better understanding of symptoms.
* **Personalized Dashboard:** A centralized, modern hub tracking upcoming appointments, recent prescriptions, and vital health metrics.

### 🩺 For Doctors
* **Schedule Management:** Dynamic daily overview of upcoming appointments and interactive patient queues.
* **AI Patient Summaries:** Automatically generate intelligent pre-consultation summaries using OpenAI based on patient history, reducing cognitive load.
* **Digital Prescriptions:** Easily create, manage, and instantly issue secure digital prescriptions to patients.
* **Continuous Care:** Maintain real-time interaction through a secure patient messaging module.

### 🏥 For Clinics
* **Administrative Control:** Manage clinic profiles, standard operating hours, and comprehensive staff access controls.
* **Analytics & Overview:** High-level insights into daily appointments, active doctor metrics, and overall clinic performance.

---

## 🏗 Architecture & Tech Stack

MediConnect employs a scalable, decoupled architecture ensuring robust performance, modern design patterns, and ease of maintenance.

| Domain | Technologies Used | Purpose |
| :--- | :--- | :--- |
| **Frontend (Mobile)** | `Flutter (3.29+)`, `Dart`, `Riverpod`, `GoRouter` | Delivering cross-platform, high-performance UI and state management. |
| **Backend (API)** | `Node.js`, `Express.js`, `TypeScript` | Secure routing, complex business logic, and third-party webhook integrations. |
| **Database & Auth** | `Appwrite Cloud` (BaaS) | Secure user authentication, NoSQL data storage, and resilient file storage. |
| **Artificial Intelligence**| `OpenAI API (GPT Models)` | Processing health data to generate concise patient summaries and chatbot capabilities. |
| **Containerization**| `Docker`, `Docker Compose` | Ensuring reliable and identical local backend runtime environments. |
| **Core Utilities** | `Flutter Local Notifications`, `pdf`, `printing` | Scheduling local push notifications and dynamic PDF document generation. |

---

## 🚀 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

Ensure you have the following installed on your local machine:
* **[Flutter SDK](https://flutter.dev/docs/get-started/install)** (v3.29.0 or higher)
* **[Node.js](https://nodejs.org/en/download/)** (v18.x or higher)
* **[Docker](https://www.docker.com/)** (Optional, for running backend via containers)
* An active **[Appwrite Cloud / Local](https://appwrite.io/)** instance.
* An **OpenAI API Key**.

### 1. Clone the Repository

```bash
git clone https://github.com/tatheer583/Medi-Connect-.git
cd Medi-Connect-
```

### 2. Backend Setup (Node.js)

Navigate to the backend directory and configure the environment variables:

```bash
cd backend-node
cp .env.example .env
npm install
```

**Configure `backend-node/.env` with your credentials:**
```env
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
APPWRITE_DATABASE_ID=mediconnect_db
OPENAI_API_KEY=your_openai_key
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the development server:
```bash
npm run dev
```
*(Alternatively, you can run the backend via Docker using `docker-compose up --build`).*

### 3. Database Initialization

We provide automated PowerShell scripts to instantly structure your Appwrite database. Ensure you are authenticated with the Appwrite CLI, or have appropriate permissions, then run:

```powershell
.\setup_appwrite.ps1
```

*(This automatically provisions the `mediconnect_db` database, essential collections, permissions, and the `lab_results_files` storage buckets in Appwrite).*

### 4. Mobile App Setup (Flutter)

Navigate to the mobile application directory, fetch the latest dependencies, and run the app:

```bash
cd ../mobile
flutter pub get
flutter run
```

---

## 📂 Project Structure

```text
Medi-Connect-/
├── mobile/                  # Flutter Client Application
│   ├── android/             # Android-specific build configurations
│   ├── ios/                 # iOS-specific build configurations
│   └── lib/
│       ├── src/
│       │   ├── config/      # Appwrite initialization & routing configuration
│       │   ├── features/    # Domain-driven features (Auth, Chat, Dashboard, Appointments)
│       │   ├── services/    # External API integrations (AI, Appwrite, PDF Generation)
│       │   ├── shared/      # Common UI widgets, helpers, and utilities
│       │   └── theme/       # App design system, colors, and typography
├── backend-node/            # Node.js TypeScript API (Middleware / Logic)
│   ├── src/
│   │   ├── controllers/     # Route request handlers
│   │   ├── middleware/      # Authentication & validation layers
│   │   ├── models/          # Data schemas and structures
│   │   ├── routes/          # Express API route definitions
│   │   └── services/        # Core backend business logic
│   ├── Dockerfile           # Backend containerization
│   └── docker-compose.yml   # Multi-container orchestration
└── scripts/
    ├── setup_appwrite.ps1   # Automated database provisioning script
    └── create_collections.ps1 # Additional collection setup
```

---

## 🤝 Contributing

We welcome contributions from the community to make MediConnect even better! To ensure a smooth workflow:

1. **Fork** the repository.
2. **Create a Feature Branch** (`git checkout -b feature/AmazingFeature`).
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`).
4. **Push to the Branch** (`git push origin feature/AmazingFeature`).
5. **Open a Pull Request** describing your changes in detail, linked to any relevant issues.

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📦 Releases

We publish release artifacts and tags on GitHub. The latest release(s) were pushed as annotated tags:

- `v1.0.0` — initial release
- `v1.0.0-20260707020741` — timestamped tag

View release notes and assets on the GitHub releases page:

https://github.com/tatheer583/Medi-Connect-/releases

---

<div align="center">
  <p>Built with ❤️ by the <strong>MediConnect Team</strong></p>
  <p><i>Transforming Healthcare through Technology & Intelligence</i></p>
</div>

