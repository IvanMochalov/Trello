import React from 'react'
import { Container, Box } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import { Smile } from '../Smile'
import styles from './layout.module.css'

export const Layout = () => {
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Box sx={{ height: '100vh', paddingTop: '40px' }}>
          <div className={styles.smileWrapper}>
            <Link to='/boards' tabIndex={-1}>
              <Smile />
            </Link>
          </div>
          <Outlet />
        </Box>
      </Container>
    </React.Fragment>
  )
}