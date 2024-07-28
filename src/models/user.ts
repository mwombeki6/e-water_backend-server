import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false // hide password in the response
    }
})

const User = mongoose.model<IUser>('User', UserSchema);
export default User;