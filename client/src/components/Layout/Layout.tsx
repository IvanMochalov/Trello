import React from 'react';
import { Container, Box } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { Smile } from '../Smile';
import { Board } from '../../type';
import styles from './layout.module.css';
import {bd} from '../../data';

export const Layout = () => {
  localStorage.setItem('boardsList', JSON.stringify(bd));
  const [boardsList, setBoardsList] = React.useState<Board[]>(() => {
    const list = localStorage.getItem('boardsList')
    if (list && list !== 'undefined') {
      return JSON.parse(list)
    }
    return []
  });

  const handleSaveBoard = (boardName: string) => {
    setBoardsList((prev) => [...prev, {id: (prev.at(-1)?.id ?? 0) + 1, name: boardName}]);
    localStorage.boardsList =  JSON.stringify([...boardsList, {id: (boardsList.at(-1)?.id ?? 0) + 1, name: boardName}]);
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Box sx={{ height: '100vh', paddingTop: '40px' }}>
          <div className={styles.smileWrapper}>
            <Link to='/boards' tabIndex={-1}>
              <Smile />
            </Link>
          </div>
          <Outlet context={[boardsList, handleSaveBoard]}/>
        </Box>
      </Container>
    </React.Fragment>
  )
}