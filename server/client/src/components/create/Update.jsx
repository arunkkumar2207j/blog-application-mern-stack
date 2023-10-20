import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, FormControl, InputBase, TextareaAutosize } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styled from '@emotion/styled';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../services/api';
const Image = styled("img")({
    width: '100%',
    height: "50vh",
    objectFit: "cover"
})
const Container = styled(Box)`
    margin: 50px 100px;
`
const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display:flex;
    flex-direction: row;
`
const InputTextField = styled(InputBase)`
    flex:1;
    margin: 0 30px;
    font-size: 25px;
`
const TextArea = styled(TextareaAutosize)`
    width: 100%;
    margin-top: 50px;
    font-size: 18px;
    border: none;
    &:focus-visible {
        outline: none
    }
`

const initialPost = {
    title: '',
    description: '',
    picture:'',
    username: '',
    categories: '',
    createdDate: new Date()
}

function Update() {
    const [post, setPost] = useState(initialPost)
    const [file, setFile] = useState("")
    const { id } = useParams();
    const location = useLocation()
    const navigate = useNavigate()
    const { account } = useContext(DataContext)
    const url = post.picture ? post.picture :"https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
    
    useEffect(() => {
        const getImage = async () => {
            if(file) {
                const data = new FormData();
                data.append("name", file.name)
                data.append("file", file);
                //API call
                const response = await API.uploadFile(data)
                post.picture = response.data;
            }
        }
        getImage();
        post.categories = location.search?.split("=")[1] || "All"
        post.username = account.username;
    }, [file])

    useEffect(() => {
        const fetchData = async () => {
            const response = await API.getPostById(id)
            if(response.isSuccess) {
                setPost(response.data)
            }
        }
        fetchData();
    }, [])

    const handleChange = (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }
    const updatePost = async () => {
        const response = await API.updatePost(post)
        if(response.isSuccess) {
            navigate(`/details/${id}`)
        }
    }
  return (
    <Container>
        <Image src={url} alt='banner' />
        <StyledFormControl>
            <label htmlFor='fileInput'><AddCircleIcon fontSize='large' color='action' /></label>
            <input type='file' id='fileInput' style={{display: "none"}} onChange={(e) => setFile(e.target.files[0])} />
            <InputTextField placeholder='Title' value={post.title} name="title" onChange={e => handleChange(e)} />
            <Button variant='contained' onClick={updatePost}>UPDATE</Button>
        </StyledFormControl>
        <TextArea minRows={5} placeholder='tell your story' value={post.description} name='description' onChange={e => handleChange(e)}  />
    </Container>
  )
}

export default Update
