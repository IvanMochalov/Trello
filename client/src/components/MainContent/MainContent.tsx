import * as React from 'react';
import { BoardsList } from '../BoardsList'
import { NewBoard } from '../NewBoard'
import styles from './mainContent.module.css';
import { useOutletContext } from 'react-router-dom'
import { Board } from '../../type'

export const MainContent = () => {
  const [boardsList, handleSaveBoard]: [Board[], (name: string) => void] = useOutletContext();

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

