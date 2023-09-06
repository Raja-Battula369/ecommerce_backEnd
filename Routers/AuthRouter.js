
import express from 'express';
import { login, register, restPassword, sendRestToken } from '../controller/authController.js';

const authRouter = express.Router();

//public 
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/send-reset-token', sendRestToken);
authRouter.post('/reset/:id/:token', restPassword);




export default authRouter


