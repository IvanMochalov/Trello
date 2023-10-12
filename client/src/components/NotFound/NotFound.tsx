import React from 'react';
import { Box, Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { Smile } from '../Smile';
import { Tooltip } from '@mui/material';
import styles from './notFound.module.css';
import { styled } from 'styled-components'

const Title = styled.h3`
  color: #5a41c8;
  text-transform: uppercase;
  font-size: 1.3rem;
`

export const NotFound = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ height: '100vh' }}>
        <div className={styles.smileWrapper}>
          <Tooltip title="Go to Main">
            <Link to='/boards' tabIndex={-1}>
              <Smile happy={false} />
            </Link>
          </Tooltip>
          <Title>not found</Title>
        </div>
      </Box>
    </Container>
  )
}