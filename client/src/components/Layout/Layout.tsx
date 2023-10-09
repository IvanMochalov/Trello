import React from 'react';
import { Container, Box } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { Smile } from '../Smile';
import { Board } from '../../type';
import styles from './layout.module.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {initialData} from '../../data/source'
import { DropResult } from 'react-beautiful-dnd';

export const Layout = () => {
  const [initialValue, setInitialValue] = useLocalStorage(initialData, 'boardsList')

  // const handleSaveBoard = (boardName: string) => {
  //   setBoardsList((prev: Board[]) => {
  //     const id = prev.reduce((sum, curr) => {
  //       return curr.id > sum ? curr.id + 1 : sum + 1;
  //     }, 0);
  //     return [...prev, {id, name: boardName}]
  //   });
  // };

  // const handleDragEnd = (result: DropResult) => {
  //   const { destination, source } = result;


  //   // const currentBoard = boardsList.find((board: Board) => board.id === (board_id ));
  //   // console.log('result', result)

  //   if (!destination) {
  //     return;
  //   }

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }

  //   // const task = currentBoard.tasksList ? currentBoard.tasksList[Number(source.droppableId)-1] : null;
  //   // const listSteps = task?.listSteps;
  //   // const cutStep = listSteps?.splice(source.index, 1);
  //   // cutStep && task?.listSteps?.splice(destination.index, 0, cutStep[0]);
    
  //   return result
  // }
  console.log(initialValue)

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Box sx={{ height: '100vh', paddingTop: '40px' }}>
          <div className={styles.smileWrapper}>
            <Link to='/boards' tabIndex={-1}>
              <Smile />
            </Link>
          </div>
          <Outlet context={[
            initialValue,
            // handleSaveBoard,
            // handleDragEnd
          ]}/>
        </Box>
      </Container>
    </React.Fragment>
  )
}