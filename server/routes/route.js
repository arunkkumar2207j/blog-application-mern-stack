import express, { Router } from "express";
import { loginUser, signupUser } from "../controllers/user.controller.js";
import { uploadImage, getImage } from "../controllers/image.controller.js";
const router = express.Router()
import upload from "../utils/upload.js";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../controllers/post.controller.js";
import { authenticateToken } from "../controllers/jwt.controller.js";
import { deleteComment, getComments, newComment } from "../controllers/comment.controller.js";

router.post("/signup", signupUser)

router.post("/login", loginUser)

router.post("/file/upload", upload.single("file"), uploadImage)

router.get("/file/:filename", getImage)

router.post("/create", authenticateToken, createPost)

router.get("/posts", authenticateToken, getAllPosts)

router.get("/post/:id", authenticateToken, getPost)

router.put("/update/:id", authenticateToken, updatePost)

router.delete("/delete/:id", authenticateToken, deletePost)

router.post("/comment/new", authenticateToken, newComment)

router.get("/comments/:id", authenticateToken, getComments)

router.delete("/comment/delete/:id", authenticateToken, deleteComment)

export default router