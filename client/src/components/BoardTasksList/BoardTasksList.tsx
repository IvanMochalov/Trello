import { Task } from '../../type';
import { Stack } from '@mui/material';
import { TaskStepsList } from '../TaskStepsList';
import { DragDropContext } from 'react-beautiful-dnd';
import type { OnDragEndResponder } from 'react-beautiful-dnd';
import { useOutletContext } from 'react-router';

interface IBoardTasksListProps {
  tasksList?: Task[]
  boardId: number
}

export const BoardTasksList = ({ tasksList, boardId }: IBoardTasksListProps) => {
  const [handleDragEnd]: [() => void] = useOutletContext();

  // const handleDragEnd = (result: DropResult) => {
  //   const { destination, source } = result;

  //   // console.log('result', result)

  //   if (!destination) {
  //     return;
  //   }

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }

  //   const task = tasksList ? tasksList[Number(source.droppableId)-1] : null;
  //   const listSteps = task?.listSteps;
  //   const cutStep = listSteps?.splice(source.index, 1);
  //   cutStep && task?.listSteps?.splice(destination.index, 0, cutStep[0]);

  //   console.log('listSteps', listSteps)
    
  //   return result
  // }

  return (
    <Stack spacing={2} direction="row">
      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        {/* {tasksList?.map((task: Task) => (
          <TaskStepsList key={task.id} listId={task.id} listName={task.listName} steps={task.listSteps} />
        ))} */}
      </DragDropContext>
    </Stack>
  )
}
