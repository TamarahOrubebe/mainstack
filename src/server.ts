require("dotenv").config();
import http from 'http';
import app from './app';
import mongoObj from './services/mongo';


const server = http.createServer(app);

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL as string;

async function startServer(MONGO_URL: string) {
    await mongoObj.connect(MONGO_URL);
    server.listen(PORT, () => console.log(`http server started on port ${PORT}`));
}

startServer(MONGO_URL);
