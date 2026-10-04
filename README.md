Markdown
# 🏢 VacantDesk

**The Real-Time Logistical Operating System for Campus Infrastructure.**  
Built for the Smart India Hackathon (SIH) | National Institute of Technology (NIT) Raipur.

![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

## ⚡ The Problem & Solution

**The Chaos:** College campuses host hundreds of classrooms across multiple blocks. Academic schedules are locked in static departmental PDFs, forcing Class Representatives (CRs) and faculty to physically wander between blocks to find empty rooms, leading to WhatsApp miscommunications and double-booking collisions.

**The Solution:** VacantDesk transforms static timetables into a live, interactive matrix. It provides a high-performance booking engine disguised behind a deliberately tactile, single-page interface, utilizing real-time state locking to guarantee zero scheduling conflicts.

## 🚀 Architectural Innovations

*   **⚡ Ephemeral Pessimistic Locking:** A real-time concurrency engine. The millisecond a user selects an empty room, the database executes an ephemeral lock, instantly disabling the room across the entire campus network to prevent double-booking.
*   **🛡️ The Data Promise (Privacy by Design):** Zero-password infrastructure using Google Workspace Role-Based Access Control (RBAC). Only authenticated `@nitrr.ac.in` institutional emails can access the grid.
*   **📬 Automated Institutional Handoff:** Integrated Node.js + Nodemailer backend automatically generates and dispatches formatted reservation requests to administration (e.g., `hod.it@nitrr.ac.in`), standardizing the approval pipeline.
*   **🎨 Editorial Brutalism UI:** Designed on a strict bento-box grid with a high-contrast palette (Warm Cream `#F4EBD9` and Matte Black `#1A1A1A`) to eliminate SaaS boilerplate and guarantee accessibility.

## 🛠️ Technology Stack

*   **Frontend Engine:** React 19, Vite, Tailwind CSS v4, Framer Motion
*   **Backend Services:** Node.js, Express, Nodemailer
*   **Database & Auth:** Firebase (Realtime Sync & Authentication)
*   **AI Integration:** Google GenAI (Gemini) for dynamic timetable parsing

---

## 💻 Local Development Setup

To run VacantDesk locally for evaluation or development:

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/vacantdesk-sih.git](https://github.com/YOUR_USERNAME/vacantdesk-sih.git)
cd vacantdesk-sih
2. Install Dependencies
Bash
npm install
3. Configure Environment Variables
Create a .env file in the root directory and add your specific API keys and credentials. Never commit this file to version control.

Code snippet
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id

# Backend Mailer Configuration
EMAIL_USER=your_sender_email@gmail.com
EMAIL_PASS=your_app_password

# Google GenAI
GOOGLE_GENAI_API_KEY=your_gemini_api_key
4. Launch the Development Server
Bash
npm run dev
The application will instantly launch at http://localhost:5173.

👥 Team Details
Team Name: [Insert Team Name Here]

Institution: National Institute of Technology (NIT) Raipur

Vikrant Kumar – Team Lead / Architecture & Frontend (Information Technology)

[Add Teammate 2] – [Role]

[Add Teammate 3] – [Role]

[Add Teammate 4] – [Role]

[Add Teammate 5] – [Role]

[Add Teammate 6] – [Role]

"Engineered for CodeUtsava. Designed for institutional transparency."
