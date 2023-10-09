import { Link, useOutletContext } from 'react-router-dom';
import { Board, initialData } from '../../type';
import Stack from '@mui/material/Stack';
import styles from './boardsList.module.css';

// interface IBoardsListProps {
//   list: Board[];
// }

export const BoardsList = () => {
  const [initialValue]: [initialData] = useOutletContext();

  console.log(initialValue)
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={1}
    >
      {
        initialValue.boardOrder.map((boardId: string) => {
          const board = initialValue.boards[boardId];
          
          return board.title
        })
        // initialValue
        // list?.map((board: Board) => (
        //   <Link className={styles.boardItem} key={board.id} to={`/boards/${board.id}`}>{board.name}</Link>
        // ))
      }
    </Stack>
  )
}