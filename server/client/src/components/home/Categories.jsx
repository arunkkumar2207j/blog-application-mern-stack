import React from 'react'
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { categories } from "../../constants/data.js";
import styled from '@emotion/styled';
import { Link, useSearchParams } from 'react-router-dom';

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`

const StyledButton = styled(Button)`
    margin: 20px;
    color: #fff;
    width: 80%;
    background: #6495ED;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

function Categories() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get("category")
  return (
    <>
      <StyledLink to={`/create?category=${category || ""}`}><StyledButton variant='contained'>Create Blog</StyledButton></StyledLink>
      <StyledTable>
        <TableHead>
            <TableRow>
                <TableCell>
                  <StyledLink to={`/`}>All Categories</StyledLink>
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            { categories.map((category) => 
                <TableRow key={category.id}>
                    <TableCell>
                      <StyledLink to={`/?category=${category.type}`}>{category.type}</StyledLink>
                    </TableCell>
                </TableRow>
                )}
            
        </TableBody>
      </StyledTable>
    </>
  )
}

export default Categories
