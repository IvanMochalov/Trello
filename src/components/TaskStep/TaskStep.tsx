import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { TOutletContext, TStep, TTask } from '../../type'
import styled from 'styled-components'
import { ItemActions } from '../ItemActions'
import { useOutletContext } from 'react-router-dom'
import { DoneButton } from '../DoneButton'

interface ITaskStepProps {
	step: TStep
	index: number
	currParent: TTask
}

interface IContainer {
	isdragging?: string
	isdragdisabled?: string
}

interface ITitle {
	done?: string
}

const Container = styled.li<IContainer>`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	border: 1px solid;
	border-color: ${({ isdragging }) =>
		isdragging === 'true' ? 'green' : 'lightgray'};
	border-radius: 3px;
	padding: 8px;
	cursor: ${({ isdragdisabled }) =>
		isdragdisabled === 'true' ? 'not-allowed' : 'grab'};
	background-color: ${({ isdragdisabled, isdragging }) =>
		isdragdisabled === 'true'
			? 'lightgray'
			: isdragging === 'true'
			? 'lightgreen'
			: 'white'};
	transition: background-color 0.2s ease-in-out;

	&:not(:last-child) {
		margin-bottom: 5px;
	}

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

const Title = styled.span<ITitle>`
	width: 100%;
	font-size: 0.8em;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-decoration: ${({ done }) => (done === 'true' ? 'line-through' : 'none')};
`

export const TaskStep = ({ step, index, currParent }: ITaskStepProps) => {
	const {
		handlers: { itemToggleDone },
	} = useOutletContext<TOutletContext>()

	return (
		<Draggable draggableId={step.id} index={index}  isDragDisabled={step.done}>
			{(provided, snapshot) => (
				<Container
					ref={provided.innerRef}
					isdragging={`${snapshot.isDragging}`}
					isdragdisabled={`${step.done}`}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<DoneButton
						item={step}
						done={step.done}
						handleClick={itemToggleDone}
					/>
					<Title done={`${step.done}`}>{step.title}</Title>
					<ItemActions type='шаг' item={step} currParent={currParent} />
				</Container>
			)}
		</Draggable>
	)
}
