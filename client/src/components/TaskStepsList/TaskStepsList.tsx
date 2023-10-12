import { TInitialData, TTask } from '../../type';
import { TaskStep } from '../TaskStep';
import { Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '../../utils/StrictModeDroppable';
import { useOutletContext } from 'react-router-dom';
import { NewStep } from '../NewStep';
import { Tooltip } from '@mui/material'
import styled from 'styled-components';

interface ITasksListProps {
  task: TTask
  index: number
}

interface ITitle {
  isdragging?: boolean
}

interface ITaskStepsListWrapper {
  isdraggingover?: boolean
}

const Container = styled.div`
  box-sizing: border-box;
  border: 1px solid lightgray;
  border-radius: 4px;
  background-color: white;
  width: calc((100% - (4 * 16px))/4);
  min-height: 150px;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  margin: 8px;

  // &:not(:nth-child(4n-3)) {
  //   margin-left: 15px;
  // }
  // &:not(:nth-child(-n+4)) {
  //   margin-top: 15px;
  // }
`
const Title = styled.h3<ITitle>`
  margin: 0;
  padding: 8px;
  color: #333;
  text-align: center;
  cursor: grab;
  border-bottom: 1px solid lightgray;
  transition: background-color .2s ease-in-out;
  background-color: ${(props) => props.isdragging ? 'lightgreen' : 'white'};

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
    box-shadow: 0px 2px   4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  }
`

const TaskStepsListWrapper = styled.div<ITaskStepsListWrapper>`
  display: flex;
  flex-direction: column;
  padding: 8px;
  flexGrow: 1;
  height: 100%;
  transition: background-color .2s ease-in-out;
  background-color: ${(props) => props.isdraggingover ? 'lightblue' : 'white'}
`

export const TaskStepsList = ({ task, index }: ITasksListProps) => {
  const [initialValue]: [TInitialData] = useOutletContext();

  return (
    <Draggable
      draggableId={task.id}
      index={index}
      // index={task.position}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Tooltip title="Dragg and drop" placement="top">
            <Title
              {...provided.dragHandleProps}
              isdragging={snapshot.isDragging}
            >
              {task.title}
            </Title>
          </Tooltip>
          <NewStep currTask={task} />
          <StrictModeDroppable
            droppableId={task.id}
            type="step"
            direction="vertical"
          >
            {(provided, snapshot) => (
              <TaskStepsListWrapper
                ref={provided.innerRef}
                {...provided.droppableProps}
                isdraggingover={snapshot.isDraggingOver}
              >
                {task.stepIds.map((stepId: string, index) => {
                  const step = initialValue.steps[stepId];
                  
                  return (
                    <TaskStep
                      key={step.id}
                      step={step}
                      index={index}
                    />
                  )
                })}
                {provided.placeholder}
              </TaskStepsListWrapper>
            )}
          </StrictModeDroppable>
        </Container>
      )}
    </Draggable>
  )
}