import { Link, useOutletContext } from 'react-router-dom';
import { TInitialData } from '../../type';
import Stack from '@mui/material/Stack';
import styles from './boardsList.module.css';
import { Tooltip } from '@mui/material'

export const BoardsList = () => {
  const [initialValue]: [TInitialData] = useOutletContext();
  console.log(initialValue)

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
          <Tooltip title={`Go to ${board.title}`} placement="left">
            <Link className={styles.boardItem} key={board.id} to={`/boards/${board.id}`}>{board.title}</Link>
          </Tooltip>
        )
      })}
    </Stack>
  )
}