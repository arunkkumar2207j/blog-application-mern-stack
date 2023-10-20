import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import ConnectDB from "./database/db.js";
import Router from "./routes/route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors())
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}))
app.use("/", Router)

if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

app.listen(PORT, () => {
    console.log(`App server working Successfully on ${PORT}!`);
})
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const CONNECTION_STRING = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@clustermumbai.9zjoada.mongodb.net/blog`;

ConnectDB(CONNECTION_STRING);