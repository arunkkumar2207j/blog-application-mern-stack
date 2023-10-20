import { Box, Typography, styled } from '@mui/material'
import React, { useContext } from 'react'
import { DataContext } from '../../../context/DataProvider'
import {Delete} from "@mui/icons-material";
import { API } from '../../../services/api';

const Component = styled(Box)`
    margin-top: 30px;
    background: #f5f5f5;
    padding: 10px;
`
const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`

const Name = styled(Typography)`
    font-weight: 600;
`

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`

const DeleteIcon = styled(Delete)`
    margin-left: auto
`

function Comment({comment, setToggle}) {
    const { account } = useContext(DataContext)
    const removeComment = async (e) => {
        const response = await API.deleteComment(comment._id)
        if(response.isSuccess) {
            setToggle(prev => !prev)
        }
    }
  return (
    <Component>
      <Container>
        <Name>{comment.name}</Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {comment.name === account.username ? <DeleteIcon onClick={e => removeComment(e)}/> : null}
      </Container>
      <Box>
        <Typography>{comment.comments}</Typography>
      </Box>
    </Component>
  )
}

export default Comment
