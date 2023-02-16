require("dotenv").config();
import http from 'http';
import app from './app';
import { mongoConnect } from './services/mongo';

const server = http.createServer(app);

const PORT = process.env.PORT || 3000

async function startServer() {
    await mongoConnect();
    server.listen(PORT, () => console.log(`http server started on port ${PORT}`));
}

startServer();
