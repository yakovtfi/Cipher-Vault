import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGOURL = process.env.MONGO_URL;

export const connectDatabase = async () => {
    try {
        await mongoose.connect(MONGOURL);
        console.log('Database is connected');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
