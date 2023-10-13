import { Draggable } from 'react-beautiful-dnd';
import { TStep, TTask } from '../../type';
import styled from 'styled-components';
import { Tooltip } from '@mui/material'
import { ItemActions } from '../ItemActions'

interface ITaskStepProps {
  step: TStep
  index: number
  currParent: TTask
}

interface IContainer {
  isdragging?: boolean
  isdraggingover?: boolean
}

const Container = styled.div<IContainer>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid;
  border-color: ${(props) => props.isdragging ? 'red' : 'lightgray'};
  border-radius: 3px;
  padding: 8px;
  margin-bottom: 5px;
  cursor: grab;
  background-color: ${(props) => 
    props.isdraggingover
      ? 'darkgray '
      : props.isdragging
        ? 'lightgreen'
        : 'white'};
  transition: background-color .2s ease-in-out;

  &:focus {
    outline: none;
  }

  &:hover {
    outline: none;
    -webkit-text-decoration: none;
    text-decoration: none;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  }

  &:focus-visible {
    outline: none;
    -webkit-text-decoration: none;
    text-decoration: none;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  }
`

const Title = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`

export const TaskStep = ({ step, index, currParent }: ITaskStepProps) => {

  return (
    <Draggable
      draggableId={step.id}
      index={index}
      // index={step.position}
    >
      {(provided, snapshot) => (
        <Tooltip title="Dragg and drop" placement="right" key={step.id}>
          <Container
            ref={provided.innerRef}
            isdragging={snapshot.isDragging}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Title>
              {step.title}
            </Title>
            <ItemActions type='список' item={step} currParent={currParent} />
          </Container>
        </Tooltip>
      )}
    </Draggable>
  )
}
