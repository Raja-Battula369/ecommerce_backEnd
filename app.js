import express from 'express';
import authRouter from './Routers/AuthRouter.js';
import morgan from 'morgan';
import AppError from './lib/appError.js';

import helmet from "helmet";
import cors from "cors";
import bodyParse from 'body-parser';





const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('short'));
app.use(bodyParse.json({ limit: '20mb', extended: true }));
app.use(bodyParse.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());





// router
app.use('/api/auth', authRouter);

// notfound handler
app.use('*', (req, res, next) => {
    next(new AppError(`Can't find the ${req.originalUrl} on this server`, 404));
})

export default app;

