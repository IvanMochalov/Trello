import React from 'react';
import { Step } from '../../type';
import styles from './taskStepsList.module.css';
import { TaskStep } from '../TaskStep';
import { Stack } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';

interface ITasksListProps {
  listId: number
  listName: string
  steps?: Step[]
}

export const TaskStepsList = ({ listId, listName, steps }: ITasksListProps) => {
  return (
    <div className={styles.taskStepsListWrapper}>
      <h3 className={styles.taskStepsListTitle}>
        {listName}
      </h3>
      <Droppable droppableId={listId.toString()}>
        {(provided) => (
          <Stack
            direction="column"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {steps?.map((step: Step, index) => (
              <TaskStep key={step.id} stepId={step.id} text={step.stepDescription} index={index}/>
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </div>
  )
}