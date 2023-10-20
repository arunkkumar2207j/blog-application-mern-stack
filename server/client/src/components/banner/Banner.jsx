import React from 'react'
import { Box, Typography, styled } from "@mui/material";

const Image = styled(Box)`
    background: url("https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg") center/55% repeat-x #000;
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Heading = styled(Typography)`
    color: #fff;
    font-size: 70px;
    line-height: 1;
`
const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #fff;
    padding: 5px 10px;
`
function Banner() {
  return (
    <Image>
      <Heading>BLOG</Heading>
      <SubHeading>Code from Interview</SubHeading>
    </Image>
  )
}

export default Banner
