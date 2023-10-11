import { useOutletContext, useParams } from 'react-router-dom';
import { TInitialData } from '../../type';
import { Stack } from '@mui/material';
import { BoardTasksList } from '../BoardTasksList/BoardTasksList';
import styles from './boardPage.module.css';
import styled from 'styled-components';
import { NewTask } from '../NewTask';

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
      {currentBoard === undefined ?
        <p>board not found</p>
        : (
          <>
            <Stack spacing={1} direction="row" sx={{ marginBottom: '20px' }}>
              <div className={styles.boardTitleBox}>
                {currentBoard.title}
              </div>
              <div className={styles.buttonWrapper}>
                <NewTask />
              </div>
            </Stack>
            <BoardTasksList board={currentBoard}/>
          </>
        )
      }
    </Container>
  )
}