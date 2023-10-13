import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { TInitialData } from '../../type';
import Stack from '@mui/material/Stack';
import styles from './boardsList.module.css';
import { Tooltip } from '@mui/material';
import { BoardActions } from '../BoardActions';
import styled from 'styled-components';

const BoardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  overflow: hidden;
  width: 100%;
  overflow-wrap: break-word;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  background-color: #fff;
  font-weight: 600;
  font-size: 1.2em;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  padding: 8px;

  &:active {
    box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
  }
  &:hover {
    -webkit-text-decoration: none;
    text-decoration: none;
    background-color: #eaeaea;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  }
  &:focus-visible {
    outline: none;
    -webkit-text-decoration: none;
    text-decoration: none;
    background-color: #eaeaea;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  }
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
      {initialValue.boardOrder && initialValue.boardOrder.map((boardId: string) => {
        const board = initialValue.boards[boardId];
        
        return (
          <Tooltip key={board.id} title={`Go to ${board.title}`} placement="top">
            <BoardWrapper tabIndex={0}>
              <Link className={styles.boardItemLink} key={board.id} to={`/boards/${board.id}`} tabIndex={-1}>{board.title}</Link>
              <BoardActions board={board}/>
            </BoardWrapper>
          </Tooltip>
        )
      })}
    </Stack>
  )
}