import { useOutletContext, useParams } from 'react-router-dom';
import { TOutletContext } from '../../type';
import { Stack } from '@mui/material';
import { BoardTasksList } from '../BoardTasksList/BoardTasksList';
import styles from './boardPage.module.css';
import styled from 'styled-components';
import { NewTask } from '../NewTask';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled.h2`
  font-size: 1em;
  line-height: 1.5;
`

export const BoardPage = () => {
  const { data } = useOutletContext<TOutletContext>();

  const { board_id } = useParams<{ board_id: string }>();
  
  const currentBoard = data.boards[board_id || ''];

  return (
    <Container>
      {currentBoard &&(
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
      )}
    </Container>
  )
}