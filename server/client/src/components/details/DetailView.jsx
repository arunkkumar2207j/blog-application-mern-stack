import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API } from '../../services/api';
import { Box, Typography } from "@mui/material";
import {Edit, Delete} from "@mui/icons-material";
import styled from '@emotion/styled';
import {DataContext} from "../../context/DataProvider.jsx";
import Comments from './comments/Comments.jsx';

const Container = styled(Box)(({theme}) => ({
    margin: "50px 100px",
    // [theme.breakpoints.down("md")]: {margin: 0}
}))
const Header = styled(Typography)`
    font-size: 38px;
    font-weight: bold;
    text-align: center;
    margin: 50px 0 10px 0;
    word-break: break-word;
    width: 100%;
`

const Description = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
    width: 100%;
`

const Image = styled("img")({
    width: "100%",
    height: "50vh",
    objectFit: "cover"
})

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`
const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
    coursor: pointer;
`

const Author = styled(Box)`
    color: #878787;
    margin: 10px;
    display: flex;
`

function DetailView() {
    const { id } = useParams();
    const [post, setPost] = useState({})
    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
    const {account} = useContext(DataContext)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            const response = await API.getPostById(id)
            if(response.isSuccess) {
                setPost(response.data)
            }
        }
        fetchData();
    }, [id])
    const handleDelete = async (postId) => {
        const response = await API.deletePost(postId)
        if(response.isSuccess) {
            navigate(`/`)
        }
    }
  return (
    <Container>
        <Image src={url} alt=" " />
        <Box style={{float: "right"}}>
        {
            account.username === post.username && (
                <>
                    <Link to={`/update/${post._id}`}>
                        <EditIcon color="primary" />
                    </Link>
                    <DeleteIcon color="error" onClick={() => handleDelete(post._id)} />
                </>
            )}
        </Box>
        <Header>{post.title}</Header>
        <Author>
            <Typography> Author: <Box component="span" style={{fontWeight: "bold"}}>{post.username}</Box></Typography>
            <Typography style={{marginLeft: "auto"}}>Created Date: <Box component="span" style={{fontWeight: ""}}>{new Date(post.createdDate).toDateString()}</Box></Typography>
        </Author>
        <Description>{post.description}</Description>
        <Comments post={post} />
    </Container>
  )
}

export default DetailView
