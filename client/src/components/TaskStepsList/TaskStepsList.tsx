import { TInitialData, TTask } from '../../type';
import { TaskStep } from '../TaskStep';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

interface ITasksListProps {
  task: TTask
  index: number
}
interface ITitle {
  isDragging?: boolean
}

interface ITaskStepsListWrapper {
  isDraggingOver?: boolean
}

const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 4px;
  background-color: white;
  width: 230px;
  display: flex;
  flex-direction: column;
  margin: 0 8px;
`
const Title = styled.h3<ITitle>`
  margin: 0;
  padding: 8px;
  color: #333;
  text-align: center;
  border-bottom: 1px solid lightgray;
  transition: background-color .2s ease-in-out;
  background-color: ${(props) => props.isDragging ? 'lightgreen' : 'white'};
`

const TaskStepsListWrapper = styled.div<ITaskStepsListWrapper>`
  display: flex;
  flex-direction: column;
  padding: 8px;
  flexGrow: 1;
  min-height: 100px;
  height: 100%;
  transition: background-color .2s ease-in-out;
  background-color: ${(props) => props.isDraggingOver ? 'lightblue' : 'white'}
`

export const TaskStepsList = ({ task, index }: ITasksListProps) => {
  const [initialValue]: [TInitialData] = useOutletContext();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Title
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            {task.title}
          </Title>
          <Droppable
            droppableId={task.id}
            type="step"
            direction="vertical"
          >
            {(provided, snapshot) => (
              <TaskStepsListWrapper
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {task.stepIds.map((stepId: string, index) => {
                  const step = initialValue.steps[stepId];
                  
                  return (
                    <TaskStep key={step.id} step={step} index={index}/>
                  )
                })}
                {provided.placeholder}
              </TaskStepsListWrapper>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}