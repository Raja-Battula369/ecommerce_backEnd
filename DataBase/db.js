import mongoose from "mongoose";


const connectToDatabase = async (database) => {

    try {
        await mongoose.connect(database).then(() => {
            console.log('Connected to database');
        })
    } catch (error) {
        console.log('error connecting', error);

    }
};

export default connectToDatabase;