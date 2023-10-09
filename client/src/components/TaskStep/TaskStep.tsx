import React from 'react';
import styles from './taskStep.module.css';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
// import type { DraggableStyle } from 'react-beautiful-dnd';

interface ITaskStepProps {
  index: number
  stepId: number
  text: string
}

// const getItemStyle = (isDragging: boolean, draggableStyle?: DraggableStyle): Object => ({
//   background: isDragging ? 'lightgreen' : '#e1f2ff',
//   ...draggableStyle
// });


export const TaskStep = ({ stepId, text, index }: ITaskStepProps) => {
  return (
    <Draggable draggableId={stepId.toString()} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          className={styles.taskStepWrapper}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // style={getItemStyle(
          //   provided.draggableStyle,
          //   snapshot.isDragging
          // )}
        >
          {text}
        </div>
      )}
    </Draggable>
  )
}
