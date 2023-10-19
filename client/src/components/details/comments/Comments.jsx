import styled from '@emotion/styled'
import { Box, Button, TextareaAutosize } from '@mui/material'
import React from 'react'

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

function Comments({post}) {
    const url = 'https://static.thenounproject.com/png/12017-200.png'
  return (
    <Box>
        <Container>
            <Image src={url} alt="" />
            <StyledTextArea minRows={5} placeholder="what's in your mind" />
            <Button variant='content' size='medium' color='primary' style={{height: "40px"}}>POST</Button>
        </Container>
        <Box></Box>
    </Box>
  )
}

export default Comments
