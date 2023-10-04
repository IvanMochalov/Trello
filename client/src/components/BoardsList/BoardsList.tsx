import * as React from 'react';
import Stack from '@mui/material/Stack';
import styles from './boardsList.module.css';
import { Link } from 'react-router-dom';
import { Board } from '../../type';

interface IBoardsListProps {
  list: Board[];
}

export const BoardsList = ({ list }: IBoardsListProps) => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={1}
    >
      {
        list && list.map((board: Board) => (
          <Link className={styles.boardItem} key={board.id} to={`/boards/${board.id}`}>{board.name}</Link>
        ))
      }
    </Stack>
  )
}