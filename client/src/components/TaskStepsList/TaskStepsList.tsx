import React from 'react';
import { Step } from '../../type';
import styles from './taskStepsList.module.css';
import { TaskStep } from '../TaskStep';
import { Stack } from '@mui/material';
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';

interface ITasksListProps {
  listId: number
  listName: string
  steps?: Step[]
}

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'white',
});

export const TaskStepsList = ({ listId, listName, steps }: ITasksListProps) => {
  return (
    <div className={styles.taskStepsListWrapper}>
      <h3 className={styles.taskStepsListTitle}>
        {listName}
      </h3>
      <Droppable droppableId={listId.toString()}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <Stack
            direction="column"
            sx={{
              padding: '8px',
              transition: 'background-color .2s ease-in-out',
            }}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {/* {steps?.map((step: Step, index) => (
              <TaskStep key={step.id} stepId={step.id} text={step.stepDescription} index={index}/>
            ))} */}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </div>
  )
}