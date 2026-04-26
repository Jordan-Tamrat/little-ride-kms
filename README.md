# Little Ride Knowledge Management System

A full-stack Knowledge Management System (KMS) prototype built for **Little Ride Ethiopia**, a ride-hailing company operating in Addis Ababa.

🌐 **Live Demo:** [little-ride-kms.vercel.app](https://little-ride-kms.vercel.app)

---

## 🚀 Features

### 🔐 Role-Based Authentication
- Two separate portals: **Staff** and **Driver**
- Login page with portal selection — no password required (prototype demo)
- Staff sees the full KMS sidebar; drivers see only their portal
- Role and language preference persisted in `localStorage`

---

### 🧑💼 Staff Portal

- **Dashboard** — Real-time stats (total, resolved, open, pending, escalated issues) synced from localStorage
- **Support Issues Database** — Full issue log with inline status updates, edit modal, search & filter, and "Log New Issue" form
- **Lessons Learned** — Tacit knowledge articles with rich content renderer, category filter, and "Add Lesson" form
- **Driver Support & Info** — Fare tables for all 7 vehicle types with Retail & Corporate columns, live fuel prices, road conditions
- **Support Guidelines** — Visual step-by-step SOPs with timeline UI, SLA badges, and department colour coding
- **Multilingual Support** — English ↔ Amharic glossary and common support phrases
- **Expert Locator** — Staff directory with expertise tags, availability status, contact info, and detail panel
- **Intelligence Map** — Interactive Addis Ababa map; staff can add/edit tacit markers, live GPS tracking, category filters, and cross-tab sync with driver portal

---

### 🚗 Driver Portal

- **Driver Info** — Fuel prices, road condition alerts, driver tips, fare structure for all 7 vehicle types, and support contacts
- **Intelligence Map** — Read-only view of all staff-added tacit markers, live GPS tracking, and category filters

---

## 🌍 Localization (EN / አማርኛ)
- Full English ↔ Amharic localization across all pages including the Intelligence Map
- Language toggle (EN / አማ) in the sidebar for both portals
- All translations defined in `i18n.ts` with a `useT()` React context hook
- Language preference persisted in `localStorage`

---

## 💾 Data Persistence
- All issue changes, lessons, and custom map markers persist via `localStorage`
- Dashboard reads live data and updates on tab focus and cross-tab `storage` events
- Custom map markers shared between staff and driver portals via `kms_map_markers` key

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + inline styles |
| Map | React-Map-GL + MapLibre GL + OpenFreeMap Liberty tiles |
| GPS | `navigator.geolocation.watchPosition` |
| Bundler (dev) | Webpack (`--no-turbopack`) |
| Deployment | Vercel |
| Storage | Browser `localStorage` |

---

## 📦 Getting Started

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:3000/login](http://localhost:3000/login) and select a portal.

---

## 📁 Project Structure

```
app/
├── app/
│   ├── page.tsx                        # Dashboard
│   ├── layout.tsx                      # Sidebar + auth guard + language provider
│   ├── data.ts                         # Seed data, types, controlled vocabularies
│   ├── i18n.ts                         # All EN/AM translations
│   ├── lang-context.tsx                # LangProvider + useT() hook
│   ├── login/                          # Role-based login page
│   ├── issues/                         # Support Issues Database
│   ├── lessons/                        # Lessons Learned
│   ├── driver-support/                 # Driver Support & Info (staff view)
│   ├── guidelines/                     # Support Guidelines
│   ├── multilingual/                   # Multilingual Support
│   ├── experts/                        # Expert Locator
│   ├── map/
│   │   ├── page.tsx                    # Staff map page (dynamic, ssr:false)
│   │   ├── MapClient.tsx               # Map component — staff mode (add/edit markers, live GPS)
│   │   └── markers.ts                  # Seed markers + localStorage helpers
│   └── driver-portal/
│       ├── page.tsx                    # Driver portal with sidebar nav (Driver Info + Map)
│       └── map/
│           └── DriverMapWrapper.tsx    # Read-only map wrapper for drivers
└── public/
    └── logo.svg
```

## 🏢 About Little Ride Ethiopia

Little Ride Ethiopia is a ride-hailing company based in Addis Ababa. This KMS was designed to replace informal knowledge sharing via Telegram and Google Sheets, centralising operational knowledge for support agents, operations staff, and drivers.

---

*Built as a university project demonstrating Knowledge Management System design principles.*
