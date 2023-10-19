import  Comment from "../models/comment.js";

export const newComment = async (req, res) => {
    try {
        const comment = await Comment.create(req.body)
        comment.save();
        res.status(200).json({msg: "comments added successfully"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({postId: req.params.id})
        res.status(200).json(comments)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

export const deleteComment = async (req, res) => {
    try {
        await Comment.findOneAndDelete(req.params.id)
        res.status(200).json({msg: "comment deleted successfully"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}