import React from 'react';
import { Container, Box, Tooltip } from '@mui/material';
import { Link, Outlet, useParams } from 'react-router-dom';
import { Smile } from '../Smile';
import { TBoard, TInitialData, TTask } from '../../type';
import styles from './layout.module.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { initialData } from '../../data/source';
import { DropResult } from 'react-beautiful-dnd';
import { randomId } from '../../utils/getRandomId';
import { instanceOfTBoard } from '../../utils/instanceOfTBoard';
import { instanceOfTTask } from '../../utils/instanceOfTTask';

export const Layout = () => {
  // const [initialValue, setInitialValue] = useLocalStorage<TInitialData | Object>(initialData, 'boardsList')
  const [initialValue, setInitialValue] = useLocalStorage<TInitialData | Object>({ steps: {}, tasks: {}, boards: {}, boardOrder: [] }, 'boardsList')

  const { board_id } = useParams<{ board_id: string }>();
  const currentBoard = initialValue.boards && initialValue.boards[board_id || ''];

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    // console.log('result',result)

    // const step = initialValue.steps[draggableId]
    // console.log('step',step)
    
    // const task = initialValue.tasks[draggableId]
    // console.log('task',task)

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

  const handleSave = (itemName: string, currentItem?: TBoard | TTask ) => {
    const newId = randomId(10);
    let newState = {};

    if (instanceOfTBoard(currentItem)) {
      const newTask = {
        id: newId,
        title: itemName,
        stepIds: [],
        position: 0,
      };
      newState = {
        ...initialValue,
        tasks: {
          ...initialValue.tasks,
          [newTask.id]: newTask,
        },
        boards: {
          ...initialValue.boards,
          [currentItem.id]: {
            ...currentItem,
            taskIds: [
              newId,
              ...currentItem.taskIds,
            ]
          }
        }
      };
    }

    if (instanceOfTTask(currentItem)) {
      const newStep = {
        id: newId,
        content: itemName,
        position: 0,
      };
  
      newState = {
        ...initialValue,
        steps: {
          ...initialValue.steps,
          [newStep.id]: newStep,
        },
        tasks: {
          ...initialValue.tasks,
          [currentItem.id]: {
            ...currentItem,
            stepIds: [
              newId,
              ...currentItem.stepIds
            ]
          }
        }
      };
    }

    if (currentItem === undefined) {
      const newBoard = {
        id: newId,
        title: itemName,
        taskIds: [],
        position: 0,
      };
      newState = {
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
    }

    setInitialValue(newState);
  };

  const handleDeleteBoard = (boardId: string) => {
    const currentBoard = initialValue.boards[boardId]

    currentBoard.taskIds.forEach((taskId: string) => {
      const currentTask = initialValue.tasks[taskId];

      currentTask.stepIds.forEach((stepId: string) => {
        delete initialValue.steps[stepId];
      })

      delete initialValue.tasks[taskId];
    })
    
    delete initialValue.boards[boardId];

    const newBoardOrder = initialValue.boardOrder.filter(function(id: string) {
      return id !== boardId
    })

    const newState = {
      ...initialValue,
      
      boardOrder: newBoardOrder
    }

    setInitialValue(newState);
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Box sx={{ height: '100vh' }}>
          <div className={styles.smileWrapper}>
            <Tooltip title="Go to Main">
              <Link to='/boards' tabIndex={-1}>
                <Smile happy={true}/>
              </Link>
            </Tooltip>
          </div>
          <Outlet context={[
            initialValue,
            handleDragEnd,
            handleSave,
            handleDeleteBoard,
          ]}/>
        </Box>
      </Container>
    </React.Fragment>
  )
}