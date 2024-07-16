import { TBoard, TOutletContext } from '../../type'
import { TaskStepsList } from '../TaskStepsList'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { StrictModeDroppable } from '../../utils/StrictModeDroppable'
import { useOutletContext } from 'react-router'
import styled from 'styled-components'

interface IBoardTasksListProps {
	board: TBoard
}

interface IContainer {
	isdraggingover?: boolean
}

const Container = styled.ul<IContainer>`
	display: block;
	white-space: nowrap;
	width: fit-content;
	min-width: 100%;
	transition: background-color 0.2s ease-in-out;
	border-radius: 10px;
	background-color: ${props =>
		props.isdraggingover ? 'lightblue' : 'inherit'};
`
const ContainerWrapper = styled.div<IContainer>`
	overflow: auto;
	margin: 0 -24px;
	padding: 0 20px;
	@media (min-width: 768px) {
		padding: 0 16px;

	}
`

export const BoardTasksList = ({ board }: IBoardTasksListProps) => {
	const {
		data,
		handlers: { dragEnd },
	} = useOutletContext<TOutletContext>()

	return (
		<ContainerWrapper>
			<DragDropContext
				onDragEnd={(result: DropResult) => dragEnd(result)(board)}
			>
				<StrictModeDroppable
					droppableId='all-tasks'
					direction='horizontal'
					type='task'
				>
					{(provided, snapshot) => (
						<Container
							{...provided.droppableProps}
							ref={provided.innerRef}
							isdraggingover={snapshot.isDraggingOver}
						>
							{board.taskIds.map((taskId: string, index) => {
								const task = data.tasks[taskId]

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
		</ContainerWrapper>
	)
}
