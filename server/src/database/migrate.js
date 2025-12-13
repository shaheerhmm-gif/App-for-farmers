const { pool } = require('../config/db');
const fs = require('fs');
const path = require('path');

const migrate = async () => {
    try {
        console.log('Running migration...');
        const schemaPath = path.join(__dirname, 'schema.sql');
        const sql = fs.readFileSync(schemaPath, 'utf8');

        await pool.query(sql);
        console.log('Migration completed successfully (Tables created).');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
};

migrate();
