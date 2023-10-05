import * as React from 'react';
import { BoardsList } from '../BoardsList'
import { NewBoard } from '../NewBoard'
import styles from './mainContent.module.css';

export const MainContent = () => {
  const [boardsList, setBoardsList] = React.useState(() => {
    const list = localStorage.getItem('boardsList')
    if (list && list !== 'undefined') {
      return JSON.parse(list)
    }
    return []
  });
  
  const handleSaveBoard = (boardName: string) => {
    setBoardsList([...boardsList, {id: parseInt(boardsList.at(-1)?.id ?? 0) + 1, name: boardName}])
    localStorage.boardsList =  JSON.stringify([...boardsList, {id: parseInt(boardsList.at(-1)?.id ?? '0') + 1, name: boardName}]);
  };

  return (
    <div className={styles.mainContentWrapper}>
      <div className={styles.boardWrapper}>
        <NewBoard onSaveButtonClick={handleSaveBoard}/>
      </div>
      <div className={styles.boardsListWrapper}>
        <BoardsList list={boardsList}/>
      </div>
    </div>
  )
}

