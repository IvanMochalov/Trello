import { useOutletContext, useParams } from 'react-router-dom';
import { TInitialData } from '../../type';
import { Stack } from '@mui/material';
import { BoardTasksList } from '../BoardTasksList/BoardTasksList';
import styles from './boardPage.module.css';
import styled from 'styled-components';
import { NewTask } from '../NewTask';
import { NotFound } from '../NotFound'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled.h2`
  font-size: 1em;
  line-height: 1.5;
  
`

export const BoardPage = () => {
  const [initialData]: [TInitialData] = useOutletContext();

  const { board_id } = useParams<{ board_id: string }>();
  
  const currentBoard = initialData.boards[board_id || ''];

  return (
    <Container>
      {currentBoard === undefined ?
        <NotFound />
        : (
          <>
            <Stack spacing={1} direction="row" sx={{ marginBottom: '20px' }}>
              <div className={styles.boardTitleBox}>
                <Title>
                  {currentBoard.title}
                </Title>
              </div>
              <div className={styles.buttonWrapper}>
                <NewTask currBoard={currentBoard}/>
              </div>
            </Stack>
            <BoardTasksList board={currentBoard}/>
          </>
        )
      }
    </Container>
  )
}