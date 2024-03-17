// src/index.ts
require('dotenv').config()
import express from 'express';
import bodyParser from 'body-parser';
import { connectToDatabase } from './db/db';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';



const app = express();
const PORT = process.env.PORT

app.use(bodyParser.json());

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, async () => {
    await connectToDatabase(); // Connect to MongoDB
    console.log(`Server is running at http://localhost:${PORT}`);
});

