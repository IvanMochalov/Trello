import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { TInitialData } from '../../type';
import Stack from '@mui/material/Stack';
import styles from './boardsList.module.css';
import { Tooltip } from '@mui/material';


import styled from 'styled-components';
import { DeleteButton } from '../DeleteButton'
import { EditButton } from '../EditButton'

const BoardWrapper = styled.div`
  display: flex;
`

const BoardActionsWrapper = styled.div`
  display: flex;
  margin-right: 10px;
`

export const BoardsList = () => {
  const [initialValue]: [TInitialData] = useOutletContext();
  
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={1}
    >
      {initialValue.boardOrder.map((boardId: string) => {
        const board = initialValue.boards[boardId];
        
        return (
          <BoardWrapper>
            <BoardActionsWrapper>
              <EditButton />
              <DeleteButton />
            </BoardActionsWrapper>
            <Tooltip key={board.id} title={`Go to ${board.title}`} placement="top">
              <Link className={styles.boardItem} key={board.id} to={`/boards/${board.id}`}>{board.title}</Link>
            </Tooltip>
          </BoardWrapper>
        )
      })}
    </Stack>
  )
}