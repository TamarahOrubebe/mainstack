const cors = require('cors');
import express, { Application, Request, Response } from 'express';
import productsRouter from './products.routes';

const app: Application = express();
app.use(express.json());

// I am choosing to allow requests from all origins for the purpose of this assessment.
// It is normally better, security wise, to allow a whitelist of origins. 
app.use(cors())

app.get("/", (req: Request, res: Response): void => {
    res.send({message: "Hello there, this is my entry for the mainstack Backend Developer application."});
})

app.use('/products', productsRouter);
app.use('*', (req: Request, res: Response): void => {
    res.status(404).json({"message": "There might be a problem with your url as the page you are looking for is not found"})
})
export default app;