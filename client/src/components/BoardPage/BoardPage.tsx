import { useOutletContext, useParams } from 'react-router-dom';
import { TInitialData } from '../../type';
import { Button, Stack } from '@mui/material';
import { BoardTasksList } from '../BoardTasksList/BoardTasksList';
import styles from './boardPage.module.css';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const BoardPage = () => {
  const [initialData]: [TInitialData] = useOutletContext();

  const { board_id } = useParams<{ board_id: string }>();
  
  const currentBoard = initialData.boards[board_id || ''];

  return (
    <Container>
      <Stack spacing={1} direction="row" sx={{ marginBottom: '20px' }}>
        <div className={styles.boardTitleBox}>
          {currentBoard.title}
        </div>
        <Button variant="outlined">Добавить список</Button>
      </Stack>
      <BoardTasksList board={currentBoard}/>
    </Container>
  )
}