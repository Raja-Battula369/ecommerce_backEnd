

import app from './app.js';
import connectToDatabase from "./DataBase/db.js";
import dotenv from 'dotenv'

dotenv.config();


const server = () => {

    try {
        connectToDatabase(process.env.DATA_BASE);
        app.listen(process.env.PORT, () => {
            console.log(`listening on ${process.env.PORT}`);
        });
    } catch (error) {
        console.log('listening server failed', error);
    }

};

server();