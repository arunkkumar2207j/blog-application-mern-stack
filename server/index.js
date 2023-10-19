import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import ConnectDB from "./database/db.js";
import Router from "./routes/route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors())
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}))
app.use("/", Router)

// app.get("/", (req, res) => {
//     res.status(200).send({message: "Home"})
// })

app.listen(PORT, () => {
    console.log(`App server working Successfully on ${PORT}!`);
})
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

ConnectDB(USERNAME, PASSWORD);