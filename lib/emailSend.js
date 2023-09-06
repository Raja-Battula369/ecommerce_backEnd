import nodeMalier from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();


export const nodemailerConfig = nodeMalier.createTransport({

    service: "gmail",
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,

    ignoreTLS: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

