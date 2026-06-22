import 'dotenv/config';
import app from './src/app.js';
import pool from './src/config/db.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        conn.release();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

startServer();
