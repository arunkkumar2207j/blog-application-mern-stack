import mongoose from "mongoose";

export const ConnectDB = async (user, pass) => {
    const CONNECTION_STRING = `mongodb+srv://${user}:${pass}@clustermumbai.9zjoada.mongodb.net/blog`;
    try {
        await mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true})
        console.log("Database connected Successfully");
    } catch (error) {
        console.log(`Error connecting with database ${error}`);
    }
}

export default ConnectDB;