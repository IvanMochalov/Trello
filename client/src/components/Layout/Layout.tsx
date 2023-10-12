import React from 'react';
import { Container, Box, Tooltip } from '@mui/material';
import { Link, Outlet, useParams } from 'react-router-dom';
import { Smile } from '../Smile';
import { TInitialData, TTask } from '../../type';
import styles from './layout.module.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { initialData } from '../../data/source';
import { DropResult } from 'react-beautiful-dnd';
import { randomId } from '../../utils/getRandomId';

export const Layout = () => {
  const [initialValue, setInitialValue] = useLocalStorage<TInitialData | Object>(initialData, 'boardsList')
  // const [initialValue, setInitialValue] = useLocalStorage<TInitialData | Object>({}, 'boardsList')

  const { board_id } = useParams<{ board_id: string }>();
  const currentBoard = initialValue.boards[board_id || ''];

  const handleSaveBoard = (boardName: string) => {
    const newId = randomId(10);

    const newBoard = {
      id: newId,
      title: boardName,
      taskIds: [],
      position: 0,
    };

    const newState = {
      ...initialValue,
      boards: {
        ...initialValue.boards,
        [newBoard.id]: newBoard,
      },
      boardOrder: [
        newId,
        ...initialValue.boardOrder,
      ]
    };

    setInitialValue(newState);
  };

  const handleSaveTask = (taskName: string) => {
    const newId = randomId(10);

    const newTask = {
      id: newId,
      title: taskName,
      stepIds: [],
      position: 0,
    };

    const newState = {
      ...initialValue,
      tasks: {
        ...initialValue.tasks,
        [newTask.id]: newTask,
      },
      boards: {
        ...initialValue.boards,
        [currentBoard.id]: {
          ...currentBoard,
          taskIds: [
            newId,
            ...currentBoard.taskIds,
          ]
        }
      }
    };

    setInitialValue(newState);
  };

  const handleSaveStep = (stepName: string, currentTask: TTask) => {
    const newId = randomId(10);

    const newStep = {
      id: newId,
      content: stepName,
      position: 0,
    };

    const newState = {
      ...initialValue,
      steps: {
        ...initialValue.steps,
        [newStep.id]: newStep,
      },
      tasks: {
        ...initialValue.tasks,
        [currentTask.id]: {
          ...currentTask,
          stepIds: [
            newId,
            ...currentTask.stepIds
          ]
        }
      }
    };

    setInitialValue(newState);
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    console.log(result)

    const step = initialValue.steps[draggableId]
    console.log(step)
    
    const task = initialValue.tasks[draggableId]
    console.log(task)

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
            <Tooltip title="Go to Main">
              <Link to='/boards' tabIndex={-1}>
                <Smile />
              </Link>
            </Tooltip>
          </div>
          <Outlet context={[
            initialValue,
            handleDragEnd,
            handleSaveBoard,
            handleSaveTask,
            handleSaveStep,
          ]}/>
        </Box>
      </Container>
    </React.Fragment>
  )
}