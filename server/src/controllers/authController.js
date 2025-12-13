const { pool } = require('../config/db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_khetbandhu_2025';

// Mock OTP storage (In production, use Redis)
const otpStore = new Map(); // phone -> { otp, expiry }

exports.requestOTP = async (req, res) => {
    const { phone, role } = req.body;

    if (!phone || !role) {
        return res.status(400).json({ status: 'ERROR', message: 'Phone and Role are required' });
    }

    // Generate Mock OTP
    const otp = '1234';
    const expiry = Date.now() + 5 * 60 * 1000; // 5 mins

    otpStore.set(phone, { otp, expiry });

    console.log(`[DEV] OTP for ${phone} is ${otp}`);

    // In production: await smsService.send(phone, otp);

    res.json({
        status: 'SUCCESS',
        message: 'OTP sent successfully',
        dev_note: 'Use OTP 1234 for testing',
        otp_id: Date.now()
    });
};

exports.verifyOTP = async (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        return res.status(400).json({ status: 'ERROR', message: 'Phone and OTP are required' });
    }

    const storedData = otpStore.get(phone);

    if (!storedData) {
        return res.status(400).json({ status: 'ERROR', message: 'OTP not requested or expired' });
    }

    if (storedData.otp !== otp) {
        return res.status(401).json({ status: 'ERROR', message: 'Invalid OTP' });
    }

    if (Date.now() > storedData.expiry) {
        otpStore.delete(phone);
        return res.status(400).json({ status: 'ERROR', message: 'OTP expired' });
    }

    try {
        // Check if user exists, else create (or handle registration flow)
        let userResult = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
        let user = userResult.rows[0];

        if (!user) {
            // Auto-register for now (or return flag to frontend to redirect to signup)
            const newUser = await pool.query(
                'INSERT INTO users (phone, role) VALUES ($1, $2) RETURNING *',
                [phone, 'user_pending'] // Default role, specific role logic needed
            );
            user = newUser.rows[0];
        }

        // Generate Token
        const token = jwt.sign(
            { id: user.id, phone: user.phone, role: user.role },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        otpStore.delete(phone); // Clear OTP

        res.json({
            status: 'SUCCESS',
            message: 'Authenticated successfully',
            token,
            user: {
                id: user.id,
                phone: user.phone,
                role: user.role,
                kyc_status: user.kyc_status
            }
        });

    } catch (err) {
        console.error('Auth Error:', err);
        res.status(500).json({ status: 'ERROR', message: 'Internal Server Error' });
    }
};
