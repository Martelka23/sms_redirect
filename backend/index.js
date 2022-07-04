import express from "express";

import cors from 'cors';

import userRouter from './src/routes/userRouter.js';
import messageRouter from "./src/routes/messageRouter.js";

const app = express();

app.use(cors({ origin: ['*'], credentials: true }));

app.use(express.json());
app.use('/backend/user', userRouter);
app.use('/backend/message', messageRouter);

app.listen(3001, () => console.log('Server is running...'));