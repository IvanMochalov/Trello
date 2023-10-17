import React from 'react';
import { Box, Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { Smile } from '../Smile';
import styles from './notFound.module.css';

export const NotFound = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ height: '100vh' }}>
        <div className={styles.smileWrapper}>
          <Link to='/boards' tabIndex={-1} style={{textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Smile happy={false} />
          </Link>
        </div>
      </Box>
    </Container>
  )
}