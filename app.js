import express from 'express';
import { connectDatabase } from './config/MongoData.js';
import { PORT } from './config/server.js';
import apiRouter from './routes/index.js';

const app = express();

app.use(express.json());
app.use('/api', apiRouter);

connectDatabase().then((connected) => {
    if (connected) {
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    }
});
