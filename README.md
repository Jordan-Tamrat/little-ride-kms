# Little Ride Knowledge Management System

A full-stack Knowledge Management System (KMS) prototype built for **Little Ride Ethiopia**, a ride-hailing company operating in Addis Ababa.

## 🚀 Live Features

### Staff Portal
- **Dashboard** — Real-time stats (total, resolved, open, pending, escalated issues) synced from localStorage
- **Support Issues Database** — Full issue log with inline status updates, edit modal, search & filter, and "Log New Issue" form
- **Lessons Learned** — Tacit knowledge articles with rich content renderer (steps, causes, insights), category filter, and "Add Lesson" form
- **Driver Support & Info** — Real fare tables for all 7 vehicle types (Basic, Comfort+, Comfort, Mini Bus, Lady Bug, Parcel, Luxury) with Retail & Corporate columns, live fuel prices, road conditions
- **Support Guidelines** — Visual step-by-step SOPs with timeline UI, SLA badges, and department color coding
- **Multilingual Support** — English ↔ Amharic glossary and common support phrases
- **Expert Locator** — Staff directory with expertise tags, availability status, contact info, and detail panel

### Driver Portal
- Separate login portal for drivers (not employees)
- Fuel prices (live from metaappz.com)
- Road conditions & alerts
- Fare structure for all vehicle types
- Driver tips & best practices
- Real support contacts (7933, +251 11 557 1407, info.ethiopia@little.africa)

## 🔐 Authentication
- Role-based login: **Staff** vs **Driver**
- Stored in `localStorage` — prototype demo mode (no password required)
- Staff sees full KMS sidebar; drivers see only their portal

## 💾 Data Persistence
- All issue changes (new issues, status updates, edits) persist via `localStorage`
- Dashboard reads live data and updates on tab focus
- Lessons learned also persisted via `localStorage`

## 🛠 Tech Stack
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- No external UI libraries — all components hand-built

## 📦 Getting Started

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:3000/login](http://localhost:3000/login) and select a portal.

## 📁 Project Structure

```
app/
├── app/
│   ├── page.tsx              # Dashboard
│   ├── layout.tsx            # Sidebar + auth guard
│   ├── data.ts               # Seed data & types
│   ├── login/                # Login page
│   ├── issues/               # Support Issues Database
│   ├── lessons/              # Lessons Learned
│   ├── driver-support/       # Driver Support & Info (staff view)
│   ├── driver-portal/        # Driver Portal (driver view)
│   ├── guidelines/           # Support Guidelines
│   ├── multilingual/         # Multilingual Support
│   └── experts/              # Expert Locator
└── public/
    └── logo.svg
```

## 🏢 About Little Ride Ethiopia

Little Ride Ethiopia is a ride-hailing company based in Addis Ababa. This KMS was designed to replace informal knowledge sharing via Telegram and Google Sheets, centralizing operational knowledge for support agents, operations staff, and drivers.

---

Built as a university project demonstrating Knowledge Management System design principles.
