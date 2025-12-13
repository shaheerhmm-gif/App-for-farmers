# Khet Bandhu - Project Management & Launch

## 1. 6-Sprint Backlog (Agile)

### Sprint 1: Foundation & Onboarding
**Goal**: User Auth, Equipment Catalog, Basic Owner Profiles.
- **Story 1 (5pts)**: Set up Node.js/Postgres Repo + DB Migration Scripts.
- **Story 2 (3pts)**: Implement OTP Auth API (Request/Verify) for Farmers & Owners.
- **Story 3 (5pts)**: Create Owner Profile Screen (Mobile Web) + KYC Upload (UI only).
- **Story 4 (3pts)**: Seed Equipment Catalog DB (EN/HIN/MR) with photos.
- **Story 5 (2pts)**: Setup Git Workflow, CI/CD Pipeline (Heroku/Render/AWS).

### Sprint 2: Booking Core
**Goal**: Booking Creation, Owner Matching, Notifications.
- **Story 1 (8pts)**: Booking Request API + Geo-matching logic (Find nearby owners).
- **Story 2 (5pts)**: Send SMS/WhatsApp Notification to Owner on new request.
- **Story 3 (5pts)**: Owner Accept/Reject API + Status Update.
- **Story 4 (3pts)**: Farmer "My Bookings" List UI (Android).

### Sprint 3: Tracking & Localization
**Goal**: Live Status, Multi-language UI.
- **Story 1 (5pts)**: Implement Status States (On Way, Started, Completed) with timestamps.
- **Story 2 (8pts)**: Android App: Apply multilingual strings (EN/HIN) toggle.
- **Story 3 (5pts)**: Workproof Photo Upload (S3) on "Work Started"/"Completed".
- **Story 4 (3pts)**: Basic Admin Dashboard to view all bookings.

### Sprint 4: Reliability & Dashboards
**Goal**: Cancellation handling, Owner Dashboard, Auto-assign.
- **Story 1 (8pts)**: Auto-reassign logic: If owner times out (15m) -> notify next.
- **Story 2 (5pts)**: Owner Dashboard (Web): Calendar View of upcoming jobs.
- **Story 3 (5pts)**: Cancellation Flow (Farmer cancel reasons + Owner penalty logic).

### Sprint 5: Bot Intelligence
**Goal**: SMS/WhatsApp Parsing, Support.
- **Story 1 (13pts)**: Implement SMS Parser Service (Regex -> Booking Object).
- **Story 2 (8pts)**: WhatsApp Bot "MENU" flow (Twilio/Gupshup integration).
- **Story 3 (5pts)**: Admin KYC Verification Interface (Approve/Reject owners).

### Sprint 6: Payments & Launch Prep
**Goal**: Commission tracking, Pilot deploy.
- **Story 1 (8pts)**: Ledger System: Calculate commission per job, update Owner Balance.
- **Story 2 (5pts)**: Cash Collection "Mark Paid" flow + Receipt generation.
- **Story 3 (5pts)**: E2E Testing on field devices (Feature phone + Android).
- **Story 4 (3pts)**: Pilot Deployment (Server scaling, DB backup setup).

## 2. Pilot Launch Playbook

### Roles & Responsibilities
-   **City Ops Manager**: Monitor overall booking success, handle escalations.
-   **Field Agent (Village level)**:
    -   Onboard 5 Owners/week.
    -   Train 50 Farmers/week on App usage.
    -   Verify physical existence of equipment.
-   **Tech Support**: 24/7 on-call for server issues/bot failures.

### Agent SOP (Standard Operating Procedure)
1.  **Onboarding Owner**:
    -   Collect Aadhaar + Tractor RC photo.
    -   Take 4 photos of Tractor (Front, Back, Side, Attachments).
    -   Test SMS receiving on Owner's phone.
2.  **Onboarding Farmer**:
    -   Install App via ShareIt/Bluetooth if data low.
    -   Do 1 demo booking (Test Mode).
    -   Save "Khet Bandhu" number as contact.

### Telco & Partnerships
-   **Short-code**: Apply for 5-digit shortcode (e.g., 55443) for free SMS booking.
-   **DLT Registration**: Register "Khet Bandhu" headers on DLT platform (Trai requirement) to prevent SMS blocking.
