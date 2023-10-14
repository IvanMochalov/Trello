import { Tooltip } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { useOutletContext } from 'react-router-dom';
import { TBoard, TInitialData, TTask } from '../../type';
import { StrictModeDroppable } from '../../utils/StrictModeDroppable';
import { NewStep } from '../NewStep';
import { ItemActions } from '../ItemActions';
import { TaskStep } from '../TaskStep';
import styled from 'styled-components';

interface ITasksListProps {
	task: TTask
	index: number
	currParent: TBoard
}

interface IHeaderList {
	isdragging?: boolean
}

interface ITaskStepsListWrapper {
	isdraggingover?: boolean
	stepIds: string[]
}

const Container = styled.div<IHeaderList>`
	display: inline-flex;
	flex-direction: column;
	flex-shrink: 0;
	flex-grow: 0;
	box-sizing: border-box;
	border: 1px solid lightgray;
	border-radius: 8px;
	overflow: hidden;
	background-color: white;
	// width: calc((100% - (4 * 16px)) / 4);
	// min-width: 150px;
	width: 250px;
	// min-height: 150px;
	margin: 8px;
	border-color: ${(props) => props.isdragging ? 'red' : 'lightgray'};
`
const HeaderList = styled.div<IHeaderList>`
	display: flex;
	padding: 8px;
	color: #333;
	justify-content: space-between;
	align-items: center;
	cursor: grab;
	border-bottom: 1px solid;
	transition: background-color 0.2s ease-in-out;
	border-color: ${(props) => props.isdragging ? 'red' : 'lightgray'};
	background-color: ${props => (props.isdragging ? 'lightgreen' : 'white')};

	&:focus {
		outline: none;
	}

	&:hover {
		outline: none;
		-webkit-text-decoration: none;
		text-decoration: none;
		box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
			0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
	}

	&:focus-visible {
		outline: none;
		-webkit-text-decoration: none;
		text-decoration: none;
		box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
			0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
	}
`

const Title = styled.h3`
	margin: 0;
	font-size: 1.5em;
	overflow: hidden;
  text-overflow: ellipsis;
`

const TaskStepsListWrapper = styled.div<ITaskStepsListWrapper>`
	display: flex;
	flex-direction: column;
	padding: ${props => props.stepIds.length === 0 ? '0px' : '8px'};
	flex-grow: 1;
	height: 100%;
	transition: background-color 0.2s ease-in-out;
	background-color: ${props => (props.isdraggingover ? 'lightblue' : 'white')};
`

export const TaskStepsList = ({ task, index, currParent }: ITasksListProps) => {
	const [initialValue]: [TInitialData] = useOutletContext()

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
					isdragging={snapshot.isDragging}
				>
					<HeaderList
						{...provided.dragHandleProps}
						isdragging={snapshot.isDragging}
					>
						<Tooltip title='Dragg and drop' placement='top'>
							<Title>
								{task.title}
							</Title>
						</Tooltip>
						<ItemActions type='список' item={task} currParent={currParent} />
					</HeaderList>
					<NewStep currTask={task} />
					<StrictModeDroppable
						droppableId={task.id}
						type='step'
						direction='vertical'
					>
						{(provided, snapshot) => (
							<TaskStepsListWrapper
								stepIds={task.stepIds}
								ref={provided.innerRef}
								{...provided.droppableProps}
								isdraggingover={snapshot.isDraggingOver}
							>
								{task.stepIds.map((stepId: string, index) => {
									const step = initialValue.steps[stepId]

									return <TaskStep key={step.id} step={step} index={index} currParent={task}/>
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
