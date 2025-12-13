const { pool } = require('../config/db');

const seedData = async () => {
    try {
        console.log('Seeding database...');

        // 1. Create Users (1 Owner, 2 Farmers)
        // Note: In real app, we verify OTP. Here we insert directly.
        // Owner: Ram Singh
        const ownerRes = await pool.query(
            `INSERT INTO users (phone, role, language_pref, kyc_status) 
             VALUES ('9876543210', 'owner', 'hi', 'verified') 
             ON CONFLICT (phone) DO UPDATE SET role='owner' RETURNING id`
        );
        const ownerId = ownerRes.rows[0].id;

        await pool.query(
            `INSERT INTO owners (user_id, business_name, payout_balance, rating)
             VALUES ($1, 'Ram Singh Agro', 0.00, 4.5)
             ON CONFLICT (user_id) DO NOTHING`,
            [ownerId]
        );

        // Farmer 1: Shyam
        await pool.query(
            `INSERT INTO users (phone, role, language_pref) 
             VALUES ('9123456789', 'farmer', 'mr') 
             ON CONFLICT (phone) DO NOTHING`
        );

        // 2. Add Equipment for Ram Singh
        const equipmentList = [
            {
                type: 'TRACTOR',
                name_en: 'Mahindra 575 DI',
                name_hi: 'महिंद्रा 575 डीआई',
                name_mr: 'महिंद्रा 575 डीआय',
                rate: 800.00,
                unit: 'HOUR',
                capacity: '45 HP',
                lat: 18.5204,
                lng: 73.8567
            },
            {
                type: 'ROTAVATOR',
                name_en: 'Shaktiman Rotavator',
                name_hi: 'शक्तिमान रोटावेटर',
                name_mr: 'शक्तिमान रोटाव्हेटर',
                rate: 1200.00,
                unit: 'ACRE',
                capacity: '6 Feet',
                lat: 18.5204,
                lng: 73.8567
            },
            {
                type: 'JCB',
                name_en: 'JCB 3DX',
                name_hi: 'जेसीबी 3DX',
                name_mr: 'जेसीबी 3DX',
                rate: 1500.00,
                unit: 'HOUR',
                capacity: 'Standard',
                lat: 18.5204,
                lng: 73.8567
            }
        ];

        for (const eq of equipmentList) {
            await pool.query(
                `INSERT INTO equipment (owner_id, type, name_en, name_hi, name_mr, rate_amount, rate_unit, capacity_desc, location_lat, location_lng)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                [ownerId, eq.type, eq.name_en, eq.name_hi, eq.name_mr, eq.rate, eq.unit, eq.capacity, eq.lat, eq.lng]
            );
        }

        console.log('Seeding completed successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seedData();
