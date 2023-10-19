import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const user= process.env.DB_USERNAME;
const pass= process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb+srv://${user}:${pass}@clustermumbai.9zjoada.mongodb.net/blog`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];
        if(match.indexOf(file.memeType) === -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
})

export default multer({storage});