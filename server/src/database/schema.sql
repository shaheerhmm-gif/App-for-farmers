-- Users & Auth
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(15) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('farmer', 'owner', 'agent', 'admin')),
    language_pref VARCHAR(5) DEFAULT 'en', -- en, hi, mr
    kyc_status VARCHAR(20) DEFAULT 'detailed', -- pending, verified, rejected
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Equipment Owners Profile
CREATE TABLE IF NOT EXISTS owners (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    business_name VARCHAR(100),
    pan_number VARCHAR(20),
    bank_details_masked VARCHAR(50), -- Store last 4 digits only
    payout_balance DECIMAL(12,2) DEFAULT 0.00,
    rating DECIMAL(3,2) DEFAULT 0.00
);

-- Equipment Inventory
CREATE TABLE IF NOT EXISTS equipment (
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
CREATE TABLE IF NOT EXISTS bookings (
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
CREATE TABLE IF NOT EXISTS booking_status_history (
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
CREATE TABLE IF NOT EXISTS payouts (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES owners(user_id),
    amount DECIMAL(10,2) NOT NULL,
    commission_deducted DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, PROCESSED, FAILED
    transaction_ref VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    channel VARCHAR(10) CHECK (channel IN ('SMS', 'WHATSAPP', 'PUSH')),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'QUEUED',
    sent_at TIMESTAMP
);
