import React from 'react';
import { Container, Box } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { Smile } from '../Smile';
import { Board } from '../../type';
import styles from './layout.module.css';
import {bd} from '../../data';

export const Layout = () => {
  // localStorage.setItem('boardsList', JSON.stringify(bd));
  const [boardsList, setBoardsList] = React.useState<Board[]>(() => {
    const list = localStorage.getItem('boardsList')
    if (list && list !== 'undefined') {
      return JSON.parse(list)
    }
    return []
  });

  const handleSaveBoard = (boardName: string) => {
    setBoardsList((prev) => {
      const id = prev.reduce((sum, curr) => {
        return curr.id > sum ? curr.id + 1 : sum + 1;
      }, 0);
      return [...prev, {id, name: boardName}]
    });
  };

  React.useEffect(() => {
    console.log('useEffect')
    localStorage.boardsList =  JSON.stringify([...boardsList]);
  }, [boardsList])

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