# Khet Bandhu - Product & Technical Specifications

## 1. High-Level Product Specification (One-Pager)

### Mission
Build a production-grade, farmer-first equipment rental marketplace connecting small & marginal farmers to local tractor and farm-equipment owners. The product must be offline-friendly, multilingual (EN/HIN/MAR), and secure.

### Problem Statement
**English**: The machinery rental business is unorganized. Farmers struggle to get equipment on time, payments are delayed, and there’s no structured system.
**Hindi**: किसान और ट्रैक्टर मालिकों के बीच किराये का सिस्टम असंगठित है। समय पर मशीनें नहीं मिलतीं और भुगतान देर से होता है।
**Marathi**: शेतकरी आणि ट्रॅक्टर मालकांदरम्यान भाड्याने देण्याची व्यवस्था अस्पष्ट आहे.

### Target Users
1.  **Farmer**: Small/marginal, low literacy, mobile user. Needs quick access/price clarity.
2.  **Equipment Owner**: Owns 1-3 machines. Expects bookings/timely payments.
3.  **Village Agent**: Assists with booking/KYC (Future).

### Core Features (MVP)
1.  **Authentication**: OTP-based (Farmers/Owners), minimal KYC.
2.  **Equipment Catalog**: Multilingual (Tractor, Rotavator, etc.), rate cards, photos.
3.  **Booking Flow**: Select equipment -> Match owner -> Owner Accept/Reject -> Confirmation.
4.  **Tracking**: Status updates (Accepted -> On the way -> Work Started -> Completed).
5.  **Multi-channel**: App, WhatsApp, & SMS booking interfaces.
6.  **Payments**: Cash/UPI post-job, commission tracking.
7.  **Owner Dashboard**: Earnings, Calendar, Fleet management.

---

## 2. Technical Specification

### 2.1 Database Schema (PostgreSQL)

```sql
-- Users & Auth
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(15) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('farmer', 'owner', 'agent', 'admin')),
    language_pref VARCHAR(5) DEFAULT 'en', -- en, hi, mr
    kyc_status VARCHAR(20) DEFAULT 'detailed', -- pending, verified, rejected
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Equipment Owners Profile
CREATE TABLE owners (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    business_name VARCHAR(100),
    pan_number VARCHAR(20),
    bank_details_masked VARCHAR(50), -- Store last 4 digits only
    payout_balance DECIMAL(12,2) DEFAULT 0.00,
    rating DECIMAL(3,2) DEFAULT 0.00
);

-- Equipment Inventory
CREATE TABLE equipment (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES owners(user_id),
    type VARCHAR(50) NOT NULL, -- e.g., TRACTOR, ROTAVATOR
    name_en VARCHAR(100),
    name_hi VARCHAR(100),
    name_mr VARCHAR(100),
    rate_amount DECIMAL(10,2) NOT NULL,
    rate_unit VARCHAR(10) CHECK (rate_unit IN ('HOUR', 'ACRE', 'DAY')),
    capacity_desc VARCHAR(50), -- e.g., "40HP", "2 Acre/hr"
    photos TEXT[], -- Array of S3 URLs
    location_lat DECIMAL(9,6),
    location_lng DECIMAL(9,6),
    availability_status VARCHAR(20) DEFAULT 'AVAILABLE',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER REFERENCES users(id),
    equipment_id INTEGER REFERENCES equipment(id),
    owner_id INTEGER REFERENCES owners(user_id),
    status VARCHAR(30) DEFAULT 'REQUESTED', 
    -- REQUESTED, ACCEPTED, ON_WAY, STARTED, COMPLETED, CANCELLED_BY_FARMER, CANCELLED_BY_OWNER, REJECTED
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    acres DECIMAL(5,2),
    price_estimate DECIMAL(10,2),
    final_price DECIMAL(10,2),
    cancellation_reason TEXT,
    refund_status VARCHAR(20),
    site_photo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Booking Status History (Audit Trail)
CREATE TABLE booking_status_history (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id),
    status VARCHAR(30) NOT NULL,
    actor_id INTEGER REFERENCES users(id),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    location_lat DECIMAL(9,6),
    location_lng DECIMAL(9,6),
    photo_proof_url TEXT
);

-- Payouts
CREATE TABLE payouts (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES owners(user_id),
    amount DECIMAL(10,2) NOT NULL,
    commission_deducted DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, PROCESSED, FAILED
    transaction_ref VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    channel VARCHAR(10) CHECK (channel IN ('SMS', 'WHATSAPP', 'PUSH')),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'QUEUED',
    sent_at TIMESTAMP
);
```

### 2.2 API Endpoints (REST)

| Method | Endpoint | Description | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | | | | |
| POST | `/api/v1/auth/otp/request` | Request OTP | `{phone, role}` | `{otp_id, expiry}` |
| POST | `/api/v1/auth/otp/verify` | Verify OTP | `{phone, otp, otp_id}` | `{token, user}` |
| **Equipment** | | | | |
| GET | `/api/v1/equipment` | Search Equipment | `?lat=..&lng=..&radius=..&type=..` | `[{id, name, rate...}]` |
| POST | `/api/v1/owner/equipment` | Add Equipment | `{type, rate, photos...}` | `{id, status}` |
| **Bookings** | | | | |
| POST | `/api/v1/bookings` | Create Booking | `{equipment_id, start_time, acres...}` | `{booking_id, status}` |
| POST | `/api/v1/bookings/:id/respond`| Owner Accept/Reject | `{decision: 'ACCEPT'\|'REJECT'}` | `{new_status}` |
| GET | `/api/v1/bookings/:id/status` | Get Status History | - | `[{status, time, lat, lng}]` |
| POST | `/api/v1/bookings/:id/update` | Update Status | `{status, lat, lng, photo}` | `{success}` |
| **Webhooks** | | | | |
| POST | `/api/v1/webhooks/sms` | Inbound SMS | `{from, body...}` | `XML/JSON` |
| POST | `/api/v1/webhooks/whatsapp` | Inbound WhatsApp | `{from, message...}` | `JSON` |

### 2.3 Proposed Infrastructure

```mermaid
graph TD
    Client[Android App / Mobile Web] -->|HTTPS| LB[Load Balancer]
    SMS[SMS Gatway] -->|Webhook| LB
    WA[WhatsApp API] -->|Webhook| LB
    
    LB --> API[Node.js / Express Service]
    
    API --> DB[(PostgreSQL)]
    API --> Cache[(Redis - Queues/Cache)]
    API --> S3[Object Storage (Photos)]
    
    subgraph "Worker Services"
        Worker[Notification/Job Worker]
        Worker --> Cache
        Worker --> SMS
        Worker --> WA
    end
```

### 2.4 Technology Stack
-   **Frontend**: Kotlin (Android), React (Owner Web/Admin)
-   **Backend**: Node.js + Express
-   **Database**: PostgreSQL
-   **Caching/Queues**: Redis (for matchmaking queues & notification retries)
-   **Storage**: AWS S3 or compatible (MinIO) for photos
-   **Maps**: Google Maps API / Mapbox (for distance matrix & geocoding)
