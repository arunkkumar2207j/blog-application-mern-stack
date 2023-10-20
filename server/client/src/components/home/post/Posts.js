import React, { useEffect, useState } from 'react'
import { API } from "../../../services/api.js";
import { Box, Grid, Typography } from '@mui/material';
import { Link, useSearchParams } from "react-router-dom";
import Post from './Post.js';
import styled from '@emotion/styled';

const PageTitle = styled(Typography)`
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
`

function Posts() {
    const [posts, setPosts] = useState([])
    const [searchParams] = useSearchParams()
    const category = searchParams.get("category")

    useEffect(() =>  {
        const fetchData = async () => {
            let response = await API.getAllPosts({category: category || ""}); 
            if(response.isSuccess) {
                setPosts(response.data)
            }
        }
        fetchData();
    }, [category])
  return (
    <>
        {/* <PageTitle>All Posts</PageTitle> */}
        {
            posts && posts.length > 0 ? posts.map((post) => (
                <Grid item lg={3} sm={4} xs={12}>
                    <Link to={`details/${post._id}`}>
                        <Post post={post} />
                    </Link>
                </Grid>
            )) : <Box style={{color: "#878787", margin: "30px 80px", fontSize: "18px"}}>No Post to Display</Box>
        }
    </>
  )
}

export default Posts
