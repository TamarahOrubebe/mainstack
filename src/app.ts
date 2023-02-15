require("dotenv").config();

import express, { Application, Request, Response } from 'express';
import { mongoConnect } from './services/mongo';
import productsRouter from './products.routes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

mongoConnect();
app.use(express.json());


app.get("/", (req: Request, res: Response): void => {
    res.send("Hello");
})

app.use('/products', productsRouter);

app.listen(PORT, ():void => console.log(`Server started on port ${PORT}`))


