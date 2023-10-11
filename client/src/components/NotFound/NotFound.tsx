import React from 'react';
import { Box, Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { Smile } from '../Smile';
import { Tooltip } from '@mui/material';
import styles from './notFound.module.css';

export const NotFound = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ height: '100vh', paddingTop: '40px' }}>
        <div className={styles.smileWrapper}>
          <p>not found</p>
          <Tooltip title="Go to Main">
            <Link to='/boards' tabIndex={-1}>
              <Smile />
            </Link>
          </Tooltip>
        </div>
      </Box>
    </Container>
  )
}