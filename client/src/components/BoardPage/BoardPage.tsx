import { useOutletContext, useParams } from 'react-router-dom';
import { TOutletContext } from '../../type';
import { BoardTasksList } from '../BoardTasksList/BoardTasksList';
import styles from './boardPage.module.css';
import styled from 'styled-components';
import { NewTask } from '../NewTask';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ActionsWrapper = styled.div`
  display: flex;
  // align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
`
const Title = styled.h2`
  font-size: 1rem;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const BoardPage = () => {
  const { data } = useOutletContext<TOutletContext>();

  const { board_id } = useParams<{ board_id: string }>();
  
  const currentBoard = data.boards[board_id || ''];

  return (
    <Container>
      {currentBoard &&(
        <>
        <ActionsWrapper>
          <div className={styles.boardTitleBox}>
            <Title>
              {currentBoard.title}
            </Title>
          </div>
          <div className={styles.buttonWrapper}>
            <NewTask currBoard={currentBoard}/>
          </div>
        </ActionsWrapper>
        <BoardTasksList board={currentBoard}/>
        </>
      )}
    </Container>
  )
}