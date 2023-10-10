import React from 'react';
import { Container, Box } from '@mui/material';
import { Link, Outlet, useParams } from 'react-router-dom';
import { Smile } from '../Smile';
import { TInitialData } from '../../type';
import styles from './layout.module.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {initialData} from '../../data/source';
import { DropResult } from 'react-beautiful-dnd';

export const Layout = () => {
  const [initialValue, setInitialValue] = useLocalStorage<TInitialData>(initialData, 'boardsList')

  const { board_id } = useParams<{ board_id: string }>();
  
  const currentBoard = initialValue.boards[board_id || ''];

  const handleSaveBoard = (boardName: string) => {
    // setBoardsList((prev: Board[]) => {
    //   const id = prev.reduce((sum, curr) => {
    //     return curr.id > sum ? curr.id + 1 : sum + 1;
    //   }, 0);
    //   return [...prev, {id, name: boardName}]
    // });
    console.log(boardName)
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    console.log(result)

    const step = initialValue.steps[draggableId]
    console.log(step)

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'task') {
      const newTaskIds = Array.from(currentBoard.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newBoard = {
        ...currentBoard,
        taskIds: newTaskIds,
      };

      const newState = {
        ...initialValue,
        boards: {
          ...initialValue.boards,
          [currentBoard.id]: newBoard,
        },
      };

      setInitialValue(newState);
      return;
    }

    const home = initialValue.tasks[source.droppableId];
    const foreign = initialValue.tasks[destination.droppableId];

    if (home === foreign) {
      const newStepIds = Array.from(home.stepIds);
      newStepIds.splice(source.index, 1);
      newStepIds.splice(destination.index, 0, draggableId);
  
      const newTask = {
        ...home,
        stepIds: newStepIds,
      };
  
      const newState = {
        ...initialValue,
        tasks: {
          ...initialValue.tasks,
          [newTask.id]: newTask,
        },
      };
  
      setInitialValue(newState)
      return;
    }

    const homeStepIds = Array.from(home.stepIds);
    homeStepIds.splice(source.index, 1);
    const newHome = {
      ...home,
      stepIds: homeStepIds,
    };

    const foreignStepIds = Array.from(foreign.stepIds);
    foreignStepIds.splice(destination.index, 0, draggableId)
    const newForeign = {
      ...foreign,
      stepIds: foreignStepIds,
    };

    const newState = {
      ...initialValue,
      tasks: {
        ...initialValue.tasks,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };

    setInitialValue(newState)
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Box sx={{ height: '100vh', paddingTop: '40px' }}>
          <div className={styles.smileWrapper}>
            <Link to='/boards' tabIndex={-1}>
              <Smile />
            </Link>
          </div>
          <Outlet context={[
            initialValue,
            handleSaveBoard,
            handleDragEnd
          ]}/>
        </Box>
      </Container>
    </React.Fragment>
  )
}