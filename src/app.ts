import express, { Application, Request, Response } from 'express';
import productsRouter from './products.routes';

const app: Application = express();
app.use(express.json());


app.get("/", (req: Request, res: Response): void => {
    res.send({message: "Hello there, this is my entry for the mainstack application"});
})

app.use('/products', productsRouter);

export default app;