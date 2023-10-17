import React from 'react';
import { Container, Box } from '@mui/material';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { Smile } from '../Smile';
import { TBoard, TInitialData, TStep, TTask } from '../../type';
import styles from './layout.module.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { DropResult } from 'react-beautiful-dnd';
import { randomId } from '../../utils/getRandomId';
import { instanceOfTBoard } from '../../utils/instanceOfTBoard';
import { instanceOfTTask } from '../../utils/instanceOfTTask';

export const Layout = () => {
  const [initialValue, setInitialValue] = useLocalStorage<TInitialData | Object>({ steps: {}, tasks: {}, boards: {}, boardOrder: [] }, 'boardsList');

  const { board_id } = useParams<{ board_id: string }>();
  const currentBoard = initialValue.boards && initialValue.boards[board_id || ''];

  const [isHappy, setIsHappy] = React.useState(true);
  const location = useLocation()

  React.useEffect(() => {
    if ((location.pathname === `/boards/${board_id}`) && (currentBoard === undefined)) {
      setIsHappy(false);
    } else {
      setIsHappy(true);
    }

  }, [board_id, currentBoard, location])


  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

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

  const handleSave = (itemName: string, currentParent?: TBoard | TTask ) => {
    const newId = randomId(10);
    let newState = {};

    if (instanceOfTBoard(currentParent)) {
      const newTask = {
        id: newId,
        title: itemName,
        stepIds: [],
      };
      newState = {
        ...initialValue,
        tasks: {
          ...initialValue.tasks,
          [newTask.id]: newTask,
        },
        boards: {
          ...initialValue.boards,
          [currentParent.id]: {
            ...currentParent,
            taskIds: [
              newId,
              ...currentParent.taskIds,
            ]
          }
        }
      };
    }

    if (instanceOfTTask(currentParent)) {
      const newStep = {
        id: newId,
        title: itemName,
        done: false,
      };
  
      newState = {
        ...initialValue,
        steps: {
          ...initialValue.steps,
          [newStep.id]: newStep,
        },
        tasks: {
          ...initialValue.tasks,
          [currentParent.id]: {
            ...currentParent,
            stepIds: [
              newId,
              ...currentParent.stepIds
            ]
          }
        }
      };
    }

    if (currentParent === undefined) {
      const newBoard = {
        id: newId,
        title: itemName,
        taskIds: [],
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

  const handleDelete = (currentItem: TBoard | TTask | TStep, currentParent?: TBoard | TTask) => {
    let newState = {};

    if (instanceOfTBoard(currentItem)) {
      const currentBoard = initialValue.boards[currentItem.id]
  
      currentBoard.taskIds.forEach((taskId: string) => {
        const currentTask = initialValue.tasks[taskId];
  
        currentTask.stepIds.forEach((stepId: string) => {
          delete initialValue.steps[stepId];
        })
  
        delete initialValue.tasks[taskId];
      })
      
      delete initialValue.boards[currentItem.id];
  
      const newBoardOrder = initialValue.boardOrder.filter(function(id: string) {
        return id !== currentItem.id
      })
  
      newState = {
        ...initialValue,
        
        boardOrder: newBoardOrder
      };
    }

    if (instanceOfTTask(currentItem) && currentParent !== undefined) {
      const currentTask = initialValue.tasks[currentItem.id]

      currentTask.stepIds.forEach((stepId: string) => {
        delete initialValue.steps[stepId];
      })

      delete initialValue.tasks[currentItem.id];

      const currentBoardTaskIds = initialValue.boards[currentParent.id].taskIds.filter(function(id: string) {
        return id !== currentItem.id
      })

      newState = {
        ...initialValue,
        boards: {
          ...initialValue.boards,
          [currentParent.id]: {
            ...initialValue.boards[currentParent.id],
            taskIds: currentBoardTaskIds
          }
        }
      };
    }

    if (!instanceOfTBoard(currentItem) && !instanceOfTTask(currentItem) && currentParent !== undefined) {
      delete initialValue.steps[currentItem.id];

      const currentTaskStepIds = initialValue.tasks[currentParent.id].stepIds.filter(function(id: string) {
        return id !== currentItem.id
      })

      newState = {
        ...initialValue,
        tasks: {
          ...initialValue.tasks,
          [currentParent.id]: {
            ...initialValue.tasks[currentParent.id],
            stepIds: currentTaskStepIds
          }
        }
      };
    }

    setInitialValue(newState);
  };

  const handleEdit = (currentItem: TBoard | TTask | TStep, newItemName: string) => {
    let newState = {};

    if (currentItem.title === newItemName) {
      return
    }
    
    if (instanceOfTBoard(currentItem)) {
      const currentBoard = initialValue.boards[currentItem.id]
  
      const newBoard = {
        ...currentBoard,
        title: newItemName,
      };
      
      newState = {
        ...initialValue,
        boards: {
          ...initialValue.boards,
          [newBoard.id]: newBoard,
        },
      };
    }

    if (instanceOfTTask(currentItem)) {
      const currentTask = initialValue.tasks[currentItem.id]
  
      const newTask = {
        ...currentTask,
        title: newItemName,
      };
  
      newState = {
        ...initialValue,
        tasks: {
          ...initialValue.tasks,
          [newTask.id]: newTask,
        },
      };
    }

    if (!instanceOfTTask(currentItem) && !instanceOfTBoard(currentItem)) {
      const currentStep = initialValue.steps[currentItem.id]
  
      const newStep = {
        ...currentStep,
        title: newItemName,
      };
  
      newState = {
        ...initialValue,
        steps: {
          ...initialValue.steps,
          [newStep.id]: newStep,
        },
      };
    }
    
    setInitialValue(newState);
  }

  const handleToggleDone = (currentItem: TStep) => {
    const currentStep = initialValue.steps[currentItem.id]

    const newStep = {
      ...currentStep,
      done: !currentStep.done
    };

    const newState = {
      ...initialValue,
      steps: {
        ...initialValue.steps,
        [newStep.id]: newStep,
      },
    };
  
    setInitialValue(newState);
  }

  const handleSort = (ids: string[], currentParent: TTask, direction: boolean) => {
    if (ids.length === 0 || ids === undefined) {
      return;
    }

    const newStepIds = ids.map((id) => {
      return initialValue.steps[id];
    }).sort((a,b) => {
      return !direction ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    }).map((step) => step.id);
    
    const newState = {
      ...initialValue,
      tasks: {
        ...initialValue.tasks,
        [currentParent.id]: {
          ...currentParent,
          stepIds: newStepIds
        },
      },
    };
  
    setInitialValue(newState);
  }

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Box sx={{ height: '100vh' }}>
          <div className={styles.smileWrapper}>
            <Link to='/boards' tabIndex={-1} style={{textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Smile happy={isHappy}/>
            </Link>
          </div>
          <Outlet
            context={{
              data: initialValue,
              handlers: {
                dragEnd: handleDragEnd,
                itemSave: handleSave,
                itemDelete: handleDelete,
                itemEdit: handleEdit,
                itemSort: handleSort,
                itemToggleDone: handleToggleDone,
              }
            }}
          />
        </Box>
      </Container>
    </React.Fragment>
  )
}