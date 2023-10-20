import styled from '@emotion/styled'
import { Box, Button, TextareaAutosize, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from "../../../context/DataProvider.jsx";
import { API } from "../../../services/api.js"
import Comment from './Comment.jsx';
import { isEmpty } from '../../../utils/common.utils.js';

const Container = styled(Box)`
    margin-top: 100px;
    display:flex;
`

const Image = styled("img")({
    width: 50,
    height: 50,
    borderRadius: "50%"
})

const StyledTextArea = styled(TextareaAutosize)`
    height: 100%;
    width: 100%;
    margin: 0 20px;
`

const initialValues = {
    name: "",
    postId: "",
    comments: "",
    date: new Date()
}

function Comments({post}) {
    const url = 'https://static.thenounproject.com/png/12017-200.png'
    const [comment, setComment] = useState(initialValues)
    const { account } = useContext(DataContext)
    const [comments, setComments] = useState([])
    const [toggle, setToggle] = useState(false)
    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId:post._id,
            comments: e.target.value
        })
    }
    const addComment = async () => {
        const response = await API.newComment(comment)
        if(response.isSuccess) {
            setComment(initialValues);
        }
        setToggle(prevState => !prevState)
    }
    useEffect(() => {
        if(!isEmpty(post)) {
            const getData = async () => {
                const response = await API.getAllComments(post._id);
                if(response.isSuccess) {
                    setComments(response.data)
                }
            }
            getData();
        }
    }, [post, toggle])
  return (
    <Box>
        <Container>
            <Image src={url} alt="" />
            <StyledTextArea minRows={5} placeholder="what's in your mind" name="comment" value={comment.comments} onChange={e => handleChange(e)} />
            <Button variant='contained' size='medium' color='primary' onClick={e => addComment(e)} style={{height: "40px"}}>POST</Button>
        </Container>
        <Box>
            {comments && comments.length > 0 && comments.map((comment) => (
                <Comment comment={comment} setToggle = {setToggle} />
            ))}
        </Box>
    </Box>
  )
}

export default Comments
