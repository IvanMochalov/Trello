import React from 'react';
import styles from './taskStep.module.css';
import { Draggable } from 'react-beautiful-dnd';

interface ITaskStepProps {
  index: number
  stepId: number
  text: string
}

export const TaskStep = ({ stepId, text, index }: ITaskStepProps) => {
  return (
    <Draggable draggableId={stepId.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          className={styles.taskStepWrapper}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {text}
        </div>
      )}
    </Draggable>
  )
}
