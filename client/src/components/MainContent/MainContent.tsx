import * as React from 'react';
import { BoardsList } from '../BoardsList'
import { NewBoard } from '../NewBoard'
import styles from './mainContent.module.css';
import { bd } from '../../data';

export const MainContent = () => {
  localStorage.boardsList =  JSON.stringify(bd);
  const [boardsList, setBoardsList] = React.useState(JSON.parse(localStorage.boardsList) || '');

  const saveButtonClickHandler = () => {
    setBoardsList([...boardsList, {id: `${parseInt(boardsList.at(-1).id) + 1}`, name: 'Hi'}])
    localStorage.boardsList =  JSON.stringify([...boardsList, {id: `${parseInt(boardsList.at(-1).id) + 1}`, name: 'Hi'}]);
    console.log(boardsList);
    console.log(localStorage.boardsList);
  };

  return (
    <div className={styles.mainContentWrapper}>
      <div className={styles.boardWrapper}>
        <NewBoard onSaveButtonClick={saveButtonClickHandler}/>
      </div>
      <div className={styles.boardsListWrapper}>
        <BoardsList list={boardsList}/>
      </div>
    </div>
  )
}

