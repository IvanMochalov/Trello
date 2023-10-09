import React from 'react'
import { useOutletContext, useParams } from 'react-router-dom';
import { Board } from '../../type';
import { Button, Stack } from '@mui/material';
import { BoardTasksList } from '../BoardTasksList/BoardTasksList';
import styles from './boardPage.module.css';

export const BoardPage = () => {
  const { board_id } = useParams<{ board_id: string }>();

  const [boardsList]: [Board[]] = useOutletContext();

  // const currentBoard = boardsList.find(board => board.id === parseInt((board_id || '')));

  return (
    <Stack spacing={3} direction="column">
      <Stack spacing={1} direction="row" sx={{ marginBottom: '20px' }}>
        <div className={styles.boardTitleBox}>
          {/* {currentBoard?.name} */}
        </div>
        <Button variant="outlined">Добавить список</Button>
      </Stack>
      {/* <BoardTasksList boardId={parseInt(board_id || '')} tasksList={currentBoard?.tasksList} /> */}
    </Stack>
  )
}