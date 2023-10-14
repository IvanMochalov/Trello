import { TBoard, TInitialData } from '../../type';
import { TaskStepsList } from '../TaskStepsList';
import { DragDropContext } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '../../utils/StrictModeDroppable';
import { useOutletContext } from 'react-router';
import styled from 'styled-components';

interface IBoardTasksListProps {
  board: TBoard
}

interface IContainer {
  isdraggingover?: boolean
}

const Container = styled.div<IContainer>`
  // display: flex;
  // flex-shrink: 0;
  // flex-wrap: nowrap;
  width: fit-content;
  display: block;
  white-space : nowrap;
  vertical-align : top;
  margin: -8px -8px;
  transition: background-color .2s ease-in-out;
  background-color: ${(props) => props.isdraggingover ? 'lightblue' : 'inherit'}
`

export const BoardTasksList = (
    { board }: IBoardTasksListProps
  ) => {
  const [initialValue, handleDragEnd]: [TInitialData, () => void] = useOutletContext();

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
    >
      <StrictModeDroppable
        droppableId="all-tasks"
        direction="horizontal"
        type="task"
      >
        {(provided, snapshot) => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
            isdraggingover={snapshot.isDraggingOver}
          >
            {board.taskIds.map((taskId: string, index) => {
              const task = initialValue.tasks[taskId];
              
              return (
                <TaskStepsList
                  key={task.id}
                  task={task}
                  index={index}
                  currParent={board}
                />
              )
            })}
            {provided.placeholder}
          </Container>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  )
}
