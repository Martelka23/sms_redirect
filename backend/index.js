import express from "express";

import cors from 'cors';
import router from "./router.js";

const app = express();

app.use(cors({ origin: ['*'], credentials: true }));

app.use(express.json());
app.use('/backend', router);

app.listen(3001, () => console.log('Server is running...'));