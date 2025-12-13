const { Client } = require('pg');
require('dotenv').config();

const setupDatabase = async () => {
    const client = new Client({
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: 'postgres', // Connect to default DB
        password: process.env.DB_PASSWORD || 'postgres',
        port: process.env.DB_PORT || 5432,
    });

    try {
        await client.connect();

        // Check if DB exists
        const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'khet_bandhu'");
        if (res.rowCount === 0) {
            console.log('Creating database khet_bandhu...');
            await client.query('CREATE DATABASE khet_bandhu');
            console.log('Database created successfully.');
        } else {
            console.log('Database khet_bandhu already exists.');
        }
    } catch (err) {
        console.error('Database setup failed:', err);
    } finally {
        await client.end();
    }
};

setupDatabase();
