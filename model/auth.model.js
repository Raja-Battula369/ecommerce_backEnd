
import mongoose from 'mongoose';


const AuthSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        min: 2,
        max: 24,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,

    },
    password: {
        type: String,
        require: true,
    },
    passwordmatch: {
        type: String,
        require: true,
    }
});

const Auth = mongoose.models.Auth ?? mongoose.model("Auth", AuthSchema);

export default Auth;