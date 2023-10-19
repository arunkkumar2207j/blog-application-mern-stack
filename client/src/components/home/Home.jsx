// import React, { useContext } from 'react'
// import { DataContext } from '../../context/DataProvider'
import Banner from '../banner/Banner'
import Categories from './Categories'
import { Grid } from '@mui/material'
import Posts from './post/Posts'

function Home() {
    // const { account } = useContext(DataContext)
  return (
    <>
      <Banner />
      <Grid container spacing={2}>
        <Grid item lg={2} sm={2} xs={12}>
          <Categories />
        </Grid>
        <Grid container item lg={10} sm={10} xs={12}>
          <Posts />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
