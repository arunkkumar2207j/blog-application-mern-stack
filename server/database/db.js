import mongoose from "mongoose";

export const ConnectDB = async (CONNECTION_STRING) => {
    try {
        await mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true})
        console.log("Database connected Successfully");
    } catch (error) {
        console.log(`Error connecting with database ${error}`);
    }
}

export default ConnectDB;