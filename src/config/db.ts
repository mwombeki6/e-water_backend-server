import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (process.env.MONGO_URI) {
            await mongoose.connect(process.env.MONGO_URI);
            console.log("MongoDB Connected...");
        } else {
            console.error("MongoDB connection error. Please make sure MongoDB is running.");
            process.exit(1);
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

export default connectDB;

