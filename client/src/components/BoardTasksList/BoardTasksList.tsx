import React from 'react';
import { Task } from '../../type';
import { Stack } from '@mui/material';
import { TaskStepsList } from '../TaskStepsList';
import { DragDropContext } from 'react-beautiful-dnd';
import type {
  // DraggableStyle,
  // DroppableProvided,
  // DroppableStateSnapshot,
  // DraggableProvided,
  // DraggableStateSnapshot,
  DropResult,
} from 'react-beautiful-dnd';

interface IBoardTasksListProps {
  tasksList?: Task[]
}

export const BoardTasksList = ({ tasksList }: IBoardTasksListProps) => {

  const DragEndHandler = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const task = tasksList ? tasksList[Number(source.droppableId)-1] : null;
    const cutStep = task?.listSteps?.splice(source.index, 1);
    cutStep && task?.listSteps?.splice(destination.index, 0, cutStep[0]);
  }

  return (
    <Stack spacing={2} direction="row">
      <DragDropContext
        onDragEnd={DragEndHandler}
      >
        {tasksList?.map((task: Task) => (
          <TaskStepsList key={task.id} listId={task.id} listName={task.listName} steps={task.listSteps} />
        ))}
      </DragDropContext>
    </Stack>
  )
}
